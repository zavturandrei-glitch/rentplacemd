"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { guidePages, guideUi } from "@/lib/guide";
import { destinations } from "@/lib/moldovaDestinations";

const themes = [
  { key: "wineries", path: "/guide/wineries", image: "/guide/wineries.webp", guide: "wineries" },
  { key: "city", path: "/guide/attractions", image: "/guide/attractions.webp", guide: "attractions" },
  { key: "trips", path: "/guide/orheiul-vechi", image: "/guide/moldova-trips.webp", guide: "moldova-trips" },
  { key: "culture", path: "/guide/museums", image: "/guide/museums.webp", guide: "museums" },
  { key: "events", path: "/events", image: "/guide/events.webp", guide: "events" },
  { key: "walking", path: "/guide/walking-tours", image: "/guide/walking-tours.webp", guide: "walking-tours" },
] as const;

const labels = {
  wineries: { ru: "Винодельни Молдовы", ro: "Vinăriile Moldovei", en: "Moldova wineries", uk: "Виноробні Молдови", cs: "Moldavská vinařství" },
  city: { ru: "Кишинёв", ro: "Chișinău", en: "Chisinau", uk: "Кишинів", cs: "Kišiněv" },
  trips: { ru: "Поездки по Молдове", ro: "Excursii prin Moldova", en: "Trips around Moldova", uk: "Подорожі Молдовою", cs: "Výlety po Moldavsku" },
  culture: { ru: "История и культура", ro: "Istorie și cultură", en: "History and culture", uk: "Історія та культура", cs: "Historie a kultura" },
  events: { ru: "События", ro: "Evenimente", en: "Events", uk: "Події", cs: "Akce" },
  walking: { ru: "Пешие маршруты", ro: "Trasee pietonale", en: "Walking routes", uk: "Піші маршрути", cs: "Pěší trasy" },
};

export default function GuideHub() {
  const { language } = useLanguage();
  useEffect(() => { document.title = `${guideUi.hubTitle[language]} | RentPlaceMD`; }, [language]);
  const href = (path: string) => `${path}?lang=${language}`;

  return (
    <section className="bg-[#f5f1e8] px-4 pb-20 pt-8 text-[#15231d] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-8 border-b border-[#15231d]/20 pb-12 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b3e2f]">RentPlaceMD · travel journal</p>
            <h1 className="mt-4 text-balance font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-7xl">{guideUi.hubTitle[language]}</h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-[#526158]">{guideUi.hubIntro[language]}</p>
        </header>

        <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          {themes.map((theme, index) => {
            const page = guidePages[theme.guide];
            const title = theme.key === "trips" ? destinations["orheiul-vechi"].title[language] : page.title[language];
            const description = theme.key === "trips" ? destinations["orheiul-vechi"].description[language] : page.description[language];
            const large = index === 0 || index === 3;
            return (
              <Link key={theme.key} href={href(theme.path)} className={`group ${large ? "lg:col-span-7" : "lg:col-span-5"}`}>
                <div className={`relative overflow-hidden ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                  <Image src={theme.image} alt={title} fill preload={index === 0} loading={index === 0 ? undefined : "lazy"} sizes={large ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 42vw, 100vw"} className="object-cover transition duration-700 group-hover:scale-[1.025]" />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#8b3e2f]">{labels[theme.key][language]}</p>
                <h2 className="mt-2 text-balance font-serif text-3xl leading-tight sm:text-4xl">{title}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-[#526158]">{description}</p>
                <span className="mt-4 inline-flex text-sm font-bold text-[#8b3e2f]">{guideUi.open[language]} →</span>
              </Link>
            );
          })}
        </div>

        <nav className="mt-16 border-t border-[#15231d]/20 pt-8" aria-label={guideUi.hubTitle[language]}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(["restaurants", "monasteries", "dental-tourism", "transnistria"] as const).map((slug) => (
              <Link key={slug} href={href(`/guide/${slug}`)} className="border-b border-[#15231d]/15 py-4 font-serif text-xl transition hover:text-[#8b3e2f]">
                {guidePages[slug].title[language]} →
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
}
