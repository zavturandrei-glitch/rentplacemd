import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { chisinauDate, eventMonths, eventOverlapsMonth, eventDateTime, eventSchemaStatus, isCronLocalHour } from "../lib/eventDates.ts";
import { validateEvent, emptyEventState, mergeEvents, queueCandidates, fingerprint, sameOccurrence, addEventLog } from "../lib/eventsWorkflow.ts";
import { validCronAuthorization } from "../lib/eventCronAuth.ts";

const text = value => Object.fromEntries(["ru", "ro", "en", "uk", "cs"].map(language => [language, value]));
const fixture = (extra = {}) => validateEvent({ slug: "fixture-only-test", title: text("Test fixture"), description: text("Never published"), venue: text("Test venue"), startDate: "2026-10-31", category: "concert", status: "scheduled", sourceUrl: "https://example.com/test", ...extra }, new Date("2026-10-29T10:00:00Z"));

test("Chisinau rolls October to November at local midnight", () => {
  assert.equal(chisinauDate(new Date("2026-10-31T21:59:59Z")), "2026-10-31");
  assert.equal(chisinauDate(new Date("2026-10-31T22:00:00Z")), "2026-11-01");
});
test("Chisinau rolls December to January without a deployment", () => {
  assert.equal(chisinauDate(new Date("2026-12-31T22:00:00Z")), "2027-01-01");
  assert.deepEqual(eventMonths([{ startDate: "2026-12-31", endDate: "2027-01-02" }]), ["2026-12", "2027-01"]);
});
test("leap days and real dates are validated", () => {
  assert.equal(fixture({ startDate: "2028-02-29" }).startDate, "2028-02-29");
  assert.throws(() => fixture({ startDate: "2027-02-29" }));
  assert.throws(() => fixture({ startDate: "2026-13-10" }));
  assert.throws(() => fixture({ endDate: "2026-10-30" }));
});
test("multi-month events appear in every month they overlap", () => {
  const event = { startDate: "2026-10-29", endDate: "2026-11-03" };
  assert.equal(eventOverlapsMonth(event, "2026-10"), true);
  assert.equal(eventOverlapsMonth(event, "2026-11"), true);
  assert.equal(eventOverlapsMonth(event, "2026-12"), false);
});
test("winter and summer Event JSON-LD use real offsets", () => {
  assert.equal(eventDateTime("2026-12-12", "19:00"), "2026-12-12T19:00:00+02:00");
  assert.equal(eventDateTime("2027-04-15", "20:00"), "2027-04-15T20:00:00+03:00");
  assert.equal(eventDateTime("2026-10-24", "20:00"), "2026-10-24T20:00:00+03:00");
  assert.equal(eventDateTime("2026-10-25", "20:00"), "2026-10-25T20:00:00+02:00");
  assert.equal(eventDateTime("2026-12-12"), "2026-12-12");
});
test("ambiguous or missing DST wall times do not invent an offset", () => {
  assert.equal(eventDateTime("2027-03-28", "03:30"), "2027-03-28");
  assert.equal(eventDateTime("2026-10-25", "03:30"), "2026-10-25");
});
test("optional exact local cron hour survives DST", () => {
  assert.equal(isCronLocalHour(new Date("2026-12-12T04:00:00Z"), "06"), true);
  assert.equal(isCronLocalHour(new Date("2027-04-15T03:00:00Z"), "06"), true);
  assert.equal(isCronLocalHour(new Date("2027-04-15T04:00:00Z"), "06"), false);
  assert.equal(isCronLocalHour(new Date(), "invalid"), false);
});
test("refresh queue is idempotent across repeats, verification dates and key order", () => {
  const state = emptyEventState(), event = fixture();
  assert.equal(queueCandidates(state, [event, event], [], "now"), 1);
  assert.equal(queueCandidates(state, [{ ...event, verifiedAt: "2026-10-30" }], [], "later"), 0);
  const reversed = Object.fromEntries(Object.entries(event).reverse());
  assert.equal(fingerprint(reversed), fingerprint(event));
  assert.equal(state.overrides[event.slug], undefined, "import must never publish directly");
});
test("published and rejected candidates are not requeued", () => {
  const event = fixture(), state = emptyEventState();
  assert.equal(queueCandidates(state, [event], [event], "now"), 0);
  state.rejected.push(fingerprint(event));
  assert.equal(queueCandidates(state, [event], [], "now"), 0);
});
test("duplicate occurrences from another source are not queued twice", () => {
  const state = emptyEventState(), a = fixture(), b = fixture({ slug: "another-source", sourceUrl: "https://example.org/event" });
  assert.equal(sameOccurrence(a, b), true);
  assert.equal(queueCandidates(state, [a, b], [], "now"), 1);
});
test("cancellation and rescheduling survive merges without deleting source records", () => {
  const event = fixture(), state = emptyEventState();
  state.overrides[event.slug] = { ...event, status: "cancelled" };
  assert.equal(mergeEvents([event], state)[0].status, "cancelled");
  assert.equal(event.status, "scheduled");
  state.overrides[event.slug] = { ...event, startDate: "2027-04-15", previousStartDate: event.startDate };
  assert.equal(mergeEvents([event], state).length, 1);
  assert.equal(eventSchemaStatus("scheduled", event.startDate), "https://schema.org/EventRescheduled");
  assert.equal(eventSchemaStatus("cancelled"), "https://schema.org/EventCancelled");
  assert.equal(eventSchemaStatus("postponed"), "https://schema.org/EventPostponed");
});
test("missing translations use source language without claiming translated hreflang", () => {
  const event = fixture({ title: { ru: "Тест" }, description: { ru: "Описание" } });
  assert.deepEqual(event.translatedLanguages, ["ru"]);
  assert.equal(event.description.cs, "Описание");
  assert.deepEqual(validateEvent(event).translatedLanguages, ["ru"], "approval must not turn source fallbacks into verified translations");
  assert.deepEqual(fixture().translatedLanguages, ["ru", "ro", "en", "uk", "cs"]);
});

test("cron authorization fails closed and requires the complete bearer secret", () => {
  const secret = "test-only-".repeat(5);
  assert.equal(validCronAuthorization(`Bearer ${secret}`, secret), true);
  assert.equal(validCronAuthorization(null, secret), false);
  assert.equal(validCronAuthorization("Bearer wrong", secret), false);
  assert.equal(validCronAuthorization(`Bearer ${secret}`, undefined), false);
  assert.equal(validCronAuthorization("Bearer short", "short"), false);
});
test("unsafe links, unknown status, invalid time and unlicensed external images are rejected", () => {
  for (const override of [{ sourceUrl: "javascript:alert(1)" }, { sourceUrl: "https://user:pass@example.com" }, { startTime: "25:00" }, { status: "invented" }, { image: { path: "https://example.com/poster.jpg" } }]) assert.throws(() => fixture(override));
});
test("all category covers exist locally and have provenance", async () => {
  const manifest = JSON.parse(await readFile(new URL("../public/events/categories/rights.json", import.meta.url)));
  assert.equal(manifest.files.length, 9);
  for (const name of manifest.files) assert.match(await readFile(new URL(`../public/events/categories/${name}`, import.meta.url), "utf8"), /<svg/);
});
test("bounded logs retain the most recent errors", () => {
  const state = emptyEventState();
  for (let i = 0; i < 250; i++) addEventLog(state, "error", `failure ${i}`, "now");
  assert.equal(state.logs.length, 200);
  assert.equal(state.logs.at(-1).message, "failure 249");
});
