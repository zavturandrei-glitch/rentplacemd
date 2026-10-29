import assert from "node:assert/strict";
import { writeFile, access } from "node:fs/promises";

const origin = process.env.AUDIT_ORIGIN || "http://localhost:3000";
if (!/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) throw new Error("Этот тест предназначен только для локального сервера");
const languages = ["ru", "ro", "en", "uk", "cs"];
const paths = ["/", "/about", "/apartments", "/apartments/center", "/apartments/premium", "/events", "/events/november-2026", "/events/january-2027", "/events/event/imany-2026", "/transfer", "/excursions", "/chisinau-guide", "/guide/museums", "/chisinau-videos"];
const results = [];
for (const path of paths) {
  for (const language of languages) {
    const url = origin + path + (language === "ru" ? "" : `?lang=${language}`);
    const response = await fetch(url);
    const html = await response.text();
    const title = /<title>([\s\S]*?)<\/title>/.exec(html)?.[1];
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    const canonical = /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/.exec(html)?.[1];
    const description = /<meta[^>]*name="description"[^>]*content="([^"]+)"/.exec(html)?.[1];
    const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
    results.push({ path, language, status: response.status, title, h1, canonical, description, jsonLdBlocks: schemas.length, bytes: Buffer.byteLength(html) });
    assert.equal(response.status, 200, `${url} status`);
    assert.equal(h1, 1, `${url} H1`);
    assert.ok(title && canonical && description, `${url} metadata`);
  }
}
const sitemapResponse = await fetch(origin + "/sitemap.xml");
const sitemap = await sitemapResponse.text();
assert.equal(sitemapResponse.status, 200);
assert.match(sitemap, /events\/event\/imany-2026/);
assert.match(sitemap, /events\/january-2027/);
const canonicalPaths = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1].replaceAll("&amp;", "&"))).filter(url => !url.search).map(url => url.pathname))];
for (const path of canonicalPaths.filter(path => !paths.includes(path))) {
  const response = await fetch(origin + path); const html = await response.text();
  const title = /<title>([\s\S]*?)<\/title>/.exec(html)?.[1];
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const canonical = /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/.exec(html)?.[1];
  const description = /<meta[^>]*name="description"[^>]*content="([^"]+)"/.exec(html)?.[1];
  results.push({ path, language: "ru", status: response.status, title, h1, canonical, description, bytes: Buffer.byteLength(html) });
  assert.equal(response.status, 200, path); assert.equal(h1, 1, path + " H1"); assert.ok(title && canonical && description, path + " metadata");
}
const duplicateTitles = Object.entries(Object.groupBy(results, page => page.language + "|" + page.title)).filter(([, pages]) => pages.length > 1).map(([title, pages]) => ({ title, paths: pages.map(page => page.path) }));
const duplicateDescriptions = Object.entries(Object.groupBy(results, page => page.language + "|" + page.description)).filter(([, pages]) => pages.length > 1).map(([description, pages]) => ({ description, paths: pages.map(page => page.path) }));
const imageUrls = [...new Set([...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(match => match[1]))];
const missingImages = [];
for (const value of imageUrls) {
  const pathname = new URL(value.replaceAll("&amp;", "&")).pathname;
  if (pathname.startsWith("/api/") || pathname.startsWith("/event-images/")) continue;
  try { await access(new URL(`../public${decodeURIComponent(pathname)}`, import.meta.url)); } catch { missingImages.push(pathname); }
}
assert.deepEqual(missingImages, [], "sitemap images must exist");
for (const path of ["/events/invalid", "/events/event/does-not-exist"]) assert.equal((await fetch(origin + path)).status, 404);
for (const path of ["/api/admin/events", "/api/admin/events/images"]) {
  assert.equal((await fetch(origin + path, { method: path.endsWith("images") ? "POST" : "GET" })).status, 401);
  assert.equal((await fetch(origin + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" })).status, 401);
}
const cronStatus = (await fetch(origin + "/api/cron/events")).status;
assert.ok([401, 503].includes(cronStatus), "unauthenticated cron must fail closed");
assert.equal((await fetch(origin + "/events?lang=ru", { redirect: "manual" })).status, 308);
assert.equal((await fetch(origin + "/guide/events", { redirect: "manual" })).status, 308);
assert.equal((await fetch(origin + "/events/", { redirect: "manual" })).status, 308);
const robots = await (await fetch(origin + "/robots.txt")).text();
assert.match(robots, /Disallow: \/admin/);
assert.match(robots, /Sitemap: https:\/\/rentplace.md\/sitemap.xml/);
const admin = await (await fetch(origin + "/admin/events")).text();
assert.match(admin, /noindex/);
await writeFile(new URL("../docs/events-http-audit.json", import.meta.url), JSON.stringify({ checkedAt: new Date().toISOString(), environment: "local production build; no database configured", pages: results, duplicateTitles, duplicateDescriptions, sitemap: { imageCount: imageUrls.length, missingImages }, security: { unauthenticatedAdmin: 401, unauthenticatedCron: cronStatus }, limits: "No live database, scheduler, Search Console, Bing Webmaster or field CWV verification" }, null, 2));
console.log(`Проверены ${results.length} страниц, ${imageUrls.length} изображений sitemap, JSON-LD, redirects, 404 и закрытые endpoints. Отчёт: docs/events-http-audit.json`);
