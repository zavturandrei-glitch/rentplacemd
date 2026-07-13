export const CHISINAU_TIME_ZONE = "Europe/Chisinau";

export function getChisinauDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CHISINAU_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return values.year + "-" + values.month + "-" + values.day;
}

export function isPastChisinauDate(dateKey: string, now = new Date()) {
  return dateKey < getChisinauDateKey(now);
}
