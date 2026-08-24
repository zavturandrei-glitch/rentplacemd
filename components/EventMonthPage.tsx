"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  eventMonthPath,
  formatEventMonth,
  getAdjacentEventMonths,
  getEventMonthSeo,
  getEventsForMonth,
} from "@/lib/eventCalendar";
import type { EventCategory, EventInterest } from "@/lib/events";
import type { Language } from "@/locales/translations";

const localeByLanguage: Record<Language, string> = {
  ru: "ru-RU",
  ro: "ro-RO",
  en: "en-GB",
  uk: "uk-UA",
  cs: "cs-CZ",
};

const text: Record<Language, {
  back: string;
  eyebrow: string;
  events: string;
  highDemand: string;
  noHighDemand: string;
  noEvents: string;
  time: string;
  details: string;
  apartments: string;
  ctaTitle: string;
  ctaText: string;
  previous: string;
  next: string;
  categories: Record<EventCategory, string>;
  interests: Record<EventInterest, string>;
}> = {
  ru: {
    back: "Общий календарь",
    eyebrow: "RentPlaceMD · календарь по месяцам",
    events: "Главные события месяца",
    highDemand: "Даты с самым высоким спросом",
    noHighDemand: "В этом месяце пока нет дат с очень высоким ожидаемым спросом.",
    noEvents: "На этот месяц пока нет событий с достаточно подтверждёнными данными.",
    time: "Начало",
    details: "Источник и билеты",
    apartments: "Перейти к квартирам",
    ctaTitle: "Планируете поездку на событие?",
    ctaText: "Проверьте квартиры RentPlaceMD заранее — на даты крупных фестивалей и концертов спрос обычно растёт.",
    previous: "Предыдущий месяц",
    next: "Следующий месяц",
    categories: { concert: "Концерт", festival: "Фестиваль", theatre: "Театр и шоу", sport: "Спорт", business: "Бизнес и технологии", family: "Семейное", city: "Городское", gastronomy: "Гастрономия", other: "Другое" },
    interests: { "very-high": "Очень высокий спрос", high: "Высокий спрос", medium: "Средний спрос", low: "Локальный интерес" },
  },
  ro: {
    back: "Calendarul general",
    eyebrow: "RentPlaceMD · calendar lunar",
    events: "Evenimentele principale ale lunii",
    highDemand: "Datele cu cea mai mare cerere",
    noHighDemand: "În această lună nu există încă date cu o cerere estimată foarte mare.",
    noEvents: "Pentru această lună nu există încă evenimente cu suficiente date confirmate.",
    time: "Început",
    details: "Sursă și bilete",
    apartments: "Vezi apartamentele",
    ctaTitle: "Planificați o călătorie la un eveniment?",
    ctaText: "Verificați din timp apartamentele RentPlaceMD — cererea crește de obicei la festivaluri și concerte importante.",
    previous: "Luna precedentă",
    next: "Luna următoare",
    categories: { concert: "Concert", festival: "Festival", theatre: "Teatru și show", sport: "Sport", business: "Business și tehnologie", family: "Familie", city: "Urban", gastronomy: "Gastronomie", other: "Altele" },
    interests: { "very-high": "Cerere foarte mare", high: "Cerere mare", medium: "Cerere medie", low: "Interes local" },
  },
  en: {
    back: "Full calendar",
    eyebrow: "RentPlaceMD · monthly calendar",
    events: "Major events this month",
    highDemand: "Highest-demand dates",
    noHighDemand: "There are no dates with very high expected demand confirmed for this month yet.",
    noEvents: "There are no events with sufficiently confirmed details for this month yet.",
    time: "Starts",
    details: "Source and tickets",
    apartments: "Browse apartments",
    ctaTitle: "Planning a trip for an event?",
    ctaText: "Check RentPlaceMD apartments early — demand usually rises around major festivals and concerts.",
    previous: "Previous month",
    next: "Next month",
    categories: { concert: "Concert", festival: "Festival", theatre: "Theatre and show", sport: "Sport", business: "Business and technology", family: "Family", city: "City", gastronomy: "Food and wine", other: "Other" },
    interests: { "very-high": "Very high demand", high: "High demand", medium: "Medium demand", low: "Local interest" },
  },
  uk: {
    back: "Загальний календар",
    eyebrow: "RentPlaceMD · календар за місяцями",
    events: "Головні події місяця",
    highDemand: "Дати з найвищим попитом",
    noHighDemand: "Цього місяця ще немає дат із дуже високим очікуваним попитом.",
    noEvents: "На цей місяць ще немає подій із достатньо підтвердженими даними.",
    time: "Початок",
    details: "Джерело та квитки",
    apartments: "Перейти до квартир",
    ctaTitle: "Плануєте поїздку на подію?",
    ctaText: "Перевірте квартири RentPlaceMD заздалегідь — у дні великих фестивалів і концертів попит зазвичай зростає.",
    previous: "Попередній місяць",
    next: "Наступний місяць",
    categories: { concert: "Концерт", festival: "Фестиваль", theatre: "Театр і шоу", sport: "Спорт", business: "Бізнес і технології", family: "Сімейне", city: "Міське", gastronomy: "Гастрономія", other: "Інше" },
    interests: { "very-high": "Дуже високий попит", high: "Високий попит", medium: "Середній попит", low: "Локальний інтерес" },
  },
  cs: {
    back: "Celý kalendář",
    eyebrow: "RentPlaceMD · měsíční kalendář",
    events: "Hlavní akce měsíce",
    highDemand: "Termíny s nejvyšší poptávkou",
    noHighDemand: "Pro tento měsíc zatím nejsou potvrzeny termíny s velmi vysokou očekávanou poptávkou.",
    noEvents: "Pro tento měsíc zatím nejsou akce s dostatečně potvrzenými údaji.",
    time: "Začátek",
    details: "Zdroj a vstupenky",
    apartments: "Zobrazit apartmány",
    ctaTitle: "Plánujete cestu na akci?",
    ctaText: "Prověřte apartmány RentPlaceMD včas — během velkých festivalů a koncertů poptávka obvykle roste.",
    previous: "Předchozí měsíc",
    next: "Následující měsíc",
    categories: { concert: "Koncert", festival: "Festival", theatre: "Divadlo a show", sport: "Sport", business: "Byznys a technologie", family: "Rodinné", city: "Městské", gastronomy: "Gastronomie", other: "Ostatní" },
    interests: { "very-high": "Velmi vysoká poptávka", high: "Vysoká poptávka", medium: "Střední poptávka", low: "Místní zájem" },
  },
};

