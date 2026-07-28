"use client";

import type { CSSProperties } from "react";
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

const mapBounds = {
  minLatitude: 46.979,
  maxLatitude: 47.034,
  minLongitude: 28.832,
  maxLongitude: 28.878,
};
const mapUrl =
  "https://www.openstreetmap.org/export/embed.html?bbox=" +
  [
    mapBounds.minLongitude,
    mapBounds.minLatitude,
    mapBounds.maxLongitude,
    mapBounds.maxLatitude,
  ].join("%2C") +
  "&layer=mapnik";

function markerPosition(location: (typeof locations)[number]) {
  const centerLongitude = (mapBounds.minLongitude + mapBounds.maxLongitude) / 2;
  const projectedLatitudeSpan =
    (mapBounds.maxLatitude - mapBounds.minLatitude) /
    Math.cos((((mapBounds.minLatitude + mapBounds.maxLatitude) / 2) * Math.PI) / 180);
  const horizontalPosition = (aspectRatio: number) => {
    const longitudeSpan = Math.max(
      mapBounds.maxLongitude - mapBounds.minLongitude,
      projectedLatitudeSpan * aspectRatio,
    );
    const minLongitude = centerLongitude - longitudeSpan / 2;
    return ((location.longitude - minLongitude) / longitudeSpan) * 100 + "%";
  };

  return {
    "--marker-mobile-left": horizontalPosition(0.88),
    "--marker-tablet-left": horizontalPosition(1.28),
    "--marker-desktop-left": horizontalPosition(2.04),
    top:
      ((mapBounds.maxLatitude - location.latitude) /
        (mapBounds.maxLatitude - mapBounds.minLatitude)) *
        100 +
      "%",
  } as CSSProperties;
}

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
  open: string;
  loading: string;
  mapTitle: string;
}> = {
  ru: {
    title: "RentPlaceMD на карте",
    text: "Пять адресов RentPlaceMD отмечены на одной чистой карте Кишинёва.",
    open: "Открыть в Google Maps",
    loading: "Загружаем интерактивную карту",
    mapTitle: "Пять адресов RentPlaceMD на карте Кишинёва",
  },
  ro: {
    title: "RentPlaceMD pe hartă",
    text: "Cele cinci adrese RentPlaceMD sunt marcate pe o hartă clară a Chișinăului.",
    open: "Deschide în Google Maps",
    loading: "Se încarcă harta interactivă",
    mapTitle: "Cinci adrese RentPlaceMD pe harta Chișinăului",
  },
  en: {
    title: "RentPlaceMD on the map",
    text: "All five RentPlaceMD addresses are marked on one clean map of Chișinău.",
    open: "Open in Google Maps",
    loading: "Loading the interactive map",
    mapTitle: "Five RentPlaceMD addresses on the Chișinău map",
  },
  uk: {
    title: "RentPlaceMD на карті",
    text: "П’ять адрес RentPlaceMD позначені на одній чистій карті Кишинева.",
    open: "Відкрити в Google Maps",
    loading: "Завантажуємо інтерактивну карту",
    mapTitle: "П’ять адрес RentPlaceMD на карті Кишинева",
  },
  cs: {
    title: "RentPlaceMD na mapě",
    text: "Všech pět adres RentPlaceMD je vyznačeno na přehledné mapě Kišiněva.",
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

        <div
          ref={mapContainerRef}
          className="relative h-[390px] overflow-hidden bg-[#eee9df] sm:h-[500px] lg:h-[620px]"
          aria-busy={!shouldLoadMap}
        >
          {shouldLoadMap ? (
            <>
              <iframe
                title={text.mapTitle}
                src={mapUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-[#07111f]/5" />
              {visibleLocations.map((location, index) => (
                <a
                  key={location.address}
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${text.open}: ${location.displayAddress}`}
                  title={location.displayAddress}
                  style={markerPosition(location)}
                  className="group absolute left-[var(--marker-mobile-left)] z-10 -translate-x-1/2 -translate-y-full focus-visible:outline-none sm:left-[var(--marker-tablet-left)] lg:left-[var(--marker-desktop-left)]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-white bg-[#d4146f] text-xs font-black text-white shadow-[0_8px_22px_rgba(7,17,31,0.28)] transition group-hover:-translate-y-1 group-hover:scale-110 group-focus-visible:-translate-y-1 group-focus-visible:scale-110 sm:h-10 sm:w-10">
                    {index + 1}
                  </span>
                  <span className="absolute left-1/2 top-full mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-[#07111f] px-3 py-1.5 text-[10px] font-bold text-white shadow-lg group-hover:block group-focus-visible:block sm:text-xs">
                    {location.displayName}
                  </span>
                </a>
              ))}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#eee9df_0%,#f8f5ee_50%,#e9e3d8_100%)] px-6 text-center">
              <p className="rounded-full bg-white/85 px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm">
                {text.loading}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
