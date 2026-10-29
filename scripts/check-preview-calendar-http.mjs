import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const languages = ['ru','ro','en','uk','cs'];
const paths = ['/events','/events/october-2026','/events/november-2026','/events/december-2026','/events/january-2027'];
const pages = [];
for (const path of paths) for (const language of languages) {
  const suffix = language === 'ru' ? '' : `?lang=${language}`;
  const response = await fetch(`http://127.0.0.1:3001${path}${suffix}`);
  const html = await response.text();
  assert.equal(response.status, 200, `${path} ${language}`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  const title = /<title>([^<]+)<\/title>/.exec(html)?.[1];
  assert.ok(title);
  assert.match(html, /<meta[^>]+name="description"[^>]+content="[^"]+"/);
  const canonical = /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/.exec(html)?.[1];
  assert.equal(canonical?.replaceAll('&amp;','&'), `https://rentplace.md${path}${suffix}`);
  for (const lang of languages) assert.ok(html.includes(`hrefLang="${lang}"`) || html.includes(`hreflang="${lang}"`));
  const schemas = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  assert.ok(schemas.length > 0);
  pages.push({path,language,status:200,title,canonical,jsonLdBlocks:schemas.length});
}
for (const path of paths) assert.equal(new Set(pages.filter(p => p.path === path).map(p => p.title)).size, 5);
const sitemap = await (await fetch('http://127.0.0.1:3001/sitemap.xml')).text();
assert.match(sitemap, /events\/november-2026/);
assert.match(sitemap, /events\/january-2027/);
await writeFile('docs/events-preview-http-check.json', JSON.stringify({checkedAt:new Date().toISOString(),environment:'local build using verified Neon Preview',pages,sitemapChecked:true},null,2)+'\n');
console.log('Passed: 25 calendar pages, five languages, canonical, hreflang, metadata, JSON-LD and sitemap.');