function formatDate(date: string, language: Language) {
  return new Intl.DateTimeFormat(localeByLanguage[language], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Chisinau",
  }).format(new Date(`${date}T12:00:00+03:00`));
}

export default function EventMonthPage({ monthKey }: { monthKey: string }) {
  const { language } = useLanguage();
  const ui = text[language];
  const seo = getEventMonthSeo(monthKey, language);
  const events = getEventsForMonth(monthKey);
  const highDemandEvents = events.filter(
    (event) => event.interest === "very-high" || event.interest === "high",
  );
  const adjacent = getAdjacentEventMonths(monthKey);

  useEffect(() => {
    document.title = `${seo.title} | RentPlaceMD`;
  }, [seo.title]);

  return (
    <article className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 sm:pt-8 lg:px-8">
      <nav aria-label="Breadcrumb">
        <Link href="/events" className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-semibold text-[#07111f] shadow-sm ring-1 ring-black/5 transition hover:text-[#d4146f]">
          ← {ui.back}
        </Link>
      </nav>

      <header className="mt-4 rounded-[28px] bg-[#07111f] px-5 py-10 text-white shadow-[0_24px_70px_rgba(7,17,31,0.2)] sm:px-10 sm:py-14 lg:px-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd21f]">{ui.eyebrow}</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-semibold capitalize leading-tight tracking-[-0.04em] sm:text-6xl">{seo.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">{seo.intro}</p>
      </header>

      <section className="mt-8 rounded-[24px] border border-[#f0dfbf] bg-[#fff4b9] p-5 sm:p-8">
        <h2 className="text-2xl font-semibold text-[#07111f]">{ui.highDemand}</h2>
        {highDemandEvents.length > 0 ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {highDemandEvents.map((event) => (
              <div key={event.id} className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="font-semibold capitalize">{formatDate(event.startDate, language)}</p>
                <p className="mt-2 text-sm font-medium text-[#d4146f]">{event.title[language]}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{ui.interests[event.interest]}</p>
              </div>
            ))}
          </div>
        ) : <p className="mt-3 leading-7 text-slate-600">{ui.noHighDemand}</p>}
      </section>

      <section className="mt-12" aria-labelledby="month-events">
        <h2 id="month-events" className="text-3xl font-semibold tracking-[-0.03em]">{ui.events}</h2>
        {events.length > 0 ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {events.map((event) => (
              <article id={event.slug} key={event.id} className="scroll-mt-24 flex flex-col rounded-[22px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold capitalize">{formatDate(event.startDate, language)}</p>
                  <span className="rounded-full bg-[#fff4b9] px-3 py-1.5 text-xs font-semibold">{ui.interests[event.interest]}</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold leading-tight">{event.title[language]}</h3>
                <p className="mt-2 text-sm font-medium text-[#d4146f]">{ui.categories[event.category]}</p>
                <p className="mt-4 text-sm font-semibold text-slate-700">{event.venue[language]}</p>
                {event.startTime ? <p className="mt-1 text-sm text-slate-500">{ui.time}: {event.startTime}</p> : null}
                <p className="mt-4 flex-1 leading-7 text-slate-600">{event.description[language]}</p>
                <div className="mt-4 rounded-xl bg-[#fffaf0] p-4 text-sm leading-6 text-slate-700">
                  <p className="font-semibold">{formatDate(event.demandStart, language)}–{formatDate(event.demandEnd, language)}</p>
                  <p className="mt-1">{event.demandReason[language]}</p>
                </div>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <a href={event.ticketUrl ?? event.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#07111f] px-5 text-sm font-semibold text-white transition hover:bg-[#d4146f]">{ui.details} ↗</a>
                  <Link href={`/apartments?lang=${language}`} className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 px-5 text-sm font-semibold">{ui.apartments}</Link>
                </div>
              </article>
            ))}
          </div>
        ) : <p className="mt-5 rounded-[20px] bg-white p-6 text-slate-600">{ui.noEvents}</p>}
      </section>

      <section className="mt-12 rounded-[26px] bg-[#d4146f] p-6 text-white sm:p-10">
        <h2 className="text-3xl font-semibold">{ui.ctaTitle}</h2>
        <p className="mt-3 max-w-2xl leading-7 text-white/80">{ui.ctaText}</p>
        <Link href={`/apartments?lang=${language}`} className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#07111f]">
          {ui.apartments}
        </Link>
      </section>

      <nav className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="Monthly event calendar">
        {adjacent.previous ? (
          <Link href={eventMonthPath(adjacent.previous)} className="rounded-2xl bg-white p-5 font-semibold shadow-sm ring-1 ring-black/5 transition hover:text-[#d4146f]">
            ← {ui.previous}<span className="mt-1 block capitalize text-sm text-slate-500">{formatEventMonth(adjacent.previous, language)}</span>
          </Link>
        ) : <span />}
        {adjacent.next ? (
          <Link href={eventMonthPath(adjacent.next)} className="rounded-2xl bg-white p-5 text-right font-semibold shadow-sm ring-1 ring-black/5 transition hover:text-[#d4146f]">
            {ui.next} →<span className="mt-1 block capitalize text-sm text-slate-500">{formatEventMonth(adjacent.next, language)}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
