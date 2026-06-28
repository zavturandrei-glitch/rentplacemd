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

function createWatermarkedSvg({ imageDataUrl, width, height }) {
  const shortSide = Math.min(width, height);
  const fontSize = Math.max(24, Math.min(48, Math.round(shortSide * 0.046)));
  const mark = watermarkText;
  const estimatedTextWidth = Math.round(fontSize * 0.64 * mark.length);
  const iconSize = Math.round(fontSize * 1.12);
  const gap = Math.round(fontSize * 0.36);
  const paddingX = Math.round(fontSize * 0.72);
  const pillWidth = estimatedTextWidth + iconSize + gap + paddingX * 2;
  const pillHeight = Math.round(fontSize * 1.82);
  const margin = Math.max(20, Math.round(shortSide * 0.038));
  const pillX = width - pillWidth - margin;
  const pillY = height - pillHeight - margin;
  const radius = Math.round(pillHeight * 0.5);
  const iconX = pillX + paddingX;
  const iconY = pillY + Math.round((pillHeight - iconSize) / 2);
  const textX = iconX + iconSize + gap;
  const textY = pillY + Math.round(pillHeight * 0.64);
  const accentWidth = Math.max(4, Math.round(fontSize * 0.13));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <defs>
    <linearGradient id="rpm-glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="0.44" stop-color="#07111f" stop-opacity="0.24"/>
      <stop offset="1" stop-color="#07111f" stop-opacity="0.16"/>
    </linearGradient>
    <linearGradient id="rpm-shine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.24"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="rpm-accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffd21f" stop-opacity="0.92"/>
      <stop offset="1" stop-color="#d4146f" stop-opacity="0.78"/>
    </linearGradient>
    <filter id="rpm-shadow" x="-20%" y="-45%" width="140%" height="190%">
      <feDropShadow dx="0" dy="${Math.max(2, Math.round(fontSize * 0.14))}" stdDeviation="${Math.max(3, Math.round(fontSize * 0.22))}" flood-color="#000000" flood-opacity="0.18"/>
    </filter>
  </defs>
  <image href="${imageDataUrl}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
  <g filter="url(#rpm-shadow)" opacity="0.78">
    <rect x="${pillX}" y="${pillY}" width="${pillWidth}" height="${pillHeight}" rx="${radius}" fill="url(#rpm-glass)"/>
    <rect x="${pillX + 1}" y="${pillY + 1}" width="${pillWidth - 2}" height="${Math.round(pillHeight * 0.46)}" rx="${Math.round(radius * 0.82)}" fill="url(#rpm-shine)"/>
    <rect x="${pillX + 0.5}" y="${pillY + 0.5}" width="${pillWidth - 1}" height="${pillHeight - 1}" rx="${radius}" fill="none" stroke="#ffffff" stroke-opacity="0.34"/>
    <rect x="${pillX}" y="${pillY + Math.round(pillHeight * 0.2)}" width="${accentWidth}" height="${Math.round(pillHeight * 0.6)}" rx="${Math.round(accentWidth / 2)}" fill="url(#rpm-accent)" opacity="0.86"/>
    <circle cx="${iconX + Math.round(iconSize / 2)}" cy="${iconY + Math.round(iconSize / 2)}" r="${Math.round(iconSize / 2)}" fill="#ffffff" fill-opacity="0.16" stroke="#ffffff" stroke-opacity="0.22"/>
    <text x="${iconX + Math.round(iconSize / 2)}" y="${iconY + Math.round(iconSize * 0.68)}" text-anchor="middle" fill="#ffffff" fill-opacity="0.72" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(fontSize * 0.68)}" font-weight="800">R</text>
    <text x="${textX}" y="${textY}" fill="#ffffff" fill-opacity="0.74" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" letter-spacing="0.15">${escapeXml(mark)}</text>
  </g>
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
    const mimeType = extension === ".png" ? "image/png" : "image/jpeg";
    const imageDataUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;
    const svg = createWatermarkedSvg({
      imageDataUrl,
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
