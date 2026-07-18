export function normalizeApartmentId(id: string | number) {
  return String(id)
    .trim()
    .replace(/^id\s*/i, "")
    .replace(/^[№#]\s*/, "")
    .replace(/\s+/g, "")
    .toLocaleUpperCase("en-US");
}
