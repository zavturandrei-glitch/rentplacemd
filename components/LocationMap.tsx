"use client";

import { useState } from "react";
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
  eyebrow: string;
  title: string;
  text: string;
  button: string;
  open: string;
  show: string;
  mapTitle: string;
}> = {
  ru: {
    eyebrow: "5 адресов RentPlaceMD",
    title: "RentPlaceMD на карте",
    text: "Пять уникальных адресов RentPlaceMD в Кишинёве. Для каждого адреса показана одна точка.",
    button: "Маршрут по адресам",
    open: "Открыть в Google Maps",
    show: "Показать интерактивную карту",
    mapTitle: "Пять адресов RentPlaceMD на карте Кишинёва",
  },
  ro: {
    eyebrow: "5 adrese RentPlaceMD",
    title: "RentPlaceMD pe hartă",
    text: "Cinci adrese unice RentPlaceMD în Chișinău. Fiecare adresă are un singur punct pe hartă.",
    button: "Ruta între adrese",
    open: "Deschide în Google Maps",
    show: "Arată harta interactivă",
    mapTitle: "Cinci adrese RentPlaceMD pe harta Chișinăului",
  },
  en: {
    eyebrow: "5 RentPlaceMD addresses",
    title: "RentPlaceMD on the map",
    text: "Five unique RentPlaceMD addresses in Chisinau. Each address is represented by one map point.",
    button: "Directions between addresses",
    open: "Open in Google Maps",
    show: "Show interactive map",
    mapTitle: "Five RentPlaceMD addresses on the Chisinau map",
  },
  uk: {
    eyebrow: "5 адрес RentPlaceMD",
    title: "RentPlaceMD на карті",
    text: "П’ять унікальних адрес RentPlaceMD у Кишиневі. Для кожної адреси показано одну точку.",
    button: "Маршрут за адресами",
    open: "Відкрити в Google Maps",
    show: "Показати інтерактивну карту",
    mapTitle: "П’ять адрес RentPlaceMD на карті Кишинева",
  },
  cs: {
    eyebrow: "5 adres RentPlaceMD",
    title: "RentPlaceMD na mapě",
    text: "Pět jedinečných adres RentPlaceMD v Kišiněvě. Každá adresa má jeden bod na mapě.",
    button: "Trasa mezi adresami",
    open: "Otevřít v Google Maps",
    show: "Zobrazit interaktivní mapu",
    mapTitle: "Pět adres RentPlaceMD na mapě Kišiněva",
  },
};

export default function LocationMap() {
  const { language } = useLanguage();
  const [showMap, setShowMap] = useState(false);
  const text = textByLanguage[language];
  const visibleLocations = locations.map((location) => {
    const displayName = getApartmentDisplayAddress(location.id, location.name, language);
    return {
      ...location,
      displayName,
      displayAddress: displayName + ", " + cityByLanguage[language],
    };
  });

  return (
    <section className="bg-[#fffaf0] px-4 pb-12 pt-2 sm:px-6 sm:pb-16 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[26px] border border-[#f0dfbf] bg-white shadow-[0_18px_54px_rgba(15,23,42,0.08)]">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="p-5 sm:p-7 lg:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d4146f]">{text.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-[#07111f] sm:text-4xl">{text.title}</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{text.text}</p>
            <div className="mt-5 grid gap-3">
              {visibleLocations.map((location, index) => (
                <a
                  key={location.address}
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordinates(location))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-[#f0dfbf] bg-[#fffaf0] p-4 transition hover:border-[#d4146f]/35 hover:bg-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
                >
                  <span className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d4146f] text-xs font-black text-white">{index + 1}</span>
                    <span>
                      <strong className="block text-sm font-black text-[#07111f]">RentPlaceMD · {location.displayName}</strong>
                      <span className="mt-1 block text-xs font-bold leading-5 text-slate-500">{location.displayAddress}</span>
                      <span className="mt-2 block text-xs font-black text-[#d4146f] group-hover:underline">{text.open} ↗</span>
                    </span>
                  </span>
                </a>
              ))}
            </div>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#d4146f] px-6 py-4 text-center text-base font-black text-white shadow-lg shadow-pink-700/20 transition hover:bg-[#bd0f60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f] sm:w-auto">
              {text.button}
            </a>
          </div>
          <div className="relative min-h-[330px] border-t border-[#f0dfbf] bg-[#f1ece3] lg:border-l lg:border-t-0">
            {showMap ? (
              <iframe title={text.mapTitle} src={mapUrl} className="h-[330px] w-full sm:h-[430px] lg:h-full" loading="eager" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            ) : (
              <div className="flex h-[330px] items-center justify-center px-6 text-center sm:h-[430px] lg:h-full lg:min-h-[560px]">
                <div className="max-w-sm">
                  <p className="text-xl font-semibold text-[#07111f]">{text.mapTitle}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text.text}</p>
                  <button
                    type="button"
                    onClick={() => setShowMap(true)}
                    className="mt-6 min-h-12 rounded-full bg-[#07111f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d4146f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
                  >
                    {text.show}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
