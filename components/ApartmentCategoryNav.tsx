"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  apartmentCategoryOrder,
  getApartmentCategoryPath,
  type ApartmentClass,
} from "@/lib/apartments";
import type { Language } from "@/locales/translations";

const textByLanguage: Record<
  Language,
  {
    home: string;
    allApartments: string;
    allCategories: string;
    categories: Record<ApartmentClass, string>;
  }
> = {
  ru: {
    home: "Главная",
    allApartments: "Все квартиры",
    allCategories: "Все категории",
    categories: { economy: "Economy", standard: "Standard", standardPlus: "Standard+" },
  },
  ro: {
    home: "Acasă",
    allApartments: "Toate apartamentele",
    allCategories: "Toate categoriile",
    categories: { economy: "Economy", standard: "Standard", standardPlus: "Standard+" },
  },
  en: {
    home: "Home",
    allApartments: "All apartments",
    allCategories: "All categories",
    categories: { economy: "Economy", standard: "Standard", standardPlus: "Standard+" },
  },
  uk: {
    home: "Головна",
    allApartments: "Усі квартири",
    allCategories: "Усі категорії",
    categories: { economy: "Economy", standard: "Standard", standardPlus: "Standard+" },
  },
  cs: {
    home: "Domů",
    allApartments: "Všechny apartmány",
    allCategories: "Všechny kategorie",
    categories: { economy: "Economy", standard: "Standard", standardPlus: "Standard+" },
  },
};

export default function ApartmentCategoryNav({ currentClass }: { currentClass: ApartmentClass }) {
  const { language } = useLanguage();
  const text = textByLanguage[language];

  return (
    <section className="bg-[#fffaf0] px-4 pt-7 sm:px-6 sm:pt-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-black text-[#07111f]/55 sm:text-sm">
          <Link href="/" className="rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-black/5 transition hover:text-[#d4146f]">
            {text.home}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/apartments" className="rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-black/5 transition hover:text-[#d4146f]">
            {text.allApartments}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="rounded-full bg-[#07111f] px-3 py-2 text-white shadow-sm">
            {text.categories[currentClass]}
          </span>
        </nav>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/apartments"
            className="rounded-2xl bg-[#07111f] px-4 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d4146f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
          >
            {text.allCategories}
          </Link>
          {apartmentCategoryOrder.map((category) => (
            <Link
              key={category}
              href={getApartmentCategoryPath(category)}
              aria-current={category === currentClass ? "page" : undefined}
              className={
                "rounded-2xl px-4 py-3 text-sm font-black shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f] " +
                (category === currentClass
                  ? "bg-[#ffd21f] text-[#07111f]"
                  : "bg-white text-[#07111f] hover:text-[#d4146f]")
              }
            >
              {text.categories[category]}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
