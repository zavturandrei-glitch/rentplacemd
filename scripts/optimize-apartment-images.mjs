import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const apartmentRoot = path.resolve("public/apartments");
const shouldWrite = process.argv.includes("--write");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png"]);
const excludedAssetPattern = /(^|[-_])(social|og)([-_.]|$)/i;
const minimumBytes = 750 * 1024;
const maximumSide = 2048;

async function listApartmentPhotos(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listApartmentPhotos(absolutePath)));
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (
      supportedExtensions.has(extension) &&
      !excludedAssetPattern.test(entry.name)
    ) {
      files.push(absolutePath);
    }
  }

  return files.sort();
}

async function inspectPhoto(filePath) {
  const [buffer, fileStats] = await Promise.all([
    readFile(filePath),
    stat(filePath),
  ]);
  const metadata = await sharp(buffer).metadata();

  return {
    filePath,
    relativePath: path.relative(process.cwd(), filePath).replaceAll("\\", "/"),
    bytes: fileStats.size,
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
    format: metadata.format ?? "unknown",
    hash: createHash("sha256").update(buffer).digest("hex"),
  };
}

function summarize(rows) {
  const hashes = new Map();
  for (const row of rows) {
    const group = hashes.get(row.hash) ?? [];
    group.push(row.relativePath);
    hashes.set(row.hash, group);
  }

  const duplicateGroups = [...hashes.values()].filter(
    (group) => group.length > 1,
  );
  const totalBytes = rows.reduce((sum, row) => sum + row.bytes, 0);

  return {
    count: rows.length,
    totalBytes,
    totalMiB: Number((totalBytes / 1024 / 1024).toFixed(2)),
    over750KiB: rows.filter((row) => row.bytes > minimumBytes).length,
    over2048px: rows.filter(
      (row) => Math.max(row.width, row.height) > maximumSide,
    ).length,
    largest: [...rows]
      .sort((left, right) => right.bytes - left.bytes)
      .slice(0, 15)
      .map((row) => ({
        path: row.relativePath,
        MiB: Number((row.bytes / 1024 / 1024).toFixed(2)),
        dimensions: `${row.width}x${row.height}`,
        format: row.format,
      })),
    duplicateGroups,
  };
}

async function optimizePhoto(row) {
  const requiresResize = Math.max(row.width, row.height) > maximumSide;
  if (!requiresResize && row.bytes <= minimumBytes) return null;

  const source = await readFile(row.filePath);
  let pipeline = sharp(source).rotate();
  if (requiresResize) {
    pipeline = pipeline.resize({
      width: maximumSide,
      height: maximumSide,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  if (row.format === "jpeg") {
    pipeline = pipeline.jpeg({
      quality: 82,
      progressive: true,
      mozjpeg: true,
    });
  } else if (row.format === "png") {
    pipeline = pipeline.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      effort: 10,
    });
  } else {
    return null;
  }

  const optimized = await pipeline.toBuffer();
  if (optimized.length >= row.bytes * 0.97) return null;

  if (shouldWrite) {
    await writeFile(row.filePath, optimized);
  }

  return {
    path: row.relativePath,
    beforeBytes: row.bytes,
    afterBytes: optimized.length,
  };
}

const files = await listApartmentPhotos(apartmentRoot);
const beforeRows = await Promise.all(files.map(inspectPhoto));
const before = summarize(beforeRows);

if (!shouldWrite) {
  console.log(JSON.stringify({ mode: "audit", before }, null, 2));
  process.exit(0);
}

const optimized = [];
for (const row of beforeRows) {
  const result = await optimizePhoto(row);
  if (result) optimized.push(result);
}

const afterRows = await Promise.all(files.map(inspectPhoto));
const after = summarize(afterRows);
const savedBytes = before.totalBytes - after.totalBytes;

console.log(
  JSON.stringify(
    {
      mode: "write",
      before,
      after,
      optimizedCount: optimized.length,
      savedBytes,
      savedMiB: Number((savedBytes / 1024 / 1024).toFixed(2)),
      savedPercent: Number(
        ((savedBytes / Math.max(before.totalBytes, 1)) * 100).toFixed(1),
      ),
      optimized,
    },
    null,
    2,
  ),
);
