"use client";

import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";
import { useLanguage } from "@/context/LanguageContext";
import {
  apartmentCategoryOrder,
  apartmentClassLabels,
  getApartmentsByClass,
  getApartmentCategoryMinimumPrice,
  getApartmentCategoryPath,
} from "@/lib/apartments";
import type { Language } from "@/locales/translations";

const text: Record<Language, { title: string; from: string; comfort: string }> = {
  ru: { title: "Квартиры по классу", from: "от", comfort: "Комфорт" },
  ro: { title: "Apartamente după clasă", from: "de la", comfort: "Comfort" },
  en: { title: "Apartments by class", from: "from", comfort: "Comfort" },
  uk: { title: "Квартири за класом", from: "від", comfort: "Comfort" },
  cs: { title: "Apartmány podle třídy", from: "od", comfort: "Comfort" },
};

export default function HomeCategoryLinks() {
  const { language } = useLanguage();
  const copy = text[language];

  return (
    <section className="bg-[#0a1525] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl min-w-0">
        <h2 className="text-xl font-black tracking-[-0.025em] text-white sm:text-3xl">
          {copy.title}
        </h2>
        <nav className="mt-4 grid min-w-0 grid-cols-2 gap-3 sm:mt-6 sm:gap-4 lg:grid-cols-4" aria-label={copy.title}>
          {apartmentCategoryOrder.map((category) => {
            const representative = getApartmentsByClass(category)[0];
            const minimumPrice = getApartmentCategoryMinimumPrice(category);
            const categoryLabel = category === "standardPlus" ? copy.comfort : apartmentClassLabels[category];
            if (!representative) return null;

            return (
              <Link
                key={category}
                href={getApartmentCategoryPath(category)}
                className="group relative h-[166px] min-w-0 overflow-hidden rounded-[20px] border border-white/10 bg-[#111e31] shadow-[0_12px_30px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4fa3] active:scale-[.985] sm:h-[220px]"
              >
                <ResponsiveImage
                  src={representative.cardPhoto ?? representative.photos[0]}
                  alt={`${categoryLabel} · RentPlaceMD`}
                  className="h-full w-full"
                  imgClassName="object-cover transition duration-500 group-hover:scale-[1.035]"
                  sizes="(min-width: 1024px) 280px, 50vw"
                  objectPosition={representative.cardImagePosition ?? "center"}
                  withWatermark
                />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(4,10,20,.92)_100%)]" />
                <span className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 p-3.5 text-white sm:flex-row sm:items-end sm:justify-between sm:gap-2 sm:p-5">
                  <strong className="min-w-0 text-[15px] font-black leading-none sm:text-xl">
                    {categoryLabel}
                  </strong>
                  {minimumPrice !== null ? (
                    <span className="shrink-0 text-left text-[11px] font-black leading-tight text-[#ffd21f] sm:text-right sm:text-sm">
                      {copy.from} {minimumPrice} MDL
                    </span>
                  ) : null}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
