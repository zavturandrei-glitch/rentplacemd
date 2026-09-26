export type JourneyEvent = {
  name: "tourism_to_apartments" | "apartment_view_click" | "contact_click" | "excursion_request";
  params: Record<string, string>;
};

export function isTourismPath(path: string) {
  return path === "/excursions" || path === "/chisinau-guide" || path.startsWith("/guide/") || path === "/events" || path.startsWith("/events/");
}

// Only paths/controlled identifiers are collected. Never send WhatsApp text, dates,
// guest counts, telephone numbers or other user-entered content to analytics.
export function classifyJourneyClick(href: string, source: string, origin: string): JourneyEvent | null {
  let destination: URL;
  try { destination = new URL(href, origin); } catch { return null; }
  const params = { source_path: source };
  if (destination.protocol === "tel:" || destination.hostname === "wa.me" || destination.hostname === "api.whatsapp.com") {
    return { name: "contact_click", params: { ...params, contact_method: destination.protocol === "tel:" ? "phone" : "whatsapp" } };
  }
  if (destination.origin !== origin) return null;
  if (isTourismPath(source) && /^\/apartments(?:\/|$)/.test(destination.pathname)) {
    return { name: "tourism_to_apartments", params: { ...params, destination_path: destination.pathname } };
  }
  if (/^\/apartment\/[^/]+$/.test(destination.pathname) && source !== destination.pathname) {
    return { name: "apartment_view_click", params: { ...params, destination_path: destination.pathname } };
  }
  return null;
}

type StorageLike = Pick<Storage, "getItem" | "setItem">;
export function createJourneyTracker(send: (event: JourneyEvent) => void, storage?: StorageLike) {
  const seen = new Set<string>();
  return (event: JourneyEvent) => {
    const key = `rentplace:journey:v1:${event.name}:${JSON.stringify(Object.entries(event.params).sort())}`;
    try { if (storage?.getItem(key)) return false; } catch { /* Storage may be disabled. */ }
    if (seen.has(key)) return false;
    send(event);
    seen.add(key);
    try { storage?.setItem(key, "1"); } catch { /* In-memory deduplication still works. */ }
    return true;
  };
}
