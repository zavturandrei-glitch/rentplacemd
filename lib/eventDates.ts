// Pure calendar rules, shared by rendering and executable regression tests.
export function chisinauDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Chisinau", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const value = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${value.year}-${value.month}-${value.day}`;
}

export function eventOverlapsMonth(event: { startDate: string; endDate?: string }, month: string) {
  return event.startDate.slice(0, 7) <= month && (event.endDate ?? event.startDate).slice(0, 7) >= month;
}

export function eventMonths(events: readonly { startDate: string; endDate?: string }[]) {
  const months = new Set<string>();
  for (const event of events) {
    const cursor = new Date(`${event.startDate.slice(0, 7)}-01T12:00:00Z`);
    const end = (event.endDate ?? event.startDate).slice(0, 7);
    while (cursor.toISOString().slice(0, 7) <= end) {
      months.add(cursor.toISOString().slice(0, 7));
      cursor.setUTCMonth(cursor.getUTCMonth() + 1);
    }
  }
  return [...months].sort();
}

export function eventDateTime(date: string, time?: string) {
  if (!time) return date;
  const wallTime = `${date}T${time}:00`;
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Chisinau", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  });
  const offsets = ["+02:00", "+03:00"].filter(offset => {
    const values = Object.fromEntries(formatter.formatToParts(new Date(wallTime + offset)).map(({ type, value }) => [type, value]));
    return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:00` === wallTime;
  });
  // DST gaps and ambiguous repeated times need organiser confirmation, not a guessed offset.
  return offsets.length === 1 ? wallTime + offsets[0] : date;
}

export function eventSchemaStatus(status: string, previousStartDate?: string) {
  if (status === "cancelled") return "https://schema.org/EventCancelled";
  if (status === "postponed") return "https://schema.org/EventPostponed";
  if (previousStartDate) return "https://schema.org/EventRescheduled";
  return "https://schema.org/EventScheduled";
}

export function isCronLocalHour(now: Date, configuredHour?: string) {
  if (!configuredHour) return true;
  if (!/^([01]\d|2[0-3])$/.test(configuredHour)) return false;
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Chisinau", hour: "2-digit", hourCycle: "h23" }).format(now) === configuredHour;
}

export function eventPageLanguages(events: readonly { translatedLanguages?: string[] }[]) {
  return (["ru", "ro", "en", "uk", "cs"] as const).filter(language => events.every(event => !event.translatedLanguages || event.translatedLanguages.includes(language)));
}
