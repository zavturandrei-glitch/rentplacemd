"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  apartmentCategoryOrder,
  apartmentClassLabels,
  getApartmentsByClass,
  getApartmentCategoryMinimumPrice,
  getApartmentCategoryPath,
  type ApartmentClass,
} from "@/lib/apartments";
import type { Language } from "@/locales/translations";

const text: Record<
  Language,
  {
    title: string;
    intro: string;
    from: string;
    perDay: string;
    realPhotos: string;
    options: (count: number) => string;
    descriptions: Record<ApartmentClass, string>;
  }
> = {
  ru: {
    title: "Квартиры по классу",
    intro: "Перейдите сразу к нужной категории и сравните актуальные варианты.",
    from: "от",
    perDay: "MDL / сутки",
    realPhotos: "Реальные фото",
    options: (count) => {
      const remainder = count % 100;
      const ending = remainder >= 11 && remainder <= 14
        ? "вариантов"
        : count % 10 === 1
          ? "вариант"
          : count % 10 >= 2 && count % 10 <= 4
            ? "варианта"
            : "вариантов";
      return count + " " + ending;
    },
    descriptions: {
      economy: "Практичный выбор по минимальной цене каталога.",
      standard: "Комфортные студии и квартиры для короткой поездки.",
      standardPlus: "Больше планировок и пространства для выбора.",
      premium: "Выразительные интерьеры и отдельные адреса в городе.",
    },
  },
  ro: {
    title: "Apartamente după clasă",
    intro: "Deschide categoria potrivită și compară opțiunile actuale.",
    from: "de la",
    perDay: "MDL / noapte",
    realPhotos: "Fotografii reale",
    options: (count) => count + (count === 1 ? " opțiune" : " opțiuni"),
    descriptions: {
      economy: "O alegere practică la cel mai mic preț din catalog.",
      standard: "Garsoniere și apartamente confortabile pentru călătorii scurte.",
      standardPlus: "Mai multe compartimentări și mai mult spațiu de alegere.",
      premium: "Interioare expresive și adrese distincte în oraș.",
    },
  },
  en: {
    title: "Apartments by class",
    intro: "Open the relevant category and compare current options.",
    from: "from",
    perDay: "MDL / night",
    realPhotos: "Real photos",
    options: (count) => count + (count === 1 ? " option" : " options"),
    descriptions: {
      economy: "A practical choice at the catalogue’s lowest price.",
      standard: "Comfortable studios and apartments for shorter stays.",
      standardPlus: "More layouts and more room to choose from.",
      premium: "Distinctive interiors at individual city addresses.",
    },
  },
  uk: {
    title: "Квартири за класом",
    intro: "Перейдіть до потрібної категорії та порівняйте актуальні варіанти.",
    from: "від",
    perDay: "MDL / доба",
    realPhotos: "Реальні фото",
    options: (count) => {
      const remainder = count % 100;
      const ending = remainder >= 11 && remainder <= 14
        ? "варіантів"
        : count % 10 === 1
          ? "варіант"
          : count % 10 >= 2 && count % 10 <= 4
            ? "варіанти"
            : "варіантів";
      return count + " " + ending;
    },
    descriptions: {
      economy: "Практичний вибір за найнижчою ціною каталогу.",
      standard: "Комфортні студії та квартири для короткої подорожі.",
      standardPlus: "Більше планувань і простору для вибору.",
      premium: "Виразні інтер’єри та окремі адреси в місті.",
    },
  },
  cs: {
    title: "Apartmány podle třídy",
    intro: "Otevřete vhodnou kategorii a porovnejte aktuální nabídky.",
    from: "od",
    perDay: "MDL / noc",
    realPhotos: "Skutečné fotografie",
    options: (count) => count + (count === 1 ? " možnost" : count >= 2 && count <= 4 ? " možnosti" : " možností"),
    descriptions: {
      economy: "Praktická volba za nejnižší cenu v katalogu.",
      standard: "Pohodlná studia a apartmány pro kratší pobyty.",
      standardPlus: "Více dispozic a více prostoru pro výběr.",
      premium: "Výrazné interiéry na samostatných adresách ve městě.",
    },
  },
};

export default function HomeCategoryLinks() {
  const { language } = useLanguage();
  const copy = text[language];

  return (
    <section className="bg-[#efeee9] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl min-w-0">
        <p className="text-sm font-semibold text-[#d4146f]">RentPlace</p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#07111f] sm:text-3xl">
          {copy.title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{copy.intro}</p>
        <nav
          className="mt-7 grid min-w-0 grid-cols-1 gap-4 min-[520px]:grid-cols-2 lg:grid-cols-4"
          aria-label={copy.title}
        >
          {apartmentCategoryOrder.map((category) => {
            const apartments = getApartmentsByClass(category);
            const representative = apartments[0];
            const minimumPrice = getApartmentCategoryMinimumPrice(category);

            if (!representative) return null;

            return (
              <Link
                key={category}
                href={getApartmentCategoryPath(category)}
                className="group grid h-[282px] min-w-0 grid-rows-[124px_1fr] overflow-hidden rounded-[24px] bg-white shadow-[0_12px_34px_rgba(15,23,42,0.1)] ring-1 ring-black/8 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f] active:scale-[0.99] sm:h-[316px] sm:grid-rows-[142px_1fr] sm:rounded-[22px]"
              >
                <span className="relative block overflow-hidden">
                  <Image
                    src={representative.cardPhoto ?? representative.photos[0]}
                    alt={`${apartmentClassLabels[category]} · RentPlaceMD`}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 520px) 50vw, 100vw"
                    quality={78}
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.045]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#07111f]/45 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 text-xs font-black uppercase tracking-[0.16em] text-white drop-shadow">
                    RentPlace · {apartmentClassLabels[category]}
                  </span>
                </span>

                <span className="flex min-h-0 flex-col p-5">
                  <span className="flex items-start justify-between gap-3">
                    <strong className="text-[1.35rem] font-black leading-none tracking-[-0.035em] text-[#07111f]">
                      {apartmentClassLabels[category]}
                    </strong>
                    {minimumPrice !== null ? (
                      <span className="shrink-0 text-right">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          {copy.from}
                        </span>
                        <span className="mt-0.5 block text-lg font-black leading-none tabular-nums text-[#d4146f]">
                          {minimumPrice}
                        </span>
                      </span>
                    ) : null}
                  </span>

                  <span className="mt-3 line-clamp-2 text-sm font-medium leading-5 text-slate-600">
                    {copy.descriptions[category]}
                  </span>

                  <span className="mt-auto pt-4 text-[11px] font-bold leading-4 text-slate-400">
                    {copy.options(apartments.length)} · {copy.realPhotos}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
