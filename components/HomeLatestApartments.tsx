"use client";

import Link from "next/link";
import ApartmentCard from "@/components/ApartmentCard";
import { useLanguage } from "@/context/LanguageContext";
import { activeApartments } from "@/lib/apartments";
import type { Language } from "@/locales/translations";

const latestCopy: Record<Language, {
  eyebrow: string;
  title: string;
  text: string;
  all: string;
}> = {
  ru: {
    eyebrow: "Новые квартиры",
    title: "Последние добавленные варианты",
    text: "Пять новых квартир на Coca 15 и Varlaam 50 с реальными фотографиями и прямым бронированием.",
    all: "Смотреть весь каталог",
  },
  ro: {
    eyebrow: "Apartamente noi",
    title: "Cele mai recente opțiuni",
    text: "Cinci apartamente noi pe Coca 15 și Varlaam 50, cu fotografii reale și rezervare directă.",
    all: "Vezi întregul catalog",
  },
  en: {
    eyebrow: "New apartments",
    title: "Recently added stays",
    text: "Five new apartments at Coca 15 and Varlaam 50, with real photographs and direct booking.",
    all: "View the full catalogue",
  },
  uk: {
    eyebrow: "Нові квартири",
    title: "Нещодавно додані варіанти",
    text: "П’ять нових квартир на Coca 15 і Varlaam 50 з реальними фотографіями та прямим бронюванням.",
    all: "Переглянути весь каталог",
  },
  cs: {
    eyebrow: "Nové apartmány",
    title: "Nejnověji přidané možnosti",
    text: "Pět nových apartmánů na adresách Coca 15 a Varlaam 50 se skutečnými fotografiemi a přímou rezervací.",
    all: "Zobrazit celý katalog",
  },
};

const latestApartments = activeApartments.slice(-5);

export default function HomeLatestApartments() {
  const { language } = useLanguage();
  const copy = latestCopy[language];

  return (
    <section className="bg-[#fffaf0] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d4146f]">{copy.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#07111f] sm:text-4xl">
              {copy.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{copy.text}</p>
          </div>
          <Link
            href="/apartments"
            className="inline-flex min-h-11 w-fit items-center justify-center rounded-xl border border-[#07111f]/15 bg-white px-4 text-sm font-black text-[#07111f] transition hover:border-[#d4146f] hover:text-[#d4146f]"
          >
            {copy.all}
          </Link>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {latestApartments.map((apartment, index) => (
            <ApartmentCard key={apartment.id} apartment={apartment} priority={index < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
