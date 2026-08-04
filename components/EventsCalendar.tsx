"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  eventsUpdatedAt,
  getUpcomingGuideEvents,
  type EventCategory,
  type EventInterest,
} from "@/lib/events";
import {
  eventMonthKeys,
  eventMonthPath,
  formatEventMonth,
  getChisinauMonthKey,
  getEventsForMonth,
} from "@/lib/eventCalendar";
import type { Language } from "@/locales/translations";

type CategoryFilter = EventCategory | "all";
type InterestFilter = EventInterest | "all";

const localeByLanguage: Record<Language, string> = {
  ru: "ru-RU",
  ro: "ro-RO",
  en: "en-GB",
  uk: "uk-UA",
  cs: "cs-CZ",
};

const monthUi: Record<Language, {
  overview: string;
  current: string;
  next: string;
  archive: string;
  open: string;
  empty: string;
  archiveEmpty: string;
  important: string;
}> = {
  ru: {
    overview: "Календарь по месяцам",
    current: "Текущий месяц",
    next: "Следующий месяц",
    archive: "Архив месяцев",
    open: "Открыть афишу",
    empty: "Подтверждённых событий пока нет",
    archiveEmpty: "Архив появится после завершения первого опубликованного месяца.",
    important: "Самые важные ближайшие события",
  },
  ro: {
    overview: "Calendar pe luni",
    current: "Luna curentă",
    next: "Luna următoare",
    archive: "Arhiva lunilor",
    open: "Deschide programul",
    empty: "Nu există încă evenimente confirmate",
    archiveEmpty: "Arhiva va apărea după încheierea primei luni publicate.",
    important: "Cele mai importante evenimente viitoare",
  },
  en: {
    overview: "Calendar by month",
    current: "Current month",
    next: "Next month",
    archive: "Monthly archive",
    open: "Open listings",
    empty: "No confirmed events yet",
    archiveEmpty: "The archive will appear after the first published month has ended.",
    important: "Most important upcoming events",
  },
  uk: {
    overview: "Календар за місяцями",
    current: "Поточний місяць",
    next: "Наступний місяць",
    archive: "Архів місяців",
    open: "Відкрити афішу",
    empty: "Підтверджених подій поки немає",
    archiveEmpty: "Архів з’явиться після завершення першого опублікованого місяця.",
    important: "Найважливіші найближчі події",
  },
  cs: {
    overview: "Kalendář podle měsíců",
    current: "Aktuální měsíc",
    next: "Následující měsíc",
    archive: "Archiv měsíců",
    open: "Otevřít program",
    empty: "Zatím nejsou potvrzené akce",
    archiveEmpty: "Archiv se zobrazí po skončení prvního zveřejněného měsíce.",
    important: "Nejdůležitější nadcházející akce",
  },
};

