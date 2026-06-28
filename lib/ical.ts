export type ICalEvent = {
  uid?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
};

function normalizeDate(value: string) {
  return value.trim().replace(/^(\d{4})(\d{2})(\d{2}).*$/, "$1-$2-$3");
}

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function expandDateRange(startDate: string, endDate?: string) {
  if (!endDate || endDate === startDate) return [startDate];

  const dates: string[] = [];
  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");

  for (let date = start; date < end; date = addDays(date, 1)) {
    dates.push(formatDate(date));
  }

  return dates;
}

// Later Booking.com iCal feed content will be fetched on the server
// and passed into this parser. Keep API independent from Booking.com URL shape.
export function parseICalEvents(icalContent: string): ICalEvent[] {
  const events: ICalEvent[] = [];
  const blocks = icalContent.split("BEGIN:VEVENT").slice(1);

  for (const block of blocks) {
    const uid = block.match(/UID(?:;[^:]*)?:(.+)/)?.[1]?.trim();
    const summary = block.match(/SUMMARY(?:;[^:]*)?:(.+)/)?.[1]?.trim();
    const startDate = block.match(/DTSTART(?:;VALUE=DATE)?(?:;[^:]*)?:(.+)/)?.[1];
    const endDate = block.match(/DTEND(?:;VALUE=DATE)?(?:;[^:]*)?:(.+)/)?.[1];

    if (!startDate) continue;

    events.push({
      uid,
      summary,
      startDate: normalizeDate(startDate),
      endDate: endDate ? normalizeDate(endDate) : undefined,
    });
  }

  return events;
}

export function getBookedDatesFromICal(icalContent: string) {
  return parseICalEvents(icalContent).flatMap((event) =>
    expandDateRange(event.startDate, event.endDate),
  );
}

export function mergeManualAndICalDates(
  manualDates: string[],
  icalDates: string[],
) {
  return Array.from(new Set([...manualDates, ...icalDates])).sort();
}
