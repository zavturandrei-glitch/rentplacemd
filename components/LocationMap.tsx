"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/locales/translations";
import { getApartmentDisplayAddress } from "@/lib/apartmentLocalization";

const locations = [
  { id: 25, name: "Ismail 88", address: "Strada Ismail 88, Chișinău, Moldova", latitude: 47.017963, longitude: 28.849791 },
  { id: 77, name: "Lev Tolstoi 63/1", address: "Strada Lev Tolstoi 63/1, Chișinău, Moldova", latitude: 47.015703, longitude: 28.847644 },
  { id: 76, name: "Mihai Eminescu 76", address: "Strada Mihai Eminescu 76, Chișinău, Moldova", latitude: 47.024100, longitude: 28.841086 },
  { id: 67, name: "Grigore Ureche 67", address: "Strada Grigore Ureche 67, Chișinău, Moldova", latitude: 47.027842, longitude: 28.846179 },
  { id: 6, name: "Cuza Vodă 1/2", address: "Bulevardul Cuza Vodă 1/2, Chișinău, Moldova", latitude: 46.98763, longitude: 28.87104 },
] as const;

function coordinates(location: (typeof locations)[number]) {
  return `${location.latitude},${location.longitude}`;
}

const mapDestinations = locations.slice(1).map((location) => encodeURIComponent(coordinates(location))).join("+to:");
const mapUrl = `https://www.google.com/maps?output=embed&saddr=${encodeURIComponent(coordinates(locations[0]))}&daddr=${mapDestinations}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(coordinates(locations[0]))}&destination=${encodeURIComponent(coordinates(locations[locations.length - 1]))}&waypoints=${encodeURIComponent(locations.slice(1, -1).map(coordinates).join("|"))}`;

const cityByLanguage: Record<Language, string> = {
  ru: "Кишинёв, Молдова",
  ro: "Chișinău, Moldova",
  en: "Chisinau, Moldova",
  uk: "Кишинів, Молдова",
  cs: "Kišiněv, Moldavsko",
};

const textByLanguage: Record<Language, {
  title: string;
  text: string;
  button: string;
  open: string;
  loading: string;
  mapTitle: string;
}> = {
  ru: {
    title: "RentPlaceMD на карте",
    text: "Пять адресов в Кишинёве собраны на одной карте. Откройте нужную точку отдельно или постройте общий маршрут между адресами.",
    button: "Маршрут по адресам",
    open: "Открыть в Google Maps",
    loading: "Загружаем интерактивную карту",
    mapTitle: "Пять адресов RentPlaceMD на карте Кишинёва",
  },
  ro: {
    title: "RentPlaceMD pe hartă",
    text: "Cele cinci adrese din Chișinău sunt reunite pe aceeași hartă. Deschideți separat punctul dorit sau construiți traseul complet.",
    button: "Traseu între adrese",
    open: "Deschide în Google Maps",
    loading: "Se încarcă harta interactivă",
    mapTitle: "Cinci adrese RentPlaceMD pe harta Chișinăului",
  },
  en: {
    title: "RentPlaceMD on the map",
    text: "All five Chișinău addresses are shown on one map. Open any location separately or build a route between the addresses.",
    button: "Route between addresses",
    open: "Open in Google Maps",
    loading: "Loading the interactive map",
    mapTitle: "Five RentPlaceMD addresses on the Chișinău map",
  },
  uk: {
    title: "RentPlaceMD на карті",
    text: "П’ять адрес у Кишиневі зібрані на одній карті. Відкрийте потрібну точку окремо або побудуйте маршрут між адресами.",
    button: "Маршрут за адресами",
    open: "Відкрити в Google Maps",
    loading: "Завантажуємо інтерактивну карту",
    mapTitle: "П’ять адрес RentPlaceMD на карті Кишинева",
  },
  cs: {
    title: "RentPlaceMD na mapě",
    text: "Všech pět kišiněvských adres je zobrazeno na jedné mapě. Otevřete jednotlivé místo nebo sestavte trasu mezi adresami.",
    button: "Trasa mezi adresami",
    open: "Otevřít v Google Maps",
    loading: "Načítá se interaktivní mapa",
    mapTitle: "Pět adres RentPlaceMD na mapě Kišiněva",
  },
};

export default function LocationMap() {
  const { language } = useLanguage();
  const text = textByLanguage[language];
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);

  useEffect(() => {
    const element = mapContainerRef.current;
    if (!element || shouldLoadMap) return;

    if (!("IntersectionObserver" in window)) {
      const fallbackTimer = globalThis.setTimeout(() => setShouldLoadMap(true), 0);
      return () => globalThis.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoadMap]);

  const visibleLocations = locations.map((location) => {
    const displayName = getApartmentDisplayAddress(location.id, location.name, language);
    return {
      ...location,
      displayName,
      displayAddress: displayName + ", " + cityByLanguage[language],
    };
  });

  return (
    <section
      id="rentplace-map"
      className="scroll-mt-[210px] bg-[#fffaf0] px-4 py-10 sm:px-6 sm:py-14 lg:scroll-mt-8 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[26px] border border-[#f0dfbf] bg-white shadow-[0_18px_54px_rgba(15,23,42,0.08)]">
        <header className="border-b border-[#f0dfbf] px-5 py-7 sm:px-8 sm:py-9">
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#07111f] sm:text-4xl">
            {text.title}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            {text.text}
          </p>
        </header>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div
            ref={mapContainerRef}
            className="relative h-[330px] overflow-hidden border-b border-[#f0dfbf] bg-[#eee9df] sm:h-[380px] lg:h-full lg:min-h-[590px] lg:border-b-0 lg:border-r"
            aria-busy={!shouldLoadMap}
          >
            {shouldLoadMap ? (
              <iframe
                title={text.mapTitle}
                src={mapUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#eee9df_0%,#f8f5ee_50%,#e9e3d8_100%)] px-6 text-center">
                <p className="rounded-full bg-white/85 px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm">
                  {text.loading}
                </p>
              </div>
            )}
          </div>

          <div className="p-5 sm:p-7 lg:p-8">
            <ol className="grid gap-3">
              {visibleLocations.map((location, index) => (
                <li key={location.address}>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordinates(location))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${text.open}: ${location.displayAddress}`}
                    className="group flex min-h-24 items-start gap-3 rounded-2xl border border-[#f0dfbf] bg-[#fffaf0] p-4 transition hover:border-[#d4146f]/35 hover:bg-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d4146f] text-xs font-black text-white">
                      {index + 1}
                    </span>
                    <span className="min-w-0">
                      <strong className="block text-sm font-semibold text-[#07111f]">
                        RentPlaceMD · {location.displayName}
                      </strong>
                      <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">
                        {location.displayAddress}
                      </span>
                      <span className="mt-2 block text-xs font-semibold text-[#d4146f] group-hover:underline">
                        {text.open} ↗
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#d4146f] px-6 py-3 text-center text-base font-semibold text-white shadow-lg shadow-pink-700/20 transition hover:bg-[#bd0f60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
            >
              {text.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
