/** Booked dates represent nights: check-in is included, check-out is excluded. */
export function isStayAvailable(start: string, end: string, bookedDates: ReadonlySet<string>) {
  return end > start && ![...bookedDates].some((date) => date >= start && date < end);
}

export function getNightCount(start: string, end: string) {
  return (Date.parse(end + "T00:00:00Z") - Date.parse(start + "T00:00:00Z")) / 86_400_000;
}
