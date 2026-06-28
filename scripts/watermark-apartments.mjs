import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const apartmentsDir = path.join(rootDir, "public", "apartments");
const watermarkText = "RentPlaceMD\u2122";
const imageExtensions = new Set([".png", ".jpg", ".jpeg"]);

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getPngSize(buffer) {
  const signature = "89504e470d0a1a0a";

  if (buffer.subarray(0, 8).toString("hex") !== signature) {
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function getJpegSize(buffer) {
  let offset = 2;

  if (buffer.readUInt16BE(0) !== 0xffd8) {
    return null;
  }

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) return null;

    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);

    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        width: buffer.readUInt16BE(offset + 7),
        height: buffer.readUInt16BE(offset + 5),
      };
    }

    offset += 2 + length;
  }

  return null;
}

function getImageSize(buffer, extension) {
  if (extension === ".png") return getPngSize(buffer);
  if (extension === ".jpg" || extension === ".jpeg") return getJpegSize(buffer);
  return null;
}

function createWatermarkedSvg({ sourceName, width, height }) {
  const fontSize = Math.max(18, Math.round(Math.min(width, height) * 0.045));
  const paddingX = Math.round(fontSize * 0.82);
  const paddingY = Math.round(fontSize * 0.45);
  const estimatedTextWidth = Math.round(fontSize * 0.68 * watermarkText.length);
  const pillWidth = estimatedTextWidth + paddingX * 2;
  const pillHeight = fontSize + paddingY * 2;
  const margin = Math.max(18, Math.round(Math.min(width, height) * 0.035));
  const pillX = width - pillWidth - margin;
  const pillY = height - pillHeight - margin;
  const textX = pillX + paddingX;
  const textY = pillY + paddingY + Math.round(fontSize * 0.78);
  const radius = Math.round(pillHeight * 0.42);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <image href="../${escapeXml(sourceName)}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
  <rect x="${pillX}" y="${pillY}" width="${pillWidth}" height="${pillHeight}" rx="${radius}" fill="#07111f" opacity="0.46"/>
  <text x="${textX}" y="${textY}" fill="#ffffff" opacity="0.82" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" letter-spacing="0.2">${escapeXml(watermarkText)}</text>
</svg>
`;
}

async function watermarkFolder(folderPath) {
  const entries = await readdir(folderPath, { withFileTypes: true });
  const outputDir = path.join(folderPath, "watermarked");
  let generated = 0;

  await mkdir(outputDir, { recursive: true });

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const extension = path.extname(entry.name).toLowerCase();
    if (!imageExtensions.has(extension)) continue;

    const sourcePath = path.join(folderPath, entry.name);
    const buffer = await readFile(sourcePath);
    const size = getImageSize(buffer, extension);

    if (!size) {
      console.warn(`Skipped ${sourcePath}: unsupported image metadata`);
      continue;
    }

    const outputName = `${path.basename(entry.name, extension)}.svg`;
    const outputPath = path.join(outputDir, outputName);
    const svg = createWatermarkedSvg({
      sourceName: entry.name,
      width: size.width,
      height: size.height,
    });

    await writeFile(outputPath, svg, "utf8");
    generated += 1;
  }

  return generated;
}

async function main() {
  const folders = await readdir(apartmentsDir, { withFileTypes: true });
  let total = 0;

  for (const folder of folders) {
    if (!folder.isDirectory() || folder.name === "watermarked") continue;
    total += await watermarkFolder(path.join(apartmentsDir, folder.name));
  }

  console.log(`Generated ${total} watermarked apartment images.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
