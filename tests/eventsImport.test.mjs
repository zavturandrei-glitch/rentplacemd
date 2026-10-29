import test from "node:test";
import assert from "node:assert/strict";
import { validateEventImport, emptyEventState, queueCandidates } from "../lib/eventsWorkflow.ts";

const input = { slug: "test-only-import", title: { ru: "Тест, не публиковать" }, description: { ru: "Только для автоматических тестов" }, venue: { ru: "Тестовая площадка" }, startDate: "2027-01-10", category: "theatre", status: "scheduled", sourceUrl: "https://example.com/test" };
test("manual import accepts a batch into review without publishing and remains idempotent", () => {
  const state = emptyEventState();
  const events = validateEventImport([input, input]);
  assert.equal(queueCandidates(state, events, [], "now"), 1);
  assert.deepEqual(state.overrides, {});
  assert.equal(queueCandidates(state, validateEventImport([input]), [], "later"), 0);
});
test("manual import validates every item before a batch can reach the store", () => {
  let writes = 0;
  assert.throws(() => { const events = validateEventImport([input, { ...input, startDate: "2027-02-30" }]); writes += events.length; });
  assert.equal(writes, 0);
  for (const value of [[], {}, Array.from({ length: 101 }, () => input)]) assert.throws(() => validateEventImport(value));
});
test("manual cancellation and rescheduling retain stable IDs and missing translation flags", () => {
  const [cancelled, moved] = validateEventImport([{ ...input, status: "cancelled" }, { ...input, startDate: "2027-02-10", previousStartDate: input.startDate }]);
  assert.equal(cancelled.id, input.slug);
  assert.equal(cancelled.status, "cancelled");
  assert.equal(moved.previousStartDate, input.startDate);
  assert.deepEqual(moved.translatedLanguages, ["ru"]);
});
