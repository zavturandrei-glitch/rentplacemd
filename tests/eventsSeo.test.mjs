import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("event inventory is unique, chronological and starts with Independence Day after the audit date", async () => {
  const source = await read("lib/events.ts");
  const slugs = [...source.matchAll(/e\(\{ slug: "([^"]+)"/g)].map((match) => match[1]);
  const dates = [...source.matchAll(/e\(\{ slug: "[^"]+"[\s\S]*?startDate: "(2026-[^"]+)"/g)].map((match) => match[1]);
  assert.ok(slugs.length >= 25, "the audited calendar should contain the major August–December events");
  assert.equal(new Set(slugs).size, slugs.length, "event slugs must be unique");
  assert.deepEqual(dates, [...dates].sort(), "source inventory should remain chronological");
  assert.equal(slugs[0], "independence-day-moldova-2026");
  for (const required of ["chisinau-marathon-2026", "moldova-business-week-2026", "national-wine-day-2026", "hramul-chisinau-2026", "jdc-dance-weekend-2026"]) {
    assert.ok(slugs.includes(required), `missing critical event: ${required}`);
  }
});

test("events expose demand windows and all five localized SEO variants", async () => {
  const [events, guide, calendar, page] = await Promise.all([
    read("lib/events.ts"), read("lib/guide.ts"), read("components/EventsCalendar.tsx"), read("app/events/page.tsx"),
  ]);
  assert.match(events, /demandStart/);
  assert.match(events, /demandEnd/);
  assert.match(events, /export const eventsUpdatedAt = "2026-08-24"/);
  assert.match(guide, /События и концерты в Кишинёве 2026/);
  assert.match(guide, /Evenimente și concerte în Chișinău 2026/);
  assert.match(guide, /Chișinău events and concerts 2026/);
  assert.match(guide, /Події та концерти в Кишиневі 2026/);
  assert.match(guide, /Akce a koncerty v Kišiněvě 2026/);
  assert.match(calendar, /getEventMonthSeo/);
  assert.match(page, /index: true/);
});

test("events are represented in sitemap, Event ItemList and breadcrumbs", async () => {
  const [sitemap, jsonLd, robots] = await Promise.all([
    read("app/sitemap.ts"), read("lib/guideSeo.ts"), read("app/robots.ts"),
  ]);
  assert.match(sitemap, /eventsUpdatedAt/);
  assert.match(sitemap, /eventMonthRoutes/);
  assert.match(jsonLd, /"@type": "Event"/);
  assert.match(jsonLd, /organizer:/);
  assert.match(jsonLd, /isEventEligibleForStructuredData/);
  assert.match(jsonLd, /"@type": "ItemList"/);
  assert.match(jsonLd, /"@type": "BreadcrumbList"/);
  assert.match(robots, /allow: \["\/"/);
});

test("Event JSON-LD only exposes records with a verified organizer and full address", async () => {
  const [events, guideJsonLd, monthJsonLd] = await Promise.all([
    read("lib/events.ts"), read("lib/guideSeo.ts"), read("lib/eventCalendar.ts"),
  ]);
  assert.match(events, /verifiedEventOrganizers/);
  assert.match(events, /"independence-day-moldova-2026"[\s\S]*Guvernul Republicii Moldova/);
  assert.match(events, /"gladiator-challenge-2026"[\s\S]*Gladiator Challenge Moldova/);
  assert.match(events, /"grand-chinese-circus-2026"[\s\S]*Arena Chișinău/);
  for (const jsonLd of [guideJsonLd, monthJsonLd]) {
    assert.match(jsonLd, /filter\(isEventEligibleForStructuredData\)/);
    assert.match(jsonLd, /"@type": event\.organizer\.type/);
    assert.match(jsonLd, /name: event\.organizer\.name/);
    assert.match(jsonLd, /url: event\.organizer\.url/);
  }
});
