"use client";

import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";
import { useLanguage } from "@/context/LanguageContext";
import { getApartmentDisplayAddress } from "@/lib/apartmentLocalization";
import { getApartmentClassLabel } from "@/lib/apartmentCategoryLocalization";
import {
  activeApartments,
  getApartmentCatalogPrice,
  getApartmentPath,
} from "@/lib/apartments";
import type { Language } from "@/locales/translations";

const copyByLanguage: Record<Language, { title: string; hint: string; perDay: string; open: string; all: string }> = {
  ru: { title: "Рекомендуемые квартиры", hint: "Листайте в сторону", perDay: "MDL / сутки", open: "Подробнее", all: "Весь каталог" },
  ro: { title: "Apartamente recomandate", hint: "Glisează lateral", perDay: "MDL / noapte", open: "Detalii", all: "Tot catalogul" },
  en: { title: "Recommended apartments", hint: "Swipe sideways", perDay: "MDL / night", open: "View", all: "Full catalogue" },
  uk: { title: "Рекомендовані квартири", hint: "Гортайте вбік", perDay: "MDL / доба", open: "Докладніше", all: "Увесь каталог" },
  cs: { title: "Doporučené apartmány", hint: "Posuňte do strany", perDay: "MDL / noc", open: "Detail", all: "Celý katalog" },
};

const recommendedApartments = activeApartments.filter((apartment) =>
  ["15", "16", "202", "203", "204"].includes(String(apartment.id)),
);

export default function HomeLatestApartments() {
  const { language } = useLanguage();
  const copy = copyByLanguage[language];

  return (
    <section className="bg-[#07111f] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-black tracking-[-0.025em] text-white sm:text-3xl">{copy.title}</h2>
            <p className="mt-1.5 text-xs font-semibold text-white/50 sm:text-sm">{copy.hint} →</p>
          </div>
          <Link href="/apartments" className="hidden min-h-11 items-center rounded-xl border border-white/12 bg-white/6 px-4 text-sm font-black text-white sm:inline-flex">
            {copy.all}
          </Link>
        </div>

        <div className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-4 sm:px-0">
          {recommendedApartments.map((apartment, index) => {
            const address = getApartmentDisplayAddress(apartment.id, apartment.title, language);
            return (
              <Link
                key={apartment.id}
                href={getApartmentPath(apartment)}
                aria-label={`${copy.open}: ID ${apartment.id}, ${address}`}
                className="group w-[78vw] max-w-[310px] shrink-0 snap-start overflow-hidden rounded-[20px] border border-white/10 bg-[#111e31] text-white shadow-[0_14px_34px_rgba(0,0,0,.24)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4fa3] sm:w-[320px]"
              >
                <ResponsiveImage
                  src={apartment.cardPhoto ?? apartment.photos[0]}
                  alt={`ID ${apartment.id} · ${address}`}
                  className="aspect-[16/10]"
                  imgClassName="transition duration-500 group-hover:scale-[1.035]"
                  sizes="320px"
                  objectPosition={apartment.cardImagePosition ?? "center"}
                  priority={index === 0}
                  withWatermark
                >
                  <span className="absolute left-3 top-3 rounded-full bg-[#ffd21f] px-3 py-1.5 text-xs font-black text-[#07111f] shadow">
                    ID {apartment.id}
                  </span>
                </ResponsiveImage>
                <span className="block p-4">
                  <span className="block text-[11px] font-black uppercase tracking-[0.13em] text-[#ff83b9]">
                    {getApartmentClassLabel(apartment.class, language)}
                  </span>
                  <strong className="mt-1.5 block truncate text-base font-black">{address}</strong>
                  <span className="mt-3 flex items-end justify-between gap-3">
                    <span className="text-lg font-black text-[#ffd21f]">
                      {getApartmentCatalogPrice(apartment)} <small className="text-[10px]">{copy.perDay}</small>
                    </span>
                    <span className="text-xs font-black text-white/70">{copy.open} →</span>
                  </span>
                </span>
              </Link>
            );
          })}
          <span className="w-1 shrink-0" aria-hidden="true" />
        </div>
        <Link href="/apartments" className="mt-2 inline-flex min-h-11 items-center rounded-xl border border-white/12 bg-white/6 px-4 text-sm font-black text-white sm:hidden">
          {copy.all}
        </Link>
      </div>
    </section>
  );
}
