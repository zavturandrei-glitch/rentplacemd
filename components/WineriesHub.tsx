"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  destinationPath,
  destinationUi,
  wineryDestinations,
} from "@/lib/moldovaDestinations";

export default function WineriesHub() {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = `${destinationUi.hubTitle[language]} | RentPlaceMD`;
  }, [language]);

  const wineries = wineryDestinations.filter((item) => item.kind === "winery");
  const heritage = wineryDestinations.find((item) => item.kind === "heritage");

  return (
    <article className="mx-auto w-full min-w-0 max-w-7xl overflow-x-clip px-4 pb-20 pt-4 sm:px-6 sm:pt-8 lg:px-8">
      <Link
        href="/chisinau-guide"
        className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-black text-[#07111f] shadow-sm ring-1 ring-black/5 transition hover:text-[#d4146f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
      >
        ← {destinationUi.back[language]}
      </Link>

      <header className="relative mt-4 min-h-[520px] overflow-hidden rounded-[30px] bg-[#07111f] text-white shadow-[0_24px_70px_rgba(7,17,31,0.22)] sm:min-h-[560px]">
        <Image
          src="/guide/wineries.webp"
          alt={destinationUi.hubTitle[language]}
          fill
          preload
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/55 to-[#07111f]/10" />
        <div className="relative flex min-h-[520px] max-w-4xl flex-col justify-end p-6 sm:min-h-[560px] sm:p-10 lg:p-14">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ffd21f]">
            {destinationUi.hubEyebrow[language]}
          </p>
          <h1 className="mt-3 break-words text-4xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
            {destinationUi.hubTitle[language]}
          </h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-white/80 sm:text-lg">
            {destinationUi.hubIntro[language]}
          </p>
        </div>
      </header>

      <section className="mt-10" aria-labelledby="wineries-list">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d4146f]">
              Moldova
            </p>
            <h2 id="wineries-list" className="mt-2 text-3xl font-black tracking-tight text-[#07111f] sm:text-4xl">
              {destinationUi.wineriesLabel[language]}
            </h2>
          </div>
          <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-black text-slate-500 ring-1 ring-black/5 sm:inline-flex">
            4
          </span>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {wineries.map((item, index) => {
            const copy = item.copy[language];
            return (
              <Link
                key={item.slug}
                href={destinationPath(item.slug)}
                className="group overflow-hidden rounded-[26px] bg-white shadow-lg shadow-black/8 ring-1 ring-black/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#07111f]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt[language]}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/92 px-3 py-1.5 text-xs font-black text-[#07111f] backdrop-blur">
                    0{index + 1}
                  </span>
                </div>
                <div className="p-5 sm:p-7">
                  <h3 className="text-2xl font-black tracking-tight text-[#07111f] sm:text-3xl">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-slate-600 sm:text-base">
                    {copy.intro}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#d4146f]">
                    {destinationUi.openGuide[language]} <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {heritage ? (
        <section className="mt-10" aria-labelledby="heritage-list">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#166534]">
            {destinationUi.heritageLabel[language]}
          </p>
          <Link
            href={destinationPath(heritage.slug)}
            className="group mt-4 grid overflow-hidden rounded-[26px] bg-[#07111f] text-white shadow-xl shadow-black/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f] lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="relative min-h-72 overflow-hidden lg:min-h-[390px]">
              <Image
                src={heritage.image}
                alt={heritage.imageAlt[language]}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.025]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <h2 id="heritage-list" className="text-3xl font-black tracking-tight sm:text-5xl">
                {heritage.name}
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-white/72">
                {heritage.copy[language].intro}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#ffd21f]">
                {destinationUi.openGuide[language]} <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </section>
      ) : null}

      <aside className="mt-10 rounded-[26px] bg-white p-6 ring-1 ring-black/5 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
        <div>
          <h2 className="text-2xl font-black text-[#07111f]">{destinationUi.stayTitle[language]}</h2>
          <p className="mt-2 max-w-2xl font-medium leading-7 text-slate-600">{destinationUi.stayBody[language]}</p>
        </div>
        <Link
          href="/apartments"
          className="mt-5 inline-flex min-h-11 shrink-0 items-center rounded-full bg-[#ffd21f] px-5 text-sm font-black text-[#07111f] transition hover:bg-[#07111f] hover:text-white sm:mt-0"
        >
          {destinationUi.apartments[language]} →
        </Link>
      </aside>
    </article>
  );
}
