import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

// Run against a local production server: node scripts/verify-apartment-84.mjs
const origin = process.argv[2] ?? "http://localhost:3000";
const path = "/apartment/albisoara-16-84";
const canonical = "https://rentplace.md" + path;
const get = async (path) => {
  const response = await fetch(origin + path);
  assert.equal(response.status, 200, path);
  return response.text();
};
const inventory = await readFile(new URL("../lib/apartments.ts", import.meta.url), "utf8");
const records = [...inventory.matchAll(/createApartment\(\{\s+id:\s*(\d+|"[^"]+")/g)].map(m => m[1]);
assert.equal(new Set(records).size, records.length, "Duplicate apartment IDs");
const titles = new Set();
for (const language of ["ru", "ro", "en", "uk", "cs"]) {
  const suffix = language === "ru" ? "" : "?lang=" + language;
  const html = await get(path + suffix);
  titles.add(html.match(/<title>(.*?)<\/title>/s)?.[1]);
  assert.ok(html.includes(`rel="canonical" href="${canonical + suffix}"`));
  for (const lang of ["ru", "ro", "en", "uk", "cs", "x-default"]) {
    assert.ok(html.includes(`hrefLang="${lang}"`), "hreflang " + lang);
  }
  assert.ok(html.includes('content="index, follow"'));
  assert.ok(html.includes('property="og:image:type" content="image/webp"'));
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap(m => JSON.parse(m[1]));
  const apartments = scripts.filter(s => Array.isArray(s["@type"]) && s["@type"].includes("Apartment"));
  assert.equal(apartments.length, 1);
  const apartment = apartments[0];
  assert.equal(apartment.url, canonical + suffix);
  assert.equal(apartment.offers.price, 1200);
  assert.equal(apartment.offers.priceCurrency, "MDL");
  assert.equal(apartment.numberOfRooms, 2);
  assert.equal(apartment.occupancy.maxValue, 4);
  assert.equal(apartment.image.length, 18);
  assert.equal(new Set(apartment.image.map(i => i.contentUrl)).size, 18);
  assert.ok(scripts.some(s => s["@type"] === "BreadcrumbList"));
  assert.ok(!scripts.some(s => s["@type"] === "VideoObject"));
  const video = html.match(/<video\b[^>]*>/)?.[0];
  assert.ok(video?.includes('preload="none"'));
  assert.ok(video?.includes('width="576" height="1024"'));
  assert.ok(video?.includes('poster="/apartments/albisoara-16-84/8.webp"'));
  assert.ok(!video?.includes("autoPlay"));
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0]).filter(t => t.includes('albisoara-16-84'));
  assert.equal(images.length, 5, "Only hero plus four thumbnails rendered");
  assert.equal(images.filter(t => t.includes('loading="lazy"')).length, 4);
  assert.ok(images.every(t => t.includes('srcSet=')));
  assert.equal([...html.matchAll(/<link[^>]+rel="preload"[^>]+as="image"[^>]*>/g)].filter(m => m[0].includes('albisoara-16-84')).length, 1);
  console.log(language, "SEO/schema/images OK; HTML gzip", gzipSync(html).length, "bytes");
}
assert.equal(titles.size, 5);
const sitemap = await get("/sitemap.xml");
const entries = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].map(m => m[1]);
const apartmentEntries = entries.filter(e => /<loc>https:\/\/rentplace.md\/apartment\//.test(e));
const urls = apartmentEntries.map(e => e.match(/<loc>(.*?)<\/loc>/s)[1]);
assert.equal(new Set(urls).size, urls.length, "Duplicate apartment URLs");
const entry = apartmentEntries.find(e => e.includes(`<loc>${canonical}</loc>`));
assert.ok(entry);
assert.equal([...entry.matchAll(/<image:loc>/g)].length, 18);
for (const url of urls) await get(new URL(url).pathname);
for (const route of ["/apartments", "/apartments/premium", "/apartments/center"]) assert.ok((await get(route)).includes(path));
for (let i = 1; i <= 18; i++) {
  const response = await fetch(origin + `/apartments/albisoara-16-84/${i}.webp`);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/webp");
}
for (const width of [256, 640, 1200]) {
  const response = await fetch(origin + `/_next/image?url=%2Fapartments%2Falbisoara-16-84%2F8.webp&w=${width}&q=82`, { headers: { Accept: "image/webp" } });
  assert.equal(response.status, 200);
  console.log("Hero width", width, "bytes", (await response.arrayBuffer()).byteLength);
}
const videoResponse = await fetch(origin + "/apartments/albisoara-16-84/video/apartment-tour.mp4", {
  headers: { Range: "bytes=0-1023" },
});
assert.equal(videoResponse.status, 206);
assert.equal(videoResponse.headers.get("content-type"), "video/mp4");
assert.equal((await videoResponse.arrayBuffer()).byteLength, 1024);
const posterResponse = await fetch(origin + "/apartments/albisoara-16-84/8.webp");
assert.equal(posterResponse.status, 200);
console.log("PASS:", urls.length, "apartment routes, all five languages, catalogue/category/center, 18 assets and image optimizer");
