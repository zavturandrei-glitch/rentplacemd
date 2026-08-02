"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  destinationPath,
  destinations,
  destinationUi,
  type DestinationSlug,
} from "@/lib/moldovaDestinations";

const relatedBySlug: Record<DestinationSlug, DestinationSlug[]> = {
  cricova: ["milestii-mici", "orheiul-vechi", "castel-mimi"],
  "milestii-mici": ["cricova", "castel-mimi", "purcari"],
  purcari: ["castel-mimi", "milestii-mici", "orheiul-vechi"],
  "castel-mimi": ["cricova", "purcari", "orheiul-vechi"],
  "orheiul-vechi": ["cricova", "milestii-mici", "castel-mimi"],
};

export default function MoldovaDestinationPage({ slug }: { slug: DestinationSlug }) {
  const { language } = useLanguage();
  const data = destinations[slug];
  const copy = data.copy[language];

  useEffect(() => {
    document.title = `${copy.seoTitle} | RentPlaceMD`;
  }, [copy.seoTitle]);

  return (
    <article className="mx-auto w-full min-w-0 max-w-7xl overflow-x-clip px-4 pb-20 pt-4 sm:px-6 sm:pt-8 lg:px-8">
      <Link
        href="/guide/wineries"
        className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-black text-[#07111f] shadow-sm ring-1 ring-black/5 transition hover:text-[#d4146f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
      >
        ← {destinationUi.back[language]}
      </Link>

      <header className="relative mt-4 min-h-[540px] overflow-hidden rounded-[30px] bg-[#07111f] text-white shadow-[0_24px_70px_rgba(7,17,31,0.22)] sm:min-h-[620px]">
        <Image
          src={data.image}
          alt={data.imageAlt[language]}
          fill
          preload
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/45 to-transparent" />
        <div className="relative flex min-h-[540px] max-w-4xl flex-col justify-end p-6 sm:min-h-[620px] sm:p-10 lg:p-14">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ffd21f]">{copy.eyebrow}</p>
          <h1 className="mt-3 break-words text-4xl font-black leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-white/82 sm:text-lg">{copy.intro}</p>
        </div>
      </header>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-[26px] bg-white p-6 shadow-lg shadow-black/7 ring-1 ring-black/5 sm:p-9">
          <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: data.accent }}>
            {destinationUi.why[language]}
          </p>
          <p className="mt-4 text-xl font-bold leading-8 text-[#07111f] sm:text-2xl sm:leading-9">{copy.why}</p>
        </section>
        <section className="rounded-[26px] bg-[#07111f] p-6 text-white shadow-lg shadow-black/10 sm:p-9">
          <h2 className="text-xl font-black">{destinationUi.knownFor[language]}</h2>
          <p className="mt-3 font-medium leading-7 text-white/72">{copy.knownFor}</p>
        </section>
      </div>

      <section className="mt-10" aria-labelledby="destination-highlights">
        <h2 id="destination-highlights" className="text-3xl font-black tracking-tight text-[#07111f] sm:text-4xl">
          {destinationUi.see[language]}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {copy.highlights.map((item, index) => (
            <div key={item.title} className="rounded-[24px] bg-white p-6 ring-1 ring-black/5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white" style={{ backgroundColor: data.accent }}>
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-black text-[#07111f]">{item.title}</h3>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <section className="rounded-[26px] bg-white p-6 ring-1 ring-black/5 sm:p-8">
          <h2 className="text-2xl font-black text-[#07111f]">{destinationUi.time[language]}</h2>
          <p className="mt-3 font-medium leading-7 text-slate-600">{copy.visitTime}</p>
        </section>
        <section className="rounded-[26px] bg-white p-6 ring-1 ring-black/5 sm:p-8">
          <h2 className="text-2xl font-black text-[#07111f]">{destinationUi.route[language]}</h2>
          <p className="mt-3 font-medium leading-7 text-slate-600">{copy.route}</p>
        </section>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[26px] bg-white p-6 ring-1 ring-black/5 sm:p-8">
          <h2 className="text-2xl font-black text-[#07111f]">{destinationUi.tips[language]}</h2>
          <ul className="mt-5 space-y-4">
            {copy.tips.map((tip) => (
              <li key={tip} className="flex gap-3 font-medium leading-7 text-slate-600">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: data.accent }} />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-slate-200 pt-5 text-sm font-semibold leading-6 text-slate-500">
            {destinationUi.verify[language]}
          </p>
        </section>
        <section className="rounded-[26px] bg-[#07111f] p-6 text-white sm:p-8">
          <h2 className="text-2xl font-black">{destinationUi.location[language]}</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-white/65">{copy.route}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href={data.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#ffd21f] px-5 text-center text-sm font-black text-[#07111f] transition hover:bg-white">
              {destinationUi.map[language]} ↗
            </a>
            <a href={data.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full bg-white/10 px-5 text-center text-sm font-black text-white ring-1 ring-white/20 transition hover:bg-white hover:text-[#07111f]">
              {destinationUi.official[language]} ↗
            </a>
          </div>
        </section>
      </div>

      {slug === "cricova" || slug === "milestii-mici" ? (
        <aside className="mt-10 overflow-hidden rounded-[26px] bg-[#fff1f6] p-6 ring-1 ring-[#d4146f]/15 sm:p-9">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d4146f]">Cricova × Mileștii Mici</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#07111f]">{destinationUi.compareTitle[language]}</h2>
          <p className="mt-4 max-w-4xl font-medium leading-7 text-slate-700">{destinationUi.compareBody[language]}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {(["cricova", "milestii-mici"] as const).map((itemSlug) => (
              <Link key={itemSlug} href={destinationPath(itemSlug)} className="inline-flex min-h-11 items-center rounded-full bg-[#07111f] px-5 text-sm font-black text-white transition hover:bg-[#d4146f]">
                {destinations[itemSlug].name} →
              </Link>
            ))}
          </div>
        </aside>
      ) : null}

      <section className="mt-10" aria-labelledby="nearby-heading">
        <h2 id="nearby-heading" className="text-3xl font-black tracking-tight text-[#07111f]">{destinationUi.nearby[language]}</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {copy.nearby.map((item) => (
            <li key={item} className="rounded-[20px] bg-white p-5 font-bold leading-6 text-[#07111f] ring-1 ring-black/5">{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-3xl font-black tracking-tight text-[#07111f]">{destinationUi.faq[language]}</h2>
        <div className="mt-5 space-y-3">
          {copy.faq.map((item) => (
            <details key={item.question} className="group rounded-[20px] bg-white p-5 ring-1 ring-black/5 sm:p-6">
              <summary className="cursor-pointer list-none pr-8 text-lg font-black text-[#07111f] marker:hidden">
                {item.question}
              </summary>
              <p className="mt-3 max-w-4xl font-medium leading-7 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <aside className="mt-10 rounded-[26px] bg-[#07111f] p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-9">
        <div>
          <h2 className="text-2xl font-black sm:text-3xl">{destinationUi.stayTitle[language]}</h2>
          <p className="mt-2 max-w-2xl font-medium leading-7 text-white/70">{destinationUi.stayBody[language]}</p>
        </div>
        <Link href="/apartments" className="mt-5 inline-flex min-h-11 shrink-0 items-center rounded-full bg-[#ffd21f] px-5 text-sm font-black text-[#07111f] transition hover:bg-white sm:mt-0">
          {destinationUi.apartments[language]} →
        </Link>
      </aside>

      <section className="mt-10" aria-labelledby="related-heading">
        <h2 id="related-heading" className="text-3xl font-black tracking-tight text-[#07111f]">{destinationUi.related[language]}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {relatedBySlug[slug].map((relatedSlug) => {
            const related = destinations[relatedSlug];
            return (
              <Link key={relatedSlug} href={destinationPath(relatedSlug)} className="group overflow-hidden rounded-[22px] bg-white ring-1 ring-black/5 transition hover:-translate-y-1">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={related.image} alt={related.imageAlt[language]} fill loading="lazy" sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black text-[#07111f]">{related.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm font-medium leading-6 text-slate-600">{related.copy[language].intro}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </article>
  );
}