const ui: Record<Language, {
  back: string;
  eyebrow: string;
  title: string;
  intro: string;
  featured: string;
  filters: string;
  all: string;
  month: string;
  interestFilter: string;
  empty: string;
  categories: Record<EventCategory, string>;
  interests: Record<EventInterest, string>;
  demandNote: string;
  time: string;
  details: string;
  apartments: string;
  ctaTitle: string;
  ctaText: string;
  contact: string;
  legendTitle: string;
  faqTitle: string;
  faq: Array<{ q: string; a: string }>;
  updated: string;
}> = {
  ru: {
    back: "Назад к гиду",
    eyebrow: "RentPlaceMD · городской календарь",
    title: "Календарь концертов и событий в Кишинёве 2026",
    intro: "Актуальные концерты, фестивали, спектакли и крупные городские мероприятия. Планируйте поездку заранее и подбирайте квартиру RentPlaceMD рядом с местом проведения.",
    featured: "Ближайшее важное событие",
    filters: "Фильтры календаря",
    all: "Все",
    month: "Месяц",
    interestFilter: "Ожидаемый спрос",
    empty: "По выбранным фильтрам подтверждённых событий нет.",
    categories: { concert: "Концерты", festival: "Фестивали", theatre: "Театр и шоу", sport: "Спорт", family: "Семейные", city: "Городские события", gastronomy: "Гастрономия", other: "Другое" },
    interests: { "very-high": "Очень высокий спрос", high: "Высокий спрос", medium: "Средний спрос", low: "Локальный интерес" },
    demandNote: "Редакционная оценка RentPlaceMD, основанная на масштабе площадки, известности участников и вероятном туристическом спросе.",
    time: "Начало",
    details: "Подробнее и билеты",
    apartments: "Подобрать квартиру",
    ctaTitle: "Приезжаете на концерт или фестиваль?",
    ctaText: "Подберите квартиру RentPlaceMD в Кишинёве и заранее уточните доступность на нужные даты.",
    contact: "Связаться с нами",
    legendTitle: "Как читать оценку спроса",
    faqTitle: "Вопросы о событиях и поездке",
    faq: [
      { q: "Где проходят основные концерты в Кишинёве?", a: "Крупные мероприятия часто проходят в Arena Chișinău, Национальном дворце, Зелёном театре, Органном зале и театрах города. Площадка указана в каждой карточке." },
      { q: "Когда лучше бронировать квартиру на время крупного события?", a: "Для фестивалей и концертов с высоким ожидаемым спросом лучше уточнять жильё сразу после покупки билета." },
      { q: "Как проверить, не перенесли ли концерт?", a: "Перед покупкой билета и перед поездкой проверьте актуальную информацию на официальной странице организатора или билетной платформе." },
      { q: "Можно ли подобрать квартиру рядом с местом проведения?", a: "Да. Напишите RentPlaceMD название события и даты, чтобы уточнить подходящие доступные варианты." },
      { q: "Как часто обновляется календарь?", a: "Мы перепроверяем календарь по официальным источникам и билетным платформам. Дата последнего обновления указана ниже." },
    ],
    updated: "Последнее обновление",
  },
  ro: {
    back: "Înapoi la ghid",
    eyebrow: "RentPlaceMD · calendar urban",
    title: "Calendarul concertelor și evenimentelor din Chișinău 2026",
    intro: "Concerte, festivaluri, spectacole și evenimente urbane importante confirmate. Planificați călătoria din timp și alegeți un apartament RentPlaceMD aproape de locație.",
    featured: "Următorul eveniment important",
    filters: "Filtrele calendarului",
    all: "Toate",
    month: "Luna",
    interestFilter: "Cerere estimată",
    empty: "Nu există evenimente confirmate pentru filtrele selectate.",
    categories: { concert: "Concerte", festival: "Festivaluri", theatre: "Teatru și show", sport: "Sport", family: "Pentru familie", city: "Evenimente urbane", gastronomy: "Gastronomie", other: "Altele" },
    interests: { "very-high": "Cerere foarte mare", high: "Cerere mare", medium: "Cerere medie", low: "Interes local" },
    demandNote: "Evaluare editorială RentPlaceMD bazată pe dimensiunea locației, notorietatea participanților și cererea turistică probabilă.",
    time: "Început",
    details: "Detalii și bilete",
    apartments: "Alege un apartament",
    ctaTitle: "Veniți la un concert sau festival?",
    ctaText: "Alegeți un apartament RentPlaceMD în Chișinău și verificați din timp disponibilitatea pentru datele dorite.",
    contact: "Contactați-ne",
    legendTitle: "Cum interpretăm cererea",
    faqTitle: "Întrebări despre evenimente și călătorie",
    faq: [
      { q: "Unde au loc principalele concerte din Chișinău?", a: "Evenimentele mari au loc frecvent la Arena Chișinău, Palatul Național, Teatrul Verde, Sala cu Orgă și teatrele orașului. Locația este indicată în fiecare card." },
      { q: "Când este bine să rezerv un apartament?", a: "Pentru festivaluri și concerte cu cerere estimată mare, verificați cazarea imediat după cumpărarea biletului." },
      { q: "Cum verific dacă un concert a fost reprogramat?", a: "Înainte de cumpărarea biletului și înainte de călătorie, verificați pagina oficială a organizatorului sau platforma de bilete." },
      { q: "Pot alege un apartament aproape de locație?", a: "Da. Trimiteți-ne denumirea evenimentului și datele pentru a verifica opțiunile disponibile." },
      { q: "Cât de des este actualizat calendarul?", a: "Reverificăm calendarul în surse oficiale și pe platforme de bilete. Data ultimei actualizări apare mai jos." },
    ],
    updated: "Ultima actualizare",
  },
  en: {
    back: "Back to the guide",
    eyebrow: "RentPlaceMD · city calendar",
    title: "Chișinău concerts and events calendar 2026",
    intro: "Confirmed concerts, festivals, stage shows and major city events. Plan ahead and choose a RentPlaceMD apartment close to the venue.",
    featured: "Next major event",
    filters: "Calendar filters",
    all: "All",
    month: "Month",
    interestFilter: "Expected demand",
    empty: "There are no confirmed events matching these filters.",
    categories: { concert: "Concerts", festival: "Festivals", theatre: "Theatre and shows", sport: "Sport", family: "Family", city: "City events", gastronomy: "Food and wine", other: "Other" },
    interests: { "very-high": "Very high demand", high: "High demand", medium: "Medium demand", low: "Local interest" },
    demandNote: "RentPlaceMD editorial estimate based on venue scale, participant profile and likely visitor demand.",
    time: "Starts",
    details: "Details and tickets",
    apartments: "Find an apartment",
    ctaTitle: "Coming for a concert or festival?",
    ctaText: "Choose a RentPlaceMD apartment in Chișinău and check availability for your dates in advance.",
    contact: "Contact us",
    legendTitle: "How to read the demand estimate",
    faqTitle: "Events and travel questions",
    faq: [
      { q: "Where do major Chișinău concerts take place?", a: "Large events often use Arena Chișinău, the National Palace, the Green Theatre, the Organ Hall and city theatres. Each listing shows its confirmed venue." },
      { q: "When should I arrange an apartment for a major event?", a: "For festivals and high-demand concerts, check accommodation as soon as you have bought your ticket." },
      { q: "How do I check whether a concert has moved?", a: "Before buying a ticket and before travelling, check the organiser’s official page or the ticket platform for current information." },
      { q: "Can I find an apartment near the venue?", a: "Yes. Send RentPlaceMD the event name and dates so we can check suitable available options." },
      { q: "How often is the calendar updated?", a: "We recheck official sources and ticket platforms. The latest verification date appears below." },
    ],
    updated: "Last updated",
  },
  uk: {
    back: "Назад до путівника",
    eyebrow: "RentPlaceMD · міський календар",
    title: "Календар концертів і подій у Кишиневі 2026",
    intro: "Підтверджені концерти, фестивалі, вистави та великі міські події. Плануйте поїздку заздалегідь і обирайте квартиру RentPlaceMD поруч із місцем проведення.",
    featured: "Найближча важлива подія",
    filters: "Фільтри календаря",
    all: "Усі",
    month: "Місяць",
    interestFilter: "Очікуваний попит",
    empty: "За вибраними фільтрами підтверджених подій немає.",
    categories: { concert: "Концерти", festival: "Фестивалі", theatre: "Театр і шоу", sport: "Спорт", family: "Сімейні", city: "Міські події", gastronomy: "Гастрономія", other: "Інше" },
    interests: { "very-high": "Дуже високий попит", high: "Високий попит", medium: "Середній попит", low: "Локальний інтерес" },
    demandNote: "Редакційна оцінка RentPlaceMD на основі масштабу майданчика, відомості учасників та ймовірного туристичного попиту.",
    time: "Початок",
    details: "Докладніше та квитки",
    apartments: "Підібрати квартиру",
    ctaTitle: "Приїжджаєте на концерт чи фестиваль?",
    ctaText: "Оберіть квартиру RentPlaceMD у Кишиневі та заздалегідь уточніть доступність на потрібні дати.",
    contact: "Зв’язатися з нами",
    legendTitle: "Як читати оцінку попиту",
    faqTitle: "Питання про події та поїздку",
    faq: [
      { q: "Де проходять основні концерти в Кишиневі?", a: "Великі події часто проходять в Arena Chișinău, Національному палаці, Зеленому театрі, Органному залі та міських театрах. Майданчик зазначений у кожній картці." },
      { q: "Коли краще бронювати квартиру?", a: "Для фестивалів і концертів із високим очікуваним попитом перевіряйте житло відразу після придбання квитка." },
      { q: "Як перевірити, чи не перенесли концерт?", a: "Перед купівлею квитка та перед поїздкою перевірте актуальну інформацію на офіційній сторінці організатора або квитковій платформі." },
      { q: "Чи можна підібрати квартиру поруч із майданчиком?", a: "Так. Надішліть RentPlaceMD назву події та дати, щоб уточнити доступні варіанти." },
      { q: "Як часто оновлюється календар?", a: "Ми повторно перевіряємо офіційні джерела й квиткові платформи. Дата останнього оновлення вказана нижче." },
    ],
    updated: "Останнє оновлення",
  },
  cs: {
    back: "Zpět na průvodce",
    eyebrow: "RentPlaceMD · městský kalendář",
    title: "Kalendář koncertů a akcí v Kišiněvě 2026",
    intro: "Potvrzené koncerty, festivaly, představení a významné městské akce. Naplánujte cestu včas a vyberte si apartmán RentPlaceMD poblíž místa konání.",
    featured: "Nejbližší významná akce",
    filters: "Filtry kalendáře",
    all: "Vše",
    month: "Měsíc",
    interestFilter: "Očekávaná poptávka",
    empty: "Vybraným filtrům neodpovídá žádná potvrzená akce.",
    categories: { concert: "Koncerty", festival: "Festivaly", theatre: "Divadlo a show", sport: "Sport", family: "Pro rodiny", city: "Městské akce", gastronomy: "Gastronomie", other: "Ostatní" },
    interests: { "very-high": "Velmi vysoká poptávka", high: "Vysoká poptávka", medium: "Střední poptávka", low: "Místní zájem" },
    demandNote: "Redakční odhad RentPlaceMD podle velikosti místa, známosti účastníků a pravděpodobné turistické poptávky.",
    time: "Začátek",
    details: "Podrobnosti a vstupenky",
    apartments: "Vybrat apartmán",
    ctaTitle: "Přijíždíte na koncert nebo festival?",
    ctaText: "Vyberte si apartmán RentPlaceMD v Kišiněvě a ověřte dostupnost pro své termíny s předstihem.",
    contact: "Kontaktovat",
    legendTitle: "Jak číst odhad poptávky",
    faqTitle: "Otázky k akcím a cestě",
    faq: [
      { q: "Kde se konají hlavní koncerty v Kišiněvě?", a: "Velké akce často hostí Arena Chișinău, Národní palác, Zelené divadlo, Varhanní sál a městská divadla. Místo je uvedeno u každé akce." },
      { q: "Kdy si zajistit apartmán na velkou akci?", a: "U festivalů a koncertů s vysokou očekávanou poptávkou ověřte ubytování ihned po nákupu vstupenky." },
      { q: "Jak zjistím, zda byl koncert přesunut?", a: "Před nákupem vstupenky a před cestou ověřte aktuální informace na oficiální stránce pořadatele nebo vstupenkové platformě." },
      { q: "Lze vybrat apartmán poblíž místa konání?", a: "Ano. Pošlete RentPlaceMD název akce a termín a ověříme vhodné dostupné možnosti." },
      { q: "Jak často se kalendář aktualizuje?", a: "Pravidelně kontrolujeme oficiální zdroje a vstupenkové platformy. Datum poslední kontroly je uvedeno níže." },
    ],
    updated: "Poslední aktualizace",
  },
};

