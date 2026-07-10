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
  choose: string;
  available: string;
  categories: Record<ApartmentClass, { title: string; description: string; badge: string }>;
};

const textByLanguage: Record<Language, CategoryText> = {
  ru: {
    eyebrow: "Все квартиры",
    title: "Выберите класс квартиры",
    intro:
      "Сначала выберите формат проживания. После выбора откроется список только квартир нужного класса.",
    home: "Главная",
    allApartments: "Все квартиры",
    choose: "Выбрать",
    available: "вариантов",
    categories: {
      economy: {
        title: "Economy",
        description: "Практичные квартиры по доступной цене для короткой поездки в центре Кишинёва.",
        badge: "Доступнее",
      },
      standard: {
        title: "Standard",
        description: "Комфортные квартиры для повседневного проживания, отдыха и командировок.",
        badge: "Баланс",
      },
      standardPlus: {
        title: "Standard+",
        description: "Более свежие или улучшенные варианты повышенного комфорта.",
        badge: "Комфорт+",
      },
    },
  },
  ro: {
    eyebrow: "Toate apartamentele",
    title: "Alege clasa apartamentului",
    intro:
      "Alege mai întâi formatul potrivit. După selecție se deschide lista apartamentelor doar din clasa aleasă.",
    home: "Acasă",
    allApartments: "Toate apartamentele",
    choose: "Alege",
    available: "opțiuni",
    categories: {
      economy: {
        title: "Economy",
        description: "Apartamente practice la preț accesibil pentru o ședere scurtă în centrul Chișinăului.",
        badge: "Accesibil",
      },
      standard: {
        title: "Standard",
        description: "Apartamente confortabile pentru cazare zilnică, odihnă și deplasări de serviciu.",
        badge: "Echilibru",
      },
      standardPlus: {
        title: "Standard+",
        description: "Opțiuni mai noi sau îmbunătățite, cu un nivel mai ridicat de confort.",
        badge: "Confort+",
      },
    },
  },
  en: {
    eyebrow: "All apartments",
    title: "Choose an apartment class",
    intro:
      "Start with the stay format. After choosing a class, you will see only apartments from that category.",
    home: "Home",
    allApartments: "All apartments",
    choose: "Choose",
    available: "options",
    categories: {
      economy: {
        title: "Economy",
        description: "Practical apartments at an accessible price for a short stay in central Chisinau.",
        badge: "Accessible",
      },
      standard: {
        title: "Standard",
        description: "Comfortable apartments for everyday stays, leisure and business trips.",
        badge: "Balanced",
      },
      standardPlus: {
        title: "Standard+",
        description: "Fresher or upgraded options with a higher comfort level.",
        badge: "Comfort+",
      },
    },
  },
  uk: {
    eyebrow: "Усі квартири",
    title: "Оберіть клас квартири",
    intro:
      "Спочатку оберіть формат проживання. Після вибору відкриється список лише квартир потрібного класу.",
    home: "Головна",
    allApartments: "Усі квартири",
    choose: "Обрати",
    available: "варіантів",
    categories: {
      economy: {
        title: "Economy",
        description: "Практичні квартири за доступною ціною для короткої поїздки в центрі Кишинева.",
        badge: "Доступніше",
      },
      standard: {
        title: "Standard",
        description: "Комфортні квартири для щоденного проживання, відпочинку та відряджень.",
        badge: "Баланс",
      },
      standardPlus: {
        title: "Standard+",
        description: "Свіжіші або покращені варіанти підвищеного комфорту.",
        badge: "Комфорт+",
      },
    },
  },
  cs: {
    eyebrow: "Všechny apartmány",
    title: "Vyberte třídu apartmánu",
    intro:
      "Nejprve vyberte typ pobytu. Poté se otevře seznam pouze apartmánů z vybrané třídy.",
    home: "Domů",
    allApartments: "Všechny apartmány",
    choose: "Vybrat",
    available: "možností",
    categories: {
      economy: {
        title: "Economy",
        description: "Praktické apartmány za dostupnou cenu pro krátký pobyt v centru Kišiněva.",
        badge: "Dostupné",
      },
      standard: {
        title: "Standard",
        description: "Komfortní apartmány pro běžné pobyty, odpočinek i pracovní cesty.",
        badge: "Vyvážené",
      },
      standardPlus: {
        title: "Standard+",
        description: "Novější nebo vylepšené možnosti s vyšší úrovní komfortu.",
        badge: "Komfort+",
      },
    },
  },
};

function getCategoryApartments(category: ApartmentClass) {
  return activeApartments.filter((apartment) => apartment.class === category);
}

export default function ApartmentCategoryMenu() {
  const { language } = useLanguage();
  const text = textByLanguage[language];

  return (
    <section className="bg-[#efeee9] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
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

        <div className="mb-6 sm:mb-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d4146f]">
            {text.eyebrow}
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-black leading-tight text-[#07111f] sm:text-5xl">
            {text.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base font-bold leading-7 text-[#07111f]/72 sm:text-xl sm:leading-8">
            {text.intro}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {apartmentCategoryOrder.map((category) => {
            const categoryText = text.categories[category];
            const categoryApartments = getCategoryApartments(category);
            const firstApartment = categoryApartments[0];

            if (!firstApartment) {
              return null;
            }

            return (
              <Link
                key={category}
                href={getApartmentCategoryPath(category)}
                className="group grid h-[390px] overflow-hidden rounded-[24px] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] ring-1 ring-black/10 transition hover:-translate-y-1 hover:shadow-[0_26px_64px_rgba(15,23,42,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f] active:scale-[0.985] sm:h-[382px]"
              >
                <ResponsiveImage
                  src={firstApartment.cardPhoto ?? firstApartment.photos[0]}
                  alt={categoryText.title + " RentPlaceMD"}
                  className="h-[150px] sm:h-[170px]"
                  imgClassName="transition duration-500 group-hover:scale-[1.04]"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  objectPosition={firstApartment.cardImagePosition ?? "center"}
                  withWatermark
                >
                  <span className="absolute left-4 top-4 rounded-full bg-[#ffd21f] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#07111f] shadow-lg">
                    {categoryText.badge}
                  </span>
                </ResponsiveImage>

                <div className="flex min-h-0 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-3xl font-black leading-none text-[#07111f] sm:text-4xl">
                      {categoryText.title}
                    </h2>
                    <span className="rounded-full bg-[#f4f1ee] px-3 py-1.5 text-xs font-black text-[#07111f]/70">
                      {categoryApartments.length} {text.available}
                    </span>
                  </div>
                  <p className="mt-4 text-base font-bold leading-7 text-[#07111f]/70">
                    {categoryText.description}
                  </p>
                  <span className="mt-auto inline-flex w-full items-center justify-center rounded-2xl bg-[#07111f] px-5 py-4 text-base font-black text-white shadow-lg transition group-hover:bg-[#d4146f]">
                    {text.choose}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
