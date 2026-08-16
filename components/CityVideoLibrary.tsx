"use client";

import Link from "next/link";
import CityVideoCard from "@/components/CityVideoCard";
import { useLanguage } from "@/context/LanguageContext";
import { cityVideoUi } from "@/lib/cityVideoContent";
import type { CityVideo } from "@/lib/cityVideoTypes";
import type { Language } from "@/locales/translations";

export type FeaturedCityEvent = {
  slug: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  venue: Record<Language, string>;
  startDate: string;
  endDate?: string;
  href: string;
};

const monthNames: Record<Language, readonly string[]> = {
  ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
  ro: ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  uk: ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"],
  cs: ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"],
};

function formatEventRange(event: FeaturedCityEvent, language: Language) {
  const [startYear, startMonth, startDay] = event.startDate.split("-").map(Number);
  const endParts = (event.endDate ?? event.startDate).split("-").map(Number);
  const [endYear, endMonth, endDay] = endParts;
  const dayPart = startYear === endYear && startMonth === endMonth && startDay !== endDay
    ? `${startDay}–${endDay}`
    : String(startDay);
  const month = monthNames[language][startMonth - 1];
  if (language === "en") return `${month} ${dayPart}, ${startYear}`;
  if (language === "cs") return `${dayPart}. ${month} ${startYear}`;
  if (language === "ru") return `${dayPart} ${month} ${startYear} г.`;
  if (language === "uk") return `${dayPart} ${month} ${startYear} р.`;
  return `${dayPart} ${month} ${startYear}`;
}

export default function CityVideoLibrary({ videos, featuredEvent }: { videos: CityVideo[]; featuredEvent?: FeaturedCityEvent }) {
  const { language } = useLanguage();
  const copy = cityVideoUi[language].page;

  return (
    <>
      <section className="bg-[#07111f] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff83b9]">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.045em] sm:text-6xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">{copy.intro}</p>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 id="city-video-list" className="text-2xl font-black tracking-[-0.03em] text-[#07111f] sm:text-3xl">{copy.videosTitle}</h2>
          {featuredEvent ? (
            <aside className="mt-5 flex flex-col gap-4 rounded-[22px] border border-[#d4146f]/15 bg-[#fff0f6] p-5 text-[#07111f] sm:flex-row sm:items-center sm:justify-between sm:p-6" aria-label={copy.featuredEvent}>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d4146f]">{copy.featuredEvent} · {formatEventRange(featuredEvent, language)}</p>
                <h3 className="mt-2 text-xl font-black">{featuredEvent.title[language]}</h3>
                <p className="mt-1 text-sm font-bold text-slate-700">{featuredEvent.venue[language]}</p>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{featuredEvent.description[language]}</p>
              </div>
              <Link href={`${featuredEvent.href}?lang=${language}#${featuredEvent.slug}`} className="inline-flex min-h-11 shrink-0 items-center justify-center self-start rounded-xl bg-[#d4146f] px-4 text-sm font-black text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07111f]">
                {copy.eventDetails} →
              </Link>
            </aside>
          ) : null}
          {videos.length > 0 ? (
            <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-7 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-4" aria-labelledby="city-video-list">
              {videos.map((video) => <CityVideoCard key={video.id} video={video} layout="grid" />)}
            </div>
          ) : (
            <p className="mt-6 rounded-[24px] border border-dashed border-[#07111f]/15 bg-white p-6 text-base leading-7 text-slate-600">{copy.empty}</p>
          )}
        </div>
      </section>

      <section className="bg-[#efeee9] px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-black tracking-[-0.03em] text-[#07111f] sm:text-3xl">{copy.linksTitle}</h2>
          <nav className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label={copy.linksTitle}>
            <InternalLink href={`/events?lang=${language}`} label={copy.events} />
            <InternalLink href={`/chisinau-guide?lang=${language}`} label={copy.guide} />
            <InternalLink href={`/apartments?lang=${language}`} label={copy.apartments} />
            <InternalLink href={`/guide/attractions?lang=${language}`} label={copy.attractions} />
          </nav>
          <div className="mt-10 max-w-3xl border-t border-[#07111f]/10 pt-8">
            <h2 className="text-xl font-black tracking-[-0.025em] text-[#07111f] sm:text-2xl">{copy.exploreTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{copy.exploreText}</p>
          </div>
        </div>
      </section>
    </>
  );
}

function InternalLink({ href, label }: { href: string; label: string }) {
  return <Link href={href} className="flex min-h-14 items-center justify-between rounded-2xl bg-white px-4 text-sm font-black text-[#07111f] shadow-sm ring-1 ring-black/5 transition hover:text-[#d4146f]">{label}<span aria-hidden="true">→</span></Link>;
}
