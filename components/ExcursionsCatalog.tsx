"use client";

import Image from "next/image";
import Link from "@/components/LocalizedLink";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { excursions, excursionLabel, travelUi as ui, type Theme } from "@/lib/excursions";
import { catalogCopy, routeSummaries } from "@/lib/excursionCatalogCopy";
import { buildExcursionWhatsAppUrl } from "@/lib/excursionRequest";

const filters = ["all", "wine", "history", "city", "nature", "culture", "half", "day"] as const;
type Filter = (typeof filters)[number];
const button = "inline-flex min-h-12 items-center justify-center rounded-xl bg-[#15231d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#315c48] focus-visible:outline-2 focus-visible:outline-offset-4";

export default function ExcursionsCatalog({ initialRoute }: { initialRoute?: string }) {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [route, setRoute] = useState(excursions.find((item) => item.id === initialRoute && item.requestable)?.id ?? "orhei");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [tourLanguage, setTourLanguage] = useState("");
  const visible = excursions.filter((item) => filter === "all" || item.duration === filter || item.themes.includes(filter as Theme));
  const selected = excursions.find((item) => item.id === route)!;
  const whatsappUrl = buildExcursionWhatsAppUrl({ routeTitle: excursionLabel(selected, language), date, guests, tourLanguage, labels: { request: ui.request[language], route: ui.route[language], date: ui.date[language], guests: ui.guests[language], language: ui.language[language], unspecified: ui.unspecified[language] } });

  return (
    <section className="bg-[#f5f1e8] px-4 pb-20 pt-8 text-[#15231d] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="grid gap-8 border-b border-[#15231d]/20 pb-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b3e2f]">RentPlaceMD · Moldova</p>
            <h1 className="mt-4 text-balance font-serif text-4xl leading-[1.08] tracking-[-0.035em] sm:text-6xl">{ui.title[language]}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#526158]">{ui.intro[language]}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold underline underline-offset-4">
              <Link href="/chisinau-guide">{ui.hub[language]}</Link>
              <Link href="/events">{ui.events[language]}</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
            <Image src="/guide/moldova-trips.webp" alt={excursions[0].title[language]} fill preload sizes="(min-width:1024px) 500px, 100vw" className="object-cover" />
          </div>
        </header>

        <nav aria-label={ui.all[language]} className="mt-8 flex flex-wrap gap-2">
          {filters.map((key) => <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)} className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 ${filter === key ? "border-[#15231d] bg-[#15231d] text-white" : "border-[#15231d]/25 bg-white/60 hover:bg-white"}`}>{ui[key][language]}</button>)}
        </nav>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-[#526158]">{ui.durationNote[language]}</p>
        <p role="status" aria-live="polite" className="mt-3 text-sm font-semibold">{ui.all[language]}: {visible.length} / {excursions.length}</p>

        <div id="routes" className="mt-6 grid scroll-mt-28 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => <article key={item.id} id={item.id} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#15231d]/15 bg-white/70">
            {item.image ? <div className="relative h-32"><Image src={item.image} alt={excursionLabel(item, language)} fill sizes="(min-width:1024px) 370px, (min-width:768px) 50vw, 100vw" className="object-cover" /></div> : <div aria-hidden="true" className="flex h-20 items-center justify-between bg-[#e6eadf] px-5 text-[#526158]"><span className="text-xs font-bold tracking-[0.2em]">MOLDOVA</span><span className="text-3xl">↗</span></div>}
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-[#8b3e2f]">{ui[item.duration][language]} · {item.themes.map((theme) => ui[theme][language]).join(" / ")}</p>
              <h2 className="mt-2 font-serif text-2xl leading-tight">{excursionLabel(item, language)}</h2>
              <p className="mb-3 mt-2 text-sm leading-6 text-[#526158]">{routeSummaries[item.id as keyof typeof routeSummaries][language]}</p>
              <div className="mt-auto flex flex-col items-start text-sm font-bold">
                {item.external ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex min-h-11 flex-col justify-center underline underline-offset-4">{catalogCopy.more[language]} ↗<span className="text-xs font-normal no-underline">{catalogCopy.external[language]}</span></a> : <Link href={`${item.href}#route-${item.number}`} className="inline-flex min-h-11 items-center underline underline-offset-4">{catalogCopy.more[language]} →</Link>}
                {item.requestable && <a href="#request" onClick={() => setRoute(item.id)} className="inline-flex min-h-11 items-center text-[#8b3e2f] underline underline-offset-4">{ui.request[language]} →</a>}
              </div>
            </div>
          </article>)}
        </div>

        <section className="mt-8 rounded-2xl border border-[#15231d]/15 bg-white/40 p-5" aria-labelledby="travel-tips">
          <h2 id="travel-tips" className="font-serif text-2xl">{ui.before[language]}</h2>
          <div className="mt-3 grid gap-x-6 md:grid-cols-2">
            {excursions.map((item) => <details key={item.id} className="border-t border-[#15231d]/15 py-2">
              <summary className="cursor-pointer py-2 text-sm font-semibold">{excursionLabel(item, language)}</summary>
              <p className="pb-2 text-sm leading-6 text-[#526158]">{item.tip[language]}</p>
              <p className="pb-3 text-sm leading-6 text-[#526158]">{item.description[language]}</p>
            </details>)}
          </div>
        </section>

        <section id="request" className="mt-12 scroll-mt-28 rounded-3xl border border-[#15231d]/20 bg-[#e6eadf] p-6 sm:p-9" aria-labelledby="request-title">
          <h2 id="request-title" className="font-serif text-3xl">{ui.plan[language]}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#526158]">{catalogCopy.intro[language]}</p>
          <p id="request-terms" className="mt-3 max-w-3xl text-sm leading-6 text-[#526158]">{catalogCopy.terms[language]}</p>
          <form aria-describedby="request-terms" className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={(event) => {
            event.preventDefault();
            window.dispatchEvent(new CustomEvent("rentplace:excursion-request", { detail: { route: selected.id } }));
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
          }}>
            <label className="text-sm font-bold">{ui.route[language]}<select value={route} onChange={(event) => setRoute(event.target.value)} className="mt-2 block min-h-12 w-full min-w-0 rounded-xl border border-[#15231d]/25 bg-white p-3">{excursions.filter((item) => item.requestable).map((item) => <option key={item.id} value={item.id}>{excursionLabel(item, language)}</option>)}</select></label>
            <label className="text-sm font-bold">{ui.date[language]}<input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 block min-h-12 w-full min-w-0 rounded-xl border border-[#15231d]/25 bg-white p-3" /></label>
            <label className="text-sm font-bold">{ui.guests[language]}<input type="number" min="1" step="1" value={guests} onChange={(event) => setGuests(event.target.value)} className="mt-2 block min-h-12 w-full rounded-xl border border-[#15231d]/25 bg-white p-3" /></label>
            <label className="text-sm font-bold">{ui.language[language]}<input value={tourLanguage} maxLength={100} onChange={(event) => setTourLanguage(event.target.value)} className="mt-2 block min-h-12 w-full rounded-xl border border-[#15231d]/25 bg-white p-3" /></label>
            <button type="submit" className={`${button} sm:col-span-2 sm:justify-self-start`}>{ui.request[language]} · WhatsApp ↗</button>
          </form>
        </section>

        <section className="mt-12 grid gap-6 rounded-3xl bg-[#15231d] p-6 text-white sm:p-9 md:grid-cols-[1fr_auto] md:items-center">
          <div><h2 className="font-serif text-3xl">{ui.stayTitle[language]}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">{ui.stayText[language]}</p></div>
          <Link href="/apartments" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#FFD21F] px-5 py-3 text-sm font-bold text-[#15231d]">{ui.apartments[language]} →</Link>
        </section>
        <div className="mt-8 flex flex-wrap gap-5 text-sm font-bold underline underline-offset-4">
          <Link href="/guide/wineries">{ui.wine[language]}</Link><Link href="/guide/restaurants">{ui.city[language]}</Link><Link href="/transfer">{ui.transfer[language]}</Link>
        </div>
        <details className="mt-10 border-t border-[#15231d]/20 pt-5 text-xs leading-6 text-[#526158]">
          <summary className="cursor-pointer font-bold">{ui.photos[language]}</summary>
          <p className="mt-3">{ui.creditsNote[language]}</p>
          <ul className="mt-2 space-y-1 underline underline-offset-2">
            <li><a href="https://commons.wikimedia.org/wiki/File:Orheiul_Vechi_-_Moldova_(by_David_Stanley).jpg">Orheiul Vechi — David Stanley</a> · <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a></li>
            <li><a href="https://commons.wikimedia.org/wiki/File:Vineyard_at_Cricova_-_Moldova_(by_David_Stanley).jpg">Cricova — David Stanley</a> · <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a></li>
            <li><a href="https://commons.wikimedia.org/wiki/File:Triumph_Arch,_Chisinau,_Moldova_(7992643050).jpg">Chișinău — Rob / BBM Explorer</a> · <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a></li>
            <li><a href="https://commons.wikimedia.org/wiki/File:Monasterio_de_Curchi,_Curchi,_Moldavia,_2023-11-01,_DD_84-86_HDR.jpg">Curchi — Diego Delso, delso.photo</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a></li>
          </ul>
        </details>
      </div>
    </section>
  );
}
