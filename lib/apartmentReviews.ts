import type { Language } from "@/locales/translations";

export type ApartmentReview = {
  id: string;
  apartmentId: string;
  guestName: string;
  stayedAt: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  language: Language;
};

// Only reviews tied to a verified stay should be added here.
// The empty collection intentionally prevents fabricated ratings or review schema.
export const apartmentReviews: ApartmentReview[] = [];

export function getApartmentReviews(apartmentId: string | number) {
  return apartmentReviews
    .filter((review) => review.apartmentId === String(apartmentId))
    .sort((left, right) => right.stayedAt.localeCompare(left.stayedAt));
}
