import { writeFile } from "node:fs/promises";

const origin = "https://rentplace.md";
const report = { checkedAt: new Date().toISOString(), origin, robots: null, sitemap: null, pages: [], coreWebVitals: null, errors: [] };
async function read(url, timeout = 15000) {
  const response = await fetch(url, { signal: AbortSignal.timeout(timeout), redirect: "follow", headers: { "User-Agent": "RentPlaceMD-Owner-SEO-Audit/1.0" } });
  return { response, text: await response.text() };
}
try {
  const { response, text } = await read(origin + "/robots.txt");
  report.robots = { status: response.status, text: text.slice(0, 10000) };
} catch { report.errors.push("Production robots could not be fetched"); }
let paths = ["/", "/events", "/apartments", "/transfer", "/excursions", "/chisinau-guide"];
try {
  const { response, text } = await read(origin + "/sitemap.xml");
  const locations = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].replaceAll("&amp;", "&"));
  const urls = locations.map(value => new URL(value)).filter(url => url.origin === origin && !url.search);
  paths = [...new Set([...paths, ...urls.map(url => url.pathname)])].slice(0, 200);
  report.sitemap = { status: response.status, urls: locations.length, canonicalPaths: urls.length, imageEntries: [...text.matchAll(/<image:loc>/g)].length };
} catch { report.errors.push("Production sitemap could not be fetched"); }
const queue = [...paths];
await Promise.all(Array.from({ length: 2 }, async () => {
  while (queue.length) {
    const path = queue.shift();
    try {
      const { response, text } = await read(origin + path);
      const scripts = [...text.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
      let invalidJsonLd = 0;
      for (const script of scripts) { try { JSON.parse(script[1]); } catch { invalidJsonLd++; } }
      report.pages.push({ path, status: response.status, finalUrl: response.url, title: /<title>([\s\S]*?)<\/title>/.exec(text)?.[1], description: /<meta[^>]*name="description"[^>]*content="([^"]+)"/.exec(text)?.[1], canonical: /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/.exec(text)?.[1], h1: (text.match(/<h1[\s>]/g) || []).length, hreflangCount: (text.match(/hreflang=/gi) || []).length, jsonLdBlocks: scripts.length, invalidJsonLd, robots: /<meta[^>]*name="robots"[^>]*content="([^"]+)"/.exec(text)?.[1] });
    } catch { report.pages.push({ path, error: "Public HTTP request failed" }); }
    if (report.pages.length % 20 === 0) console.log(`Проверено публичных URL: ${report.pages.length}`);
  }
}));
try {
  // Only the public site URL is sent. No account credentials or private analytics are used.
  const url = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=" + encodeURIComponent(origin) + "&strategy=mobile&category=performance&category=seo";
  const { response, text } = await read(url, 90000);
  const data = JSON.parse(text);
  const audits = data.lighthouseResult?.audits;
  report.coreWebVitals = { status: response.status, strategy: "mobile", source: "Public PageSpeed Insights API", fieldMetrics: data.loadingExperience?.metrics ?? null, lab: audits ? Object.fromEntries(["largest-contentful-paint", "cumulative-layout-shift", "total-blocking-time", "speed-index"].map(key => [key, { value: audits[key]?.numericValue, unit: audits[key]?.numericUnit }])) : null, scores: data.lighthouseResult?.categories ? Object.fromEntries(Object.entries(data.lighthouseResult.categories).map(([key, value]) => [key, value.score])) : null, error: response.ok ? undefined : "Public API unavailable or quota exceeded; no CWV values inferred" };
} catch { report.coreWebVitals = { available: false, reason: "Public PageSpeed request failed; field CWV not measured" }; }
report.pages.sort((a, b) => a.path.localeCompare(b.path));
await writeFile(new URL("../docs/production-seo-audit.json", import.meta.url), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ pages: report.pages.length, failures: report.pages.filter(page => page.error || page.status >= 400).length, cwvApiStatus: report.coreWebVitals?.status, report: "docs/production-seo-audit.json", changedProduction: false }));
