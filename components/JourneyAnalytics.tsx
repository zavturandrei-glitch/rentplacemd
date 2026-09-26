"use client";

import { useEffect } from "react";
import { classifyJourneyClick, createJourneyTracker, isTourismPath, type JourneyEvent } from "@/lib/journeyAnalytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export default function JourneyAnalytics() {
  useEffect(() => {
    if (window.location.hostname !== "rentplace.md") return;
    let storage: Storage | undefined;
    try { storage = window.sessionStorage; } catch { /* Optional. */ }
    const track = createJourneyTracker((event: JourneyEvent) => {
      const payload = { ...event.params, transport_type: "beacon" };
      if (window.gtag) window.gtag("event", event.name, payload);
      else (window.dataLayer ??= []).push(["event", event.name, payload]);
    }, storage);
    const enrich = (event: JourneyEvent) => {
      let journeyOrigin = "";
      try { journeyOrigin = storage?.getItem("rentplace:journey:origin") ?? ""; } catch { /* Optional. */ }
      track({ ...event, params: { ...event.params, language: document.documentElement.lang, ...(journeyOrigin ? { journey_origin: journeyOrigin } : {}) } });
    };
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || !(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link || link.hasAttribute("data-excursion-request")) return;
      const source = window.location.pathname;
      if (isTourismPath(source)) {
        try { storage?.setItem("rentplace:journey:origin", source); } catch { /* Optional. */ }
      }
      const classified = classifyJourneyClick(link.getAttribute("href")!, source, window.location.origin);
      if (classified) enrich(classified);
    };
    const onRequest = (event: Event) => {
      const route = (event as CustomEvent<{ route: string }>).detail?.route;
      if (!["orhei", "cricova", "milestii", "combined"].includes(route)) return;
      enrich({ name: "excursion_request", params: { source_path: "/excursions", route_id: route, contact_method: "whatsapp" } });
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("rentplace:excursion-request", onRequest);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("rentplace:excursion-request", onRequest);
    };
  }, []);
  return null;
}
