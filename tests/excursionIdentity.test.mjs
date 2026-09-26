import test from "node:test";
import assert from "node:assert/strict";
import { excursions, excursionLabel, travelUi } from "../lib/excursions.ts";
import { buildExcursionWhatsAppUrl } from "../lib/excursionRequest.ts";

test("permanent route IDs survive sorting and every catalog filter", () => {
  const expected = { orhei: "01", cricova: "02", milestii: "03", city: "04", combined: "05", gagauzia: "06", soroca: "07", monasteries: "08", mimi: "09" };
  assert.equal(excursions.length, 9);
  assert.equal(new Set(excursions.map(r => r.number)).size, 9);
  for (const filter of ["all", "wine", "history", "city", "nature", "culture", "half", "day"]) {
    const visible = excursions.filter(r => filter === "all" || r.duration === filter || r.themes.includes(filter)).reverse();
    for (const route of visible) assert.equal(route.number, expected[route.id]);
  }
  assert.deepEqual(excursions.filter(r => r.requestable).map(r => r.id), ["orhei", "cricova", "milestii", "combined"]);
});

test("all five languages retain numbered identity in four organisation requests", () => {
  for (const language of ["ru", "ro", "en", "uk", "cs"]) for (const route of excursions) {
    const label = excursionLabel(route, language);
    assert.match(label, /^№ \d{2} — .+/);
    assert.ok(route.title[language]);
    if (!route.requestable) continue;
    const url = new URL(buildExcursionWhatsAppUrl({ routeTitle: label, date: "2026-10-12", guests: "3", tourLanguage: "English", labels: { request: travelUi.request[language], route: travelUi.route[language], date: travelUi.date[language], guests: travelUi.guests[language], language: travelUi.language[language], unspecified: travelUi.unspecified[language] } }));
    assert.equal(url.origin + url.pathname, "https://wa.me/37369990190");
    assert.ok(url.searchParams.get("text").includes(label));
    for (const field of ["2026-10-12", "3", "English"]) assert.ok(url.searchParams.get("text").includes(field));
  }
});
