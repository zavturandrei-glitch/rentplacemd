"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import EventsCalendar from "@/components/EventsCalendar";
import { useLanguage } from "@/context/LanguageContext";
import { guidePages, guidePath, guideUi, type GuideSlug } from "@/lib/guide";
import type { Language } from "@/locales/translations";

const apartmentRelevantGuides = new Set<GuideSlug>([
  "walking-tours",
  "dental-tourism",
  "museums",
  "wineries",
  "attractions",
  "restaurants",
]);

const apartmentCta: Record<Language, { title: string; body: string; link: string }> = {
  ru: {
    title: "Нужна квартира на время поездки?",
    body: "Сравните опубликованные варианты по классу, цене, планировке и фотографиям.",
    link: "Открыть каталог квартир",
  },
  ro: {
    title: "Ai nevoie de un apartament pentru călătorie?",
    body: "Compară opțiunile publicate după clasă, preț, compartimentare și fotografii.",
    link: "Deschide catalogul de apartamente",
  },
  en: {
    title: "Need an apartment for your visit?",
    body: "Compare the published options by class, price, layout and photos.",
    link: "Open the apartment catalogue",
  },
  uk: {
    title: "Потрібна квартира на час поїздки?",
    body: "Порівняйте опубліковані варіанти за класом, ціною, плануванням і фотографіями.",
    link: "Відкрити каталог квартир",
  },
  cs: {
    title: "Potřebujete apartmán během návštěvy?",
    body: "Porovnejte zveřejněné nabídky podle třídy, ceny, dispozice a fotografií.",
    link: "Otevřít katalog apartmánů",
  },
};

export default function GuideArticle({ slug }: { slug: GuideSlug }) {
  const { language } = useLanguage();
  const data = guidePages[slug];

  useEffect(() => {
    document.title = `${data.title[language]} | RentPlaceMD`;
  }, [data.title, language]);

  if (slug === "events") {
    return <EventsCalendar />;
  }

  return (
    <article className="mx-auto max-w-6xl px-4 pb-20 pt-4 sm:px-6 sm:pt-8 lg:px-8">
      <Link
        href="/chisinau-guide"
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-black text-[#07111f] shadow-sm ring-1 ring-black/5 transition hover:text-[#d4146f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
      >
        <span aria-hidden="true">←</span> {guideUi.back[language]}
      </Link>

      <header className="mt-4 overflow-hidden rounded-[28px] bg-[#07111f] text-white shadow-[0_24px_70px_rgba(7,17,31,0.2)]">
        <div className="grid lg:grid-cols-[1fr_0.85fr]">
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ffd21f]">
              {data.eyebrow[language]}
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              {data.title[language]}
            </h1>
            <p className="mt-5 text-base font-semibold leading-7 text-white/75 sm:text-lg">
              {data.description[language]}
            </p>
          </div>
          <div className="relative min-h-64 lg:min-h-[430px]">
            <Image
              src={data.image}
              alt={data.title[language]}
              fill
              preload
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </header>

      <div className="mt-6 grid gap-5">
        {data.sections.map((section, index) => (
          <section
            key={section.title.en}
            className="rounded-[24px] bg-white p-5 shadow-lg shadow-black/7 ring-1 ring-black/5 sm:p-8"
          >
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4146f] text-sm font-black text-white">
                {index + 1}
              </span>
              <div className="min-w-0">
                <h2 className="text-2xl font-black tracking-tight text-[#07111f] sm:text-3xl">
                  {section.title[language]}
                </h2>
                <p className="mt-3 text-base font-medium leading-7 text-slate-600">
                  {section.body[language]}
                </p>
                {section.note ? (
                  <div className="mt-6 border-l-2 border-[#d4146f]/35 pl-4 sm:pl-5">
                    <h3 className="text-base font-black text-[#07111f]">
                      {section.note.title[language]}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                      {section.note.body[language]}
                    </p>
                  </div>
                ) : null}
                {section.links ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {section.links.map((item) => (
                      <Link
                        key={item.slug}
                        href={guidePath(item.slug)}
                        className="rounded-full bg-[#07111f] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#d4146f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
                      >
                        {item.label[language]} →
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ))}
      </div>

      {apartmentRelevantGuides.has(slug) ? (
        <aside className="mt-8 rounded-[24px] bg-[#07111f] p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
          <div className="min-w-0">
            <h2 className="text-xl font-black sm:text-2xl">{apartmentCta[language].title}</h2>
            <p className="mt-2 leading-7 text-white/75">{apartmentCta[language].body}</p>
          </div>
          <Link
            href="/apartments"
            className="mt-5 inline-flex min-h-11 shrink-0 items-center rounded-full bg-[#ffd21f] px-5 text-sm font-black text-[#07111f] transition hover:bg-white sm:mt-0"
          >
            {apartmentCta[language].link} →
          </Link>
        </aside>
      ) : null}

      {data.sources.length > 0 ? (
        <aside className="mt-10 border-t border-slate-200 pt-6" aria-labelledby="guide-sources">
          <h2 id="guide-sources" className="text-lg font-black text-[#07111f]">
            {guideUi.sources[language]}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
            {data.sources.map((source) => (
              <li key={source.sourceUrl}>
                <a
                  href={source.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#d4146f] underline decoration-[#d4146f]/30 underline-offset-4 transition hover:decoration-[#d4146f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
                >
                  {source.sourceName}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </article>
  );
}
