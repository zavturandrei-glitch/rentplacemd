"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  apartmentCategoryOrder,
  apartmentClassLabels,
  getApartmentCategoryMinimumPrice,
  getApartmentCategoryPath,
} from "@/lib/apartments";
import type { Language } from "@/locales/translations";

const text: Record<Language, { title: string; intro: string; from: string; perDay: string }> = {
  ru: {
    title: "Квартиры по классу",
    intro: "Перейдите сразу к нужной категории и сравните актуальные варианты.",
    from: "от",
    perDay: "MDL / сутки",
  },
  ro: {
    title: "Apartamente după clasă",
    intro: "Deschide categoria potrivită și compară opțiunile actuale.",
    from: "de la",
    perDay: "MDL / noapte",
  },
  en: {
    title: "Apartments by class",
    intro: "Open the relevant category and compare current options.",
    from: "from",
    perDay: "MDL / night",
  },
  uk: {
    title: "Квартири за класом",
    intro: "Перейдіть до потрібної категорії та порівняйте актуальні варіанти.",
    from: "від",
    perDay: "MDL / доба",
  },
  cs: {
    title: "Apartmány podle třídy",
    intro: "Otevřete vhodnou kategorii a porovnejte aktuální nabídky.",
    from: "od",
    perDay: "MDL / noc",
  },
};

export default function HomeCategoryLinks() {
  const { language } = useLanguage();
  const copy = text[language];

  return (
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl min-w-0">
        <h2 className="text-2xl font-black tracking-tight text-[#07111f] sm:text-3xl">{copy.title}</h2>
        <p className="mt-2 text-slate-600">{copy.intro}</p>
        <nav className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label={copy.title}>
          {apartmentCategoryOrder.map((category) => {
            const minimumPrice = getApartmentCategoryMinimumPrice(category);
            return (
              <Link
                key={category}
                href={getApartmentCategoryPath(category)}
                className="group min-w-0 rounded-2xl bg-[#fffaf0] p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:ring-[#d4146f]/30"
              >
                <span className="block text-lg font-black text-[#07111f] group-hover:text-[#d4146f]">
                  {apartmentClassLabels[category]}
                </span>
                {minimumPrice !== null ? (
                  <span className="mt-2 block text-sm font-bold text-slate-600">
                    {copy.from} {minimumPrice} {copy.perDay}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
