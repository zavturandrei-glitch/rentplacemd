"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { guideEvents } from "@/lib/events";
import { guidePages, guidePath, guideUi, type GuideSlug } from "@/lib/guide";

export default function GuideArticle({ slug }: { slug: GuideSlug }) {
  const { language } = useLanguage();
  const data = guidePages[slug];

  useEffect(() => {
    document.title = `${data.title[language]} | RentPlaceMD`;
  }, [data.title, language]);

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
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </header>

      {slug === "events" && guideEvents.length === 0 ? (
        <section className="mt-6 rounded-[24px] border border-[#ffd21f]/60 bg-[#fff4b9] p-5 sm:p-7" aria-live="polite">
          <h2 className="text-xl font-black text-[#07111f]">{data.title[language]}</h2>
          <p className="mt-2 max-w-3xl font-semibold leading-7 text-[#07111f]/75">
            {guideUi.emptyEvents[language]}
          </p>
        </section>
      ) : null}

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
                {section.bullets ? (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {section.bullets[language].map((item) => (
                      <li key={item} className="flex gap-3 rounded-2xl bg-[#fffaf0] p-4 text-sm font-bold leading-6 text-[#07111f]">
                        <span aria-hidden="true" className="text-[#d4146f]">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
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

      <aside className="mt-6 rounded-[24px] bg-[#07111f] p-5 text-white sm:p-8" aria-labelledby="guide-sources">
        <h2 id="guide-sources" className="text-2xl font-black">
          {guideUi.sources[language]}
        </h2>
        <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-white/70">
          {guideUi.practicalNote[language]}
        </p>
        {data.sources.length > 0 ? (
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {data.sources.map((source) => (
              <li key={source.sourceUrl}>
                <a
                  href={source.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center justify-between gap-3 rounded-2xl bg-white/10 px-4 py-3 font-black transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>{source.sourceName}</span>
                  <span className="shrink-0 text-xs text-white/60">
                    {guideUi.updated[language]} {source.verifiedAt}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </aside>
    </article>
  );
}
