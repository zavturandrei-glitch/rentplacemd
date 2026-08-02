"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  destinationUi,
  destinations,
  winerySlugs,
  type DestinationSlug,
} from "@/lib/moldovaDestinations";

const withLanguage = (path: string, language: string) =>
  `${path}${path.includes("?") ? "&" : "?"}lang=${language}`;

export default function MoldovaDestinationPage({ slug }: { slug: DestinationSlug }) {
  const { language } = useLanguage();
  const data = destinations[slug];

  useEffect(() => {
    document.title = `${data.title[language]} | RentPlaceMD`;
  }, [data.title, language]);

  const related = slug === "orheiul-vechi"
    ? ["cricova", "milestii-mici"] as const
    : winerySlugs.filter((item) => item !== slug).slice(0, 2);

  return (
    <article className="bg-[#f5f1e8] text-[#15231d]">
      <header className="relative min-h-[72svh] overflow-hidden">
        <Image
          src={data.image}
          alt={data.title[language]}
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
        <div className="relative mx-auto flex min-h-[72svh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 text-white sm:px-6 sm:pb-16 lg:px-8">
          <Link href={withLanguage(slug === "orheiul-vechi" ? "/chisinau-guide" : "/guide/wineries", language)} className="mb-7 w-fit text-sm font-bold underline decoration-white/35 underline-offset-4 hover:decoration-white">
            ← {slug === "orheiul-vechi" ? destinationUi.guide[language] : destinationUi.wineries[language]}
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f3d5a5]">{data.eyebrow[language]}</p>
          <h1 className="mt-4 max-w-5xl text-balance font-serif text-4xl leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">{data.title[language]}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/80 sm:text-lg">{data.description[language]}</p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section aria-labelledby="trip-facts" className="border-y border-[#15231d]/15 py-8">
          <h2 id="trip-facts" className="font-serif text-3xl">{destinationUi.facts[language]}</h2>
          <dl className="mt-7 grid gap-7 md:grid-cols-3">
            {[
              [destinationUi.location[language], data.location[language]],
              [destinationUi.duration[language], data.tripLength[language]],
              [destinationUi.route[language], data.route[language]],
            ].map(([term, value]) => (
              <div key={term}>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#8b3e2f]">{term}</dt>
                <dd className="mt-2 text-base leading-7">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={data.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center bg-[#8b3e2f] px-5 text-sm font-bold text-white transition hover:bg-[#6f2f24]">
              {destinationUi.official[language]} ↗
            </a>
            <a href={data.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center border border-[#15231d]/25 px-5 text-sm font-bold transition hover:bg-white">
              {destinationUi.map[language]} ↗
            </a>
          </div>
        </section>

        <div className="mx-auto max-w-3xl py-14 sm:py-20">
          {data.sections.map((item, index) => (
            <section key={item.title.en} className={index === 0 ? "" : "mt-14 border-t border-[#15231d]/12 pt-14"}>
              <p className="text-xs font-bold tracking-[0.15em] text-[#8b3e2f]">0{index + 1}</p>
              <h2 className="mt-3 text-balance font-serif text-3xl leading-tight sm:text-4xl">{item.title[language]}</h2>
              <p className="mt-5 text-lg leading-8 text-[#33443c]">{item.body[language]}</p>
            </section>
          ))}
          <aside className="mt-14 border-l-4 border-[#8b3e2f] bg-white/70 p-6 text-base leading-7">
            {destinationUi.currentInfo[language]}
          </aside>
        </div>

        <section className="border-t border-[#15231d]/15 py-12" aria-labelledby="related-route">
          <h2 id="related-route" className="font-serif text-3xl">{destinationUi.related[language]}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((item) => {
              const destination = destinations[item];
              return (
                <Link key={item} href={withLanguage(destination.path, language)} className="group border-t border-[#15231d]/25 py-5">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#8b3e2f]">{destination.eyebrow[language]}</span>
                  <h3 className="mt-2 font-serif text-2xl group-hover:text-[#8b3e2f]">{destination.title[language]}</h3>
                </Link>
              );
            })}
          </div>
          <Link href={withLanguage(slug === "orheiul-vechi" ? "/chisinau-guide" : "/guide/wineries", language)} className="mt-5 inline-flex text-sm font-bold text-[#8b3e2f]">
            {slug === "orheiul-vechi" ? destinationUi.guide[language] : destinationUi.wineries[language]} →
          </Link>
        </section>

        <aside className="grid gap-5 bg-[#15231d] p-7 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:p-10">
          <div>
            <h2 className="font-serif text-3xl">{destinationUi.apartmentsTitle[language]}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-white/70">{destinationUi.apartmentsBody[language]}</p>
          </div>
          <Link href={withLanguage("/apartments", language)} className="inline-flex min-h-12 items-center justify-center bg-[#f3d5a5] px-5 text-sm font-bold text-[#15231d]">
            {destinationUi.apartmentsLink[language]} →
          </Link>
        </aside>

        <p className="mt-8 text-xs leading-5 text-[#59675f]">
          {data.officialName}: <a className="underline underline-offset-3" href={data.officialUrl} target="_blank" rel="noopener noreferrer">{data.officialUrl}</a>
        </p>
      </div>
    </article>
  );
}
