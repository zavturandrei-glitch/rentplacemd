"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { guideCards, guidePath, guideUi } from "@/lib/guide";

export default function GuideHub() {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = `${guideUi.hubTitle[language]} | RentPlaceMD`;
  }, [language]);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 sm:pt-8 lg:px-8">
      <header className="overflow-hidden rounded-[28px] bg-[#07111f] px-5 py-9 text-white shadow-[0_24px_70px_rgba(7,17,31,0.18)] sm:px-10 sm:py-12 lg:px-14">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ffd21f]">
          RentPlaceMD
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
          {guideUi.hubTitle[language]}
        </h1>
        <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-white/75 sm:text-lg">
          {guideUi.hubIntro[language]}
        </p>
      </header>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guideCards.map((card, index) => (
          <Link
            key={card.slug}
            href={guidePath(card.slug)}
            className="group overflow-hidden rounded-[24px] bg-white shadow-lg shadow-black/8 ring-1 ring-black/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-[#07111f]">
              <Image
                src={card.image}
                alt={card.title[language]}
                fill
                preload={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-5 sm:p-6">
              <h2 className="text-xl font-black tracking-tight text-[#07111f]">
                {card.title[language]}
              </h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                {card.description[language]}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#d4146f]">
                {guideUi.open[language]} <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
