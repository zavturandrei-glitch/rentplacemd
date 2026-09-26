// Read-only HTTP audit. Does not submit URLs to search engines or execute page JS.
import { writeFile, mkdir, access } from "node:fs/promises";
import { resolve } from "node:path";

const origin = process.argv[2] ?? "http://127.0.0.1:3000";
const output = resolve("docs/tourism-seo-audit");
const decode = (text) => text.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, k, v]) => [k.toLowerCase(), decode(v)]));
const fetchPage = async (url) => {
  const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(30000), headers: { "User-Agent": "RentPlaceMD-Local-SEO-Audit" } });
  return { response, html: await response.text() };
};
const { response: sitemapResponse, html: sitemap } = await fetchPage(origin + "/sitemap.xml");
if (sitemapResponse.status !== 200) throw Error("Sitemap unavailable");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decode(m[1]));
const images = [...new Set([...sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map((m) => decode(m[1])))];
const failures = [];
const rows = [];
if (new Set(urls).size !== urls.length) failures.push("Duplicate sitemap URLs");
if (urls.some((u) => u.includes("/car-rental"))) failures.push("Car rental in sitemap");
const queue = [...urls, ...["", "?lang=ro", "?lang=en", "?lang=uk", "?lang=cs"].map((q) => "https://rentplace.md/car-rental" + q)];
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    const parsed = new URL(url);
    const expectedLanguage = parsed.searchParams.get("lang") ?? "ru";
    const { response, html } = await fetchPage(origin + parsed.pathname + parsed.search);
    const tags = [...html.matchAll(/<(?:link|meta)\b[^>]*>/gi)].map((m) => attrs(m[0]));
    const canonical = tags.find((t) => t.rel === "canonical")?.href;
    const alternates = Object.fromEntries(tags.filter((t) => t.hreflang).map((t) => [t.hreflang, t.href]));
    const robots = tags.filter((t) => ["robots", "googlebot"].includes(t.name)).map((t) => t.content).join("; ");
    const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
    const description = tags.find((t) => t.name === "description")?.content ?? "";
    const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
    const language = html.match(/<html[^>]*\blang="([^"]+)"/)?.[1];
    const noindex = /noindex/.test(robots + (response.headers.get("x-robots-tag") ?? ""));
    const car = parsed.pathname === "/car-rental";
    const issues = [];
    if (response.status !== 200) issues.push(`HTTP ${response.status}`);
    if (canonical?.replace(/\/$/, "") !== url.replace(/\/$/, "")) issues.push(`canonical ${canonical}`);
    if (!title || !description) issues.push("missing metadata");
    if (h1s.length !== 1) issues.push(`H1 count ${h1s.length}`);
    if (language !== expectedLanguage) issues.push(`lang ${language}`);
    if (noindex !== car) issues.push(`unexpected noindex ${noindex}`);
    for (const [lang, href] of Object.entries(alternates)) {
      if (lang !== "x-default" && !car && !urls.includes(href)) issues.push(`alternate absent from sitemap ${href}`);
    }
    if (!alternates.ru || !alternates[expectedLanguage] || !alternates["x-default"]) issues.push("missing alternates");
    let schemas = [];
    try { schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1])); } catch { issues.push("invalid JSON-LD"); }
    if (["/excursions", "/guide/gagauzia", "/guide/soroca"].includes(parsed.pathname)) {
      const json = JSON.stringify(schemas);
      if (!json.includes('"BreadcrumbList"')) issues.push("missing breadcrumbs");
      if (/"@type":"(?:Event|Offer|Review|AggregateRating)"/.test(json)) issues.push("unsupported tour schema");
      const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
      if (["ro", "en", "cs"].includes(expectedLanguage) && /[А-Яа-яЁё]/.test(visible)) issues.push("Cyrillic in translated content");
      if (parsed.pathname === "/excursions" && (html.match(/<article\b/g) ?? []).length !== 9) issues.push("routes missing from server HTML");
    }
    if (issues.length) failures.push({ url, issues });
    rows.push({ url, canonical, language, title, description, h1Count: h1s.length, alternates, inSitemap: !car, indexable: !noindex, status: response.status, issues });
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
for (const image of images) {
  const url = new URL(image);
  if (url.origin === "https://rentplace.md" && !url.pathname.startsWith("/api/")) {
    try { await access(resolve("public", decodeURIComponent(url.pathname.slice(1)))); } catch { failures.push(`Missing local sitemap image: ${image}`); }
  }
}
for (const path of ["/excursions?lang=ru", "/excursions?lang=EN", "/excursions?lang=unknown", "/excursions?lang=en&lang=cs"]) {
  const first = await fetch(origin + path, { redirect: "manual" });
  if (first.status !== 308) failures.push(`Expected 308 for ${path}`);
  const location = first.headers.get("location");
  if (location) { const target = new URL(location, origin); const next = await fetch(origin + target.pathname + target.search, { redirect: "manual" }); if(next.status !== 200) failures.push(`Redirect chain for ${path}`); }
}
const robots = await (await fetch(origin + "/robots.txt")).text();
if (!robots.includes("Sitemap: https://rentplace.md/sitemap.xml") || /Disallow: \/(?:excursions|guide|apartments|events)/.test(robots)) failures.push("Robots mismatch");
rows.sort((a,b) => a.url.localeCompare(b.url));
for (const field of ["title", "description"]) {
  const groups = new Map();
  for (const row of rows) { const group = groups.get(row[field]) ?? []; group.push(row.url); groups.set(row[field], group); }
  for (const [value, group] of groups) if (group.length > 1) failures.push({ duplicate: field, value, urls: group });
}
await mkdir(output, { recursive: true });
await writeFile(resolve(output, "results.json"), JSON.stringify({ checkedAt: new Date().toISOString(), origin, pageCount: rows.length, sitemapCount: urls.length, imageCount: images.length, failures, rows }, null, 2));
await writeFile(resolve(output, "url-table.md"), "# URL → canonical → языки → sitemap → индексируемость\n\n| URL | Canonical | Hreflang | Sitemap | Индексируемость | HTTP |\n| --- | --- | --- | --- | --- | --- |\n" + rows.map((r) => `| ${r.url} | ${r.canonical} | ${Object.keys(r.alternates).join(", ")} | ${r.inSitemap ? "Да" : "Нет"} | ${r.indexable ? "Разрешена" : "noindex, follow"} | ${r.status} |`).join("\n"));
console.log(JSON.stringify({ pages: rows.length, sitemap: urls.length, images: images.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
