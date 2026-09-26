// Local-only acceptance check: no production writes or outbound WhatsApp messages.
import assert from "node:assert/strict";
import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import nextEnv from "@next/env";
import { excursions, excursionLabel } from "../lib/excursions.ts";

const origin = process.argv[2] ?? "http://127.0.0.1:3000";
assert.ok(["localhost", "127.0.0.1"].includes(new URL(origin).hostname), "Local check only");
const partners = ["cricova.md", "milestii-mici.md", "castelmimi.md", "orheiulvechi.com", "purcariwineries.com", "visit.chisinau.md", "moldova.travel/en/south-of-moldova", "moldova.travel/en/north-of-moldova"];
const checkPrivate = (body, context) => { for (const domain of partners) assert.ok(!body.includes(domain), `${context}: leaked ${domain}`); assert.ok(!/https:\/\/moldova\.travel\/en\/(?:["\\<])/.test(body), `${context}: leaked tourism portal`); };
const get = async (path, headers = {}) => {
  const response = await fetch(origin + path, { headers, signal: AbortSignal.timeout(30000) });
  return { response, body: await response.text() };
};
const paths = [...new Set(["/", "/excursions", "/car-rental", "/chisinau-guide", ...excursions.map(r => r.href), "/guide/wineries", "/guide/wineries/purcari", "/guide/moldova-trips", "/guide/attractions", "/guide/museums", "/guide/restaurants", "/guide/transnistria", "/guide/dental-tourism"] )];
const pages = [];
for (const lang of ["ru", "ro", "en", "uk", "cs"]) for (const path of paths) {
  const url = path + (lang === "ru" ? "" : `?lang=${lang}`);
  const { response, body } = await get(url);
  assert.equal(response.status, 200, url);
  checkPrivate(body, url);
  if (path === "/excursions") {
    for (const route of excursions) assert.ok(body.includes(excursionLabel(route, lang)), `${url}: ${route.number}`);
    assert.equal((body.match(/<option value=/g) ?? []).length, 4);
  }
  for (const route of excursions.filter(r => r.href === path)) assert.ok(body.includes(excursionLabel(route, lang)), `${url}: guide identity`);
  pages.push(url);
}
const sitemap = await get("/sitemap.xml");
checkPrivate(sitemap.body, "sitemap");
assert.ok(!sitemap.body.includes("/admin/"));
let chunks = 0;
async function scan(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) await scan(path);
    else if (/\.(js|json|map)$/.test(entry.name)) { checkPrivate(await readFile(path, "utf8"), path); chunks++; }
  }
}
await scan(".next/static");
for (const headers of [{}, { Cookie: "rpm_admin_session=invalid" }, { RSC: "1" }, { RSC: "1", Cookie: "rpm_admin_session=invalid" }]) {
  const locked = await get("/admin/excursions", headers);
  checkPrivate(locked.body, "locked admin");
  if (!headers.RSC) assert.ok(locked.body.includes("вход в админку"));
  else assert.match(locked.response.headers.get("content-type"), /text\/x-component/);
  assert.ok(!locked.body.includes("Закрытый справочник"));
}
const invalid = await fetch(origin + "/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: "acceptance-invalid-password" }) });
assert.ok([401, 503].includes(invalid.status));
nextEnv.loadEnvConfig(process.cwd(), false, { info() {}, error() {} });
const password = process.env.ADMIN_PASSWORD || process.env.ADMIN_TOKEN;
assert.ok(password, "Local administrator password must be configured for authenticated acceptance");
const login = await fetch(origin + "/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
assert.equal(login.status, 200);
const setCookie = login.headers.get("set-cookie");
assert.match(setCookie, /HttpOnly/i); assert.match(setCookie, /SameSite=lax/i);
const cookie = setCookie.split(";")[0];
for (const headers of [{ Cookie: cookie }, { Cookie: cookie, RSC: "1" }]) {
  const unlocked = await get("/admin/excursions", headers);
  assert.ok(unlocked.body.includes("Закрытый справочник"));
  for (const domain of partners) assert.ok(unlocked.body.includes(domain), `Private admin missing ${domain}`);
  for (const route of excursions) assert.ok(unlocked.body.includes(excursionLabel(route, "ru")));
  assert.match(unlocked.response.headers.get("cache-control"), /no-store/);
}
const logout = await fetch(origin + "/api/admin/session", { method: "DELETE", headers: { Cookie: cookie } });
assert.equal(logout.status, 200); assert.match(logout.headers.get("set-cookie"), /Max-Age=0/i);
const lockedAgain = await get("/admin/excursions"); checkPrivate(lockedAgain.body, "after logout");
const report = { pages: pages.length, languages: 5, routes: excursions.map(r => ({ number: r.number, title: r.title.ru, path: r.href, requestable: Boolean(r.requestable) })), clientAssetsChecked: chunks, privateLinksAbsentPublicly: true, adminHtmlAndRscProtected: true, loginLogoutVerified: true, privateCacheNoStore: true, checkedAt: new Date().toISOString() };
await mkdir("docs/excursions-admin-acceptance", { recursive: true });
await writeFile("docs/excursions-admin-acceptance/checks.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