function formatDate(date: string, language: Language, withWeekday = false) {
  return new Intl.DateTimeFormat(localeByLanguage[language], {
    day: "numeric",
    month: "long",
    ...(withWeekday ? { weekday: "long" as const } : {}),
    timeZone: "Europe/Chisinau",
  }).format(new Date(`${date}T12:00:00+03:00`));
}

function formatUpdated(date: string, language: Language) {
  return new Intl.DateTimeFormat(localeByLanguage[language], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Chisinau",
  }).format(new Date(`${date}T12:00:00+03:00`));
}

const categoryFilters: CategoryFilter[] = ["all", "concert", "festival", "theatre", "sport", "family", "city"];
const interestFilters: InterestFilter[] = ["all", "very-high", "high", "medium", "low"];

export default function EventsCalendar() {
  const { language } = useLanguage();
  const text = ui[language];
  const events = useMemo(() => getUpcomingGuideEvents(), []);
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [month, setMonth] = useState("all");
  const [interest, setInterest] = useState<InterestFilter>("all");

  useEffect(() => {
    document.title = `${text.title} | RentPlaceMD`;
  }, [text.title]);

  const months = useMemo(() => [...new Set(events.map((event) => event.startDate.slice(0, 7)))], [events]);
  const filtered = events.filter((event) =>
    (category === "all" || event.category === category)
    && (month === "all" || event.startDate.startsWith(month))
    && (interest === "all" || event.interest === interest),
  );
  const grouped = Object.groupBy(filtered, (event) => event.startDate.slice(0, 7));
  const featured = events.find((event) => event.featured) ?? events[0];
  const importantEvents = events.filter((event) => event.featured).slice(0, 3);
  const currentMonthKey = getChisinauMonthKey();
  const currentMonthEvents = getEventsForMonth(currentMonthKey);
  const nextMonthKey = eventMonthKeys.find((item) => item > currentMonthKey) ?? null;
  const archiveMonthKeys = eventMonthKeys.filter((item) => item < currentMonthKey).reverse();
  const monthText = monthUi[language];

  return (
    <article className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 sm:pt-8 lg:px-8">
      <Link href="/chisinau-guide" className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-semibold text-[#07111f] shadow-sm ring-1 ring-black/5 transition hover:text-[#d4146f]">
        ← {text.back}
      </Link>

      <header className="mt-4 rounded-[28px] bg-[#07111f] px-5 py-10 text-white shadow-[0_24px_70px_rgba(7,17,31,0.2)] sm:px-10 sm:py-14 lg:px-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd21f]">{text.eyebrow}</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">{text.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">{text.intro}</p>
      </header>

      <section className="mt-8 rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8" aria-labelledby="month-overview">
        <h2 id="month-overview" className="text-3xl font-semibold tracking-[-0.03em]">{monthText.overview}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[20px] bg-[#fff4b9] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d4146f]">{monthText.current}</p>
            <h3 className="mt-3 text-2xl font-semibold capitalize">{formatEventMonth(currentMonthKey, language)}</h3>
            <p className="mt-2 text-sm text-slate-600">
              {currentMonthEvents.length > 0 ? `${currentMonthEvents.length} ${monthText.open.toLowerCase()}` : monthText.empty}
            </p>
            {eventMonthKeys.includes(currentMonthKey) ? (
              <Link href={eventMonthPath(currentMonthKey)} className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#07111f] px-4 text-sm font-semibold text-white">
                {monthText.open} →
              </Link>
            ) : null}
          </div>
          {nextMonthKey ? (
            <Link href={eventMonthPath(nextMonthKey)} className="group rounded-[20px] bg-[#07111f] p-5 text-white transition hover:bg-[#d4146f]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd21f]">{monthText.next}</p>
              <h3 className="mt-3 text-2xl font-semibold capitalize">{formatEventMonth(nextMonthKey, language)}</h3>
              <p className="mt-5 text-sm font-semibold">{monthText.open} →</p>
            </Link>
          ) : null}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold">{monthText.important}</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {importantEvents.map((event) => (
              <div key={event.id} className="rounded-2xl bg-[#f4f1eb] p-4">
                <p className="text-sm font-semibold capitalize">{formatDate(event.startDate, language, true)}</p>
                <p className="mt-2 font-semibold">{event.title[language]}</p>
                <p className="mt-2 text-sm text-slate-500">{event.venue[language]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <h3 className="text-xl font-semibold">{monthText.archive}</h3>
          {archiveMonthKeys.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {archiveMonthKeys.map((monthKey) => (
                <Link key={monthKey} href={eventMonthPath(monthKey)} className="rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold capitalize transition hover:border-[#d4146f] hover:text-[#d4146f]">
                  {formatEventMonth(monthKey, language)}
                </Link>
              ))}
            </div>
          ) : <p className="mt-3 text-sm leading-6 text-slate-500">{monthText.archiveEmpty}</p>}
        </div>
      </section>

      {featured ? (
        <section className="mt-6 rounded-[24px] border border-[#f0dfbf] bg-white p-5 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d4146f]">{text.featured}</p>
          <div className="mt-4 grid gap-5 md:grid-cols-[0.28fr_0.72fr]">
            <div>
              <p className="text-2xl font-semibold capitalize">{formatDate(featured.startDate, language, true)}</p>
              {featured.startTime ? <p className="mt-2 text-slate-500">{text.time}: {featured.startTime}</p> : null}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{featured.title[language]}</h2>
              <p className="mt-2 text-slate-500">{featured.venue[language]}</p>
              <p className="mt-4 leading-7 text-slate-600">{featured.description[language]}</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mt-8 scroll-mt-[210px] rounded-[24px] bg-white p-5 ring-1 ring-black/5 lg:scroll-mt-8 sm:p-7" aria-labelledby="event-filters">
        <h2 id="event-filters" className="text-2xl font-semibold">{text.filters}</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {categoryFilters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition ${category === item ? "bg-[#07111f] text-white" : "bg-[#f4f1eb] text-slate-700 hover:bg-[#eadfce]"}`}
            >
              {item === "all" ? text.all : text.categories[item]}
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            {text.month}
            <select value={month} onChange={(event) => setMonth(event.target.value)} className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 font-medium">
              <option value="all">{text.all}</option>
              {months.map((item) => <option key={item} value={item}>{formatDate(`${item}-01`, language)}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            {text.interestFilter}
            <select value={interest} onChange={(event) => setInterest(event.target.value as InterestFilter)} className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 font-medium">
              {interestFilters.map((item) => <option key={item} value={item}>{item === "all" ? text.all : text.interests[item]}</option>)}
            </select>
          </label>
        </div>
      </section>

      <div className="mt-10 space-y-12" aria-live="polite">
        {filtered.length === 0 ? <p className="rounded-[20px] bg-white p-6 text-slate-600">{text.empty}</p> : null}
        {Object.entries(grouped).map(([monthKey, monthEvents]) => (
          <section key={monthKey}>
            <h2 className="text-3xl font-semibold capitalize tracking-[-0.03em]">{formatDate(`${monthKey}-01`, language)}</h2>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {monthEvents?.map((event) => (
                <article key={event.id} className="flex flex-col rounded-[22px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold capitalize">{formatDate(event.startDate, language, true)}</p>
                    <span className="rounded-full bg-[#fff4b9] px-3 py-1.5 text-xs font-semibold text-[#07111f]">{text.interests[event.interest]}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold leading-tight">{event.title[language]}</h3>
                  <p className="mt-2 text-sm font-medium text-[#d4146f]">{text.categories[event.category]}</p>
                  <p className="mt-4 text-sm font-semibold text-slate-700">{event.venue[language]}</p>
                  {event.startTime ? <p className="mt-1 text-sm text-slate-500">{text.time}: {event.startTime}</p> : null}
                  <p className="mt-4 flex-1 leading-7 text-slate-600">{event.description[language]}</p>
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <a
                      href={event.ticketUrl ?? event.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${text.details}: ${event.title[language]}`}
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#07111f] px-4 text-sm font-semibold text-white transition hover:bg-[#d4146f]"
                    >
                      {text.details} ↗
                    </a>
                    <Link href="/apartments" className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 px-4 text-sm font-semibold transition hover:border-[#d4146f] hover:text-[#d4146f]">
                      {text.apartments}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-14 rounded-[24px] border border-[#f0dfbf] bg-[#fffaf0] p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">{text.legendTitle}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(["very-high", "high", "medium", "low"] as EventInterest[]).map((item) => (
            <p key={item} className="rounded-xl bg-white p-4 text-sm font-semibold">{text.interests[item]}</p>
          ))}
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-6 text-slate-600">{text.demandNote}</p>
      </section>

      <section className="mt-10 rounded-[26px] bg-[#d4146f] p-6 text-white sm:p-10">
        <h2 className="text-3xl font-semibold">{text.ctaTitle}</h2>
        <p className="mt-3 max-w-2xl leading-7 text-white/80">{text.ctaText}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/apartments" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#07111f]">{text.apartments}</Link>
          <a href="https://wa.me/37369990190" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-6 text-sm font-semibold">{text.contact}</a>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-semibold">{text.faqTitle}</h2>
        <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
          {text.faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="cursor-pointer list-none pr-8 text-lg font-semibold">{item.q}</summary>
              <p className="mt-3 max-w-4xl leading-7 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-10 text-sm text-slate-500">{text.updated}: {formatUpdated(eventsUpdatedAt, language)}</p>
    </article>
  );
}
