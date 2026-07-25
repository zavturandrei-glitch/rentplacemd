export type GuideEvent = {
  id: string;
  title: string;
  startsAt: string;
  endsAt?: string;
  venue: string;
  city: string;
  description: string;
  sourceName: string;
  sourceUrl: string;
  verifiedAt: string;
  updatedAt: string;
};

/**
 * Events are intentionally empty until an event is confirmed against an
 * organiser or venue source. Never add an illustrative or assumed event here.
 */
export const guideEvents: readonly GuideEvent[] = [];

export const eventsUpdatedAt = "2026-07-25";
