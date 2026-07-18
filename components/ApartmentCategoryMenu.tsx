"use client";

import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";
import { useLanguage } from "@/context/LanguageContext";
import {
  activeApartments,
  apartmentCategoryOrder,
  getApartmentCategoryPath,
  type ApartmentClass,
} from "@/lib/apartments";
import type { Language } from "@/locales/translations";

type CategoryText = {
  eyebrow: string;
  title: string;
  intro: string;
  home: string;
  allApartments: string;
  emptyPrice: string;
  priceFrom: (price: number) => string;
  count: (count: number) => string;
  categories: Record<ApartmentClass, string>;
};

const textByLanguage: Record<Language, CategoryText> = {
  ru: {
    eyebrow: "Все квартиры",
    title: "Выберите класс квартиры",
    intro: "Фото, минимальная цена и все доступные варианты.",
    home: "Главная",
    allApartments: "Все квартиры",
    emptyPrice: "Цена по запросу",
    priceFrom: (price) => "от " + price + " лей",
    count: (count) => count + " " + (count % 10 === 1 && count % 100 !== 11 ? "вариант" : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14) ? "варианта" : "вариантов"),
    categories: { economy: "Economy", standard: "Standard", standardPlus: "Standard+", premium: "Premium" },
  },
  ro: {
    eyebrow: "Toate apartamentele",
    title: "Alege clasa apartamentului",
    intro: "Fotografii, prețul minim și toate opțiunile disponibile.",
    home: "Acasă",
    allApartments: "Toate apartamentele",
    emptyPrice: "Preț la cerere",
    priceFrom: (price) => "de la " + price + " lei",
    count: (count) => count + " " + (count === 1 ? "opțiune" : "opțiuni"),
    categories: { economy: "Economy", standard: "Standard", standardPlus: "Standard+", premium: "Premium" },
  },
  en: {
    eyebrow: "All apartments",
    title: "Choose an apartment class",
    intro: "Photos, the lowest price and every available option.",
    home: "Home",
    allApartments: "All apartments",
    emptyPrice: "Price on request",
    priceFrom: (price) => "from " + price + " MDL",
    count: (count) => count + " " + (count === 1 ? "option" : "options"),
    categories: { economy: "Economy", standard: "Standard", standardPlus: "Standard+", premium: "Premium" },
  },
  uk: {
    eyebrow: "Усі квартири",
    title: "Оберіть клас квартири",
    intro: "Фото, мінімальна ціна та всі доступні варіанти.",
    home: "Головна",
    allApartments: "Усі квартири",
    emptyPrice: "Ціна за запитом",
    priceFrom: (price) => "від " + price + " леїв",
    count: (count) => count + " " + (count % 10 === 1 && count % 100 !== 11 ? "варіант" : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14) ? "варіанти" : "варіантів"),
    categories: { economy: "Economy", standard: "Standard", standardPlus: "Standard+", premium: "Premium" },
  },
  cs: {
    eyebrow: "Všechny apartmány",
    title: "Vyberte třídu apartmánu",
    intro: "Fotografie, nejnižší cena a všechny dostupné možnosti.",
    home: "Domů",
    allApartments: "Všechny apartmány",
    emptyPrice: "Cena na vyžádání",
    priceFrom: (price) => "od " + price + " MDL",
    count: (count) => count + " " + (count === 1 ? "možnost" : count >= 2 && count <= 4 ? "možnosti" : "možností"),
    categories: { economy: "Economy", standard: "Standard", standardPlus: "Standard+", premium: "Premium" },
  },
};

function getCategoryApartments(category: ApartmentClass) {
  return activeApartments.filter((apartment) => apartment.class === category);
}

const categoryStartingPrices: Record<ApartmentClass, number> = {
  economy: 700,
  standard: 800,
  standardPlus: 900,
  premium: 1000,
};

export default function ApartmentCategoryMenu() {
  const { language } = useLanguage();
  const text = textByLanguage[language];

  return (
    <section className="bg-[#efeee9] px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs font-black text-[#07111f]/55 sm:text-sm">
          <Link href="/" className="rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-black/5 transition hover:text-[#d4146f]">
            {text.home}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="rounded-full bg-[#07111f] px-3 py-2 text-white shadow-sm">
            {text.allApartments}
          </span>
        </nav>

        <div className="mb-4 sm:mb-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d4146f]">
            {text.eyebrow}
          </p>
          <h1 className="mt-1.5 max-w-3xl text-2xl font-black leading-tight text-[#07111f] sm:text-4xl">
            {text.title}
          </h1>
          <p className="mt-2 max-w-3xl text-sm font-bold leading-5 text-[#07111f]/72 sm:text-base sm:leading-6">
            {text.intro}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-4">
          {apartmentCategoryOrder.map((category) => {
            const categoryTitle = text.categories[category];
            const categoryApartments = getCategoryApartments(category);
            const firstApartment = categoryApartments[0];
            const startingPrice = categoryStartingPrices[category];

            if (!firstApartment) {
              return null;
            }

            return (
              <Link
                key={category}
                href={getApartmentCategoryPath(category)}
                className="group grid h-[214px] min-w-0 grid-rows-[112px_1fr] overflow-hidden rounded-[20px] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.11)] ring-1 ring-black/10 transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f] active:scale-[0.985] sm:h-[238px] sm:grid-rows-[132px_1fr]"
              >
                <ResponsiveImage
                  src={firstApartment.cardPhoto ?? firstApartment.photos[0]}
                  alt={categoryTitle + " RentPlaceMD"}
                  className="h-full"
                  imgClassName="transition duration-500 group-hover:scale-[1.04]"
                  sizes="(min-width: 768px) 25vw, 50vw"
                  objectPosition={firstApartment.cardImagePosition ?? "center"}
                  withWatermark
                />

                <div className="flex min-h-0 min-w-0 flex-col justify-center px-3 py-2.5 sm:px-4">
                  <h2 className="truncate text-[18px] font-black leading-tight text-[#07111f] sm:text-2xl">
                    {categoryTitle}
                  </h2>
                  <p className="mt-1 truncate text-[12px] font-black text-[#d4146f] sm:text-sm">
                    {text.priceFrom(startingPrice)}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] font-bold text-[#07111f]/60 sm:text-xs">
                    {text.count(categoryApartments.length)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
