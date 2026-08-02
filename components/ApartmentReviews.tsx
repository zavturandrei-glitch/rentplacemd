"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { ApartmentReview } from "@/lib/apartmentReviews";
import type { Language } from "@/locales/translations";

const copy: Record<
  Language,
  { title: string; reviewCount: string; allReviews: string }
> = {
  ru: {
    title: "Отзывы гостей",
    reviewCount: "отзывов",
    allReviews: "Все отзывы",
  },
  ro: {
    title: "Recenziile oaspeților",
    reviewCount: "recenzii",
    allReviews: "Toate recenziile",
  },
  en: {
    title: "Guest reviews",
    reviewCount: "reviews",
    allReviews: "All reviews",
  },
  uk: {
    title: "Відгуки гостей",
    reviewCount: "відгуків",
    allReviews: "Усі відгуки",
  },
  cs: {
    title: "Hodnocení hostů",
    reviewCount: "hodnocení",
    allReviews: "Všechna hodnocení",
  },
};

export default function ApartmentReviews({
  reviews,
}: {
  reviews: ApartmentReview[];
}) {
  const { language } = useLanguage();

  if (reviews.length === 0) {
    return null;
  }

  const text = copy[language];
  const average =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <section
      className="border-t border-[#07111f]/10 py-7 sm:py-9"
      aria-labelledby="apartment-reviews-title"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d4146f]">
            {average.toFixed(1)} / 5 · {reviews.length} {text.reviewCount}
          </p>
          <h2
            id="apartment-reviews-title"
            className="mt-1 text-2xl font-black tracking-tight"
          >
            {text.title}
          </h2>
        </div>
        {reviews.length > 3 ? (
          <button
            type="button"
            className="min-h-11 rounded-xl border border-[#07111f]/15 px-4 text-sm font-black"
          >
            {text.allReviews}
          </button>
        ) : null}
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {reviews.slice(0, 3).map((review) => (
          <article
            key={review.id}
            className="rounded-2xl border border-[#07111f]/10 bg-white p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-black">{review.guestName}</p>
              <p className="text-sm font-black text-[#d4146f]">
                {review.rating} / 5
              </p>
            </div>
            <time
              className="mt-1 block text-xs font-bold text-slate-500"
              dateTime={review.stayedAt}
            >
              {review.stayedAt}
            </time>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
              {review.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
