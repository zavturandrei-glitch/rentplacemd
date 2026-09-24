import assert from "node:assert/strict";
import test from "node:test";
import { getNightCount, isStayAvailable } from "../lib/bookingDates.ts";
import { getBookedDatesFromICal, mergeManualAndICalDates } from "../lib/ical.ts";

const imported = getBookedDatesFromICal(`BEGIN:VCALENDAR
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260924
DTEND;VALUE=DATE:20260927
END:VEVENT
END:VCALENDAR`);

test("iCal excludes checkout and allows the next guest on that date", () => {
  assert.deepEqual(imported, ["2026-09-24", "2026-09-25", "2026-09-26"]);
  assert.equal(isStayAvailable("2026-09-27", "2026-09-30", new Set(imported)), true);
});

test("checkout on the next booking's arrival is allowed, overlapping nights are not", () => {
  const booked = new Set(imported);
  assert.equal(isStayAvailable("2026-09-23", "2026-09-24", booked), true);
  assert.equal(isStayAvailable("2026-09-26", "2026-09-28", booked), false);
  assert.equal(isStayAvailable("2026-09-23", "2026-09-28", booked), false);
  assert.equal(isStayAvailable("2026-09-25", "2026-09-25", booked), false);
  assert.equal(isStayAvailable("2026-09-28", "2026-09-27", booked), false);
});

for (const [start, end, nights] of [
  ["2026-09-25", "2026-09-26", 1],
  ["2026-09-30", "2026-10-02", 2],
  ["2026-12-31", "2027-01-02", 2],
  ["2026-10-24", "2026-10-26", 2],
]) {
  test(`night count and availability: ${start} → ${end}`, () => {
    assert.equal(getNightCount(start, end), nights);
    assert.equal(isStayAvailable(start, end, new Set()), true);
    assert.equal(isStayAvailable(start, end, new Set([start])), false);
    assert.equal(isStayAvailable(start, end, new Set([end])), true);
  });
}

test("manual dates still block nights after merging with iCal", () => {
  const booked = new Set(mergeManualAndICalDates(["2026-09-28"], imported));
  assert.equal(isStayAvailable("2026-09-27", "2026-09-30", booked), false);
});
