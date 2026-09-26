import test from "node:test";
import assert from "node:assert/strict";
import { classifyJourneyClick, createJourneyTracker } from "../lib/journeyAnalytics.ts";
import { buildExcursionWhatsAppUrl } from "../lib/excursionRequest.ts";

const origin = "https://rentplace.md";
test("tourism funnel classifies navigation and contact without collecting query or message text", () => {
  assert.deepEqual(classifyJourneyClick("/apartments?lang=en", "/guide/soroca", origin), { name: "tourism_to_apartments", params: { source_path: "/guide/soroca", destination_path: "/apartments" } });
  assert.equal(classifyJourneyClick("/apartment/albisoara-16-84", "/apartments", origin).name, "apartment_view_click");
  const contact = classifyJourneyClick("https://wa.me/37369990190?text=PRIVATE", "/apartment/albisoara-16-84", origin);
  assert.equal(contact.name, "contact_click");
  assert.equal(contact.params.contact_method, "whatsapp");
  assert.doesNotMatch(JSON.stringify(contact), /PRIVATE|37369990190/);
  assert.equal(classifyJourneyClick("tel:+37369990190", "/apartments", origin).params.contact_method, "phone");
  assert.equal(classifyJourneyClick("/guide/soroca", "/excursions", origin), null);
  assert.equal(classifyJourneyClick("https://example.com/apartments", "/excursions", origin), null);
});

test("repeat clicks and remounts do not duplicate a session event; another route is distinct", () => {
  const saved = new Map();
  const storage = { getItem: (k) => saved.get(k), setItem: (k,v) => saved.set(k,v) };
  const sent = [];
  const event = { name: "excursion_request", params: { route_id: "orhei", source_path: "/excursions" } };
  const track = createJourneyTracker((e) => sent.push(e), storage);
  assert.equal(track(event), true);
  assert.equal(track(event), false);
  assert.equal(createJourneyTracker((e) => sent.push(e), storage)(event), false);
  assert.equal(track({ ...event, params: { ...event.params, route_id: "cricova" } }), true);
  assert.equal(sent.length, 2);
});

test("analytics survives unavailable storage and preserves in-memory deduplication", () => {
  let sent = 0;
  const track = createJourneyTracker(() => sent++, { getItem() { throw Error(); }, setItem() { throw Error(); } });
  const event = { name: "contact_click", params: { contact_method: "phone" } };
  track(event); track(event);
  assert.equal(sent, 1);
});

test("WhatsApp request carries each configured route and the entered fields, safely encoded", () => {
  const labels = { request: "Запрос", route: "Маршрут", date: "Дата", guests: "Гости", language: "Язык", unspecified: "Уточнить" };
  for (const routeTitle of ["Старый Орхей", "Cricova", "Mileștii Mici", "Старый Орхей — Курки — Крикова"]) {
    const url = new URL(buildExcursionWhatsAppUrl({ routeTitle, date: "2026-10-15", guests: "3", tourLanguage: "RO & EN", labels }));
    assert.equal(url.origin, "https://wa.me");
    assert.equal(url.pathname, "/37369990190");
    assert.equal(url.searchParams.size, 1);
    assert.equal(url.searchParams.get("text"), `Запрос\nМаршрут: ${routeTitle}\nДата: 2026-10-15\nГости: 3\nЯзык: RO & EN`);
  }
});
