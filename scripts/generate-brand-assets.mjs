import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const brandDir = path.join(root, "public", "brand");
const markPath = path.join(brandDir, "rentplace-mark-gold-v3.svg");
const ogDir = path.join(root, "public", "og");

await fs.mkdir(brandDir, { recursive: true });
await fs.mkdir(ogDir, { recursive: true });

const pngAt = (size) =>
  sharp(markPath, { density: 384 })
    .resize(size, size)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

const png16 = await pngAt(16);
const png32 = await pngAt(32);
const png48 = await pngAt(48);
const png180 = await pngAt(180);
const png192 = await pngAt(192);
const png512 = await pngAt(512);

const pngTargets = [
  ["public/brand/rentplace-favicon-gold-v3-16.png", png16],
  ["public/brand/rentplace-favicon-gold-v3-32.png", png32],
  ["public/brand/rentplace-favicon-gold-v3-48.png", png48],
  ["public/brand/rentplace-apple-touch-gold-v3.png", png180],
  ["public/brand/rentplace-icon-gold-v3-192.png", png192],
  ["public/brand/rentplace-icon-gold-v3-512.png", png512],
  ["app/icon.png", png512],
  ["app/apple-icon.png", png180],
  ["public/icon.png", png512],
  ["public/apple-icon.png", png180],
  ["public/apple-touch-icon.png", png180],
  ["public/android-chrome-192x192.png", png192],
  ["public/android-chrome-512x512.png", png512],
  ["public/favicon-16x16.png", png16],
  ["public/favicon-32x32.png", png32],
  ["public/favicon-48x48.png", png48],
];

await Promise.all(
  pngTargets.map(([target, buffer]) => fs.writeFile(path.join(root, target), buffer)),
);

function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + images.length * 16;
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...images.map(({ data }) => data)]);
}

const ico = buildIco([
  { size: 16, data: png16 },
  { size: 32, data: png32 },
  { size: 48, data: png48 },
]);

await Promise.all([
  fs.writeFile(path.join(brandDir, "rentplace-favicon-gold-v3.ico"), ico),
  fs.writeFile(path.join(root, "app", "favicon.ico"), ico),
  fs.writeFile(path.join(root, "public", "favicon.ico"), ico),
]);

const photo = await sharp(
  path.join(root, "public", "service-pages", "about-apartment.webp"),
)
  .resize(760, 630, { fit: "cover", position: "center" })
  .modulate({ brightness: 0.92, saturation: 0.92 })
  .toBuffer();

const mark = await sharp(markPath, { density: 384 })
  .resize(116, 116)
  .png()
  .toBuffer();

const overlay = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <linearGradient id="fade" x1="0" x2="1">
        <stop offset="0" stop-color="#07111f"/>
        <stop offset=".42" stop-color="#07111f"/>
        <stop offset=".62" stop-color="#07111f" stop-opacity=".86"/>
        <stop offset=".78" stop-color="#07111f" stop-opacity=".18"/>
        <stop offset="1" stop-color="#07111f" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#fade)"/>
    <text x="190" y="92" fill="#e8d7aa" font-family="Arial, sans-serif" font-size="38" font-weight="700" letter-spacing="7">RENTPLACE</text>
    <text x="190" y="124" fill="#ffffff" fill-opacity=".62" font-family="Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="2.6">APARTMENTS | CHIȘINĂU | MOLDOVA</text>
    <line x1="58" y1="168" x2="420" y2="168" stroke="#d4af62" stroke-opacity=".5" stroke-width="2"/>
    <text x="58" y="255" fill="#ffffff" font-family="Arial, sans-serif" font-size="52" font-weight="800" letter-spacing="-.8">КВАРТИРЫ</text>
    <text x="58" y="317" fill="#ffffff" font-family="Arial, sans-serif" font-size="52" font-weight="800" letter-spacing="-.8">ПОСУТОЧНО</text>
    <rect x="58" y="358" width="330" height="58" rx="29" fill="#d4af62"/>
    <text x="223" y="397" text-anchor="middle" fill="#07111f" font-family="Arial, sans-serif" font-size="24" font-weight="800" letter-spacing=".8">В КИШИНЁВЕ</text>
    <text x="60" y="526" fill="#ffffff" fill-opacity=".72" font-family="Arial, sans-serif" font-size="21" font-weight="600">Современные квартиры · прямой контакт</text>
    <text x="60" y="570" fill="#e8d7aa" font-family="Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="1.6">rentplace.md</text>
  </svg>
`);

const socialPreviewPath = path.join(
  ogDir,
  "rentplace-gold-main-1200x630-v3.jpg",
);

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 3,
    background: "#07111f",
  },
})
  .composite([
    { input: photo, left: 440, top: 0 },
    { input: overlay, left: 0, top: 0 },
    { input: mark, left: 56, top: 35 },
  ])
  .jpeg({ quality: 88, chromaSubsampling: "4:4:4", mozjpeg: true })
  .toFile(socialPreviewPath);

const socialPreview = await fs.readFile(socialPreviewPath);
await Promise.all([
  fs.writeFile(path.join(root, "public", "og-image.jpg"), socialPreview),
  fs.writeFile(
    path.join(ogDir, "rentplace-main-1200x630-v2.jpg"),
    socialPreview,
  ),
]);

console.log("Generated gold RentPlace icons and 1200x630 social preview.");
