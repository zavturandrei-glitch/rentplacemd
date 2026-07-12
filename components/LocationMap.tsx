"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/locales/translations";

const locations = [
  { name: "RentPlaceMD · Ismail 88", address: "Ismail 88, Chișinău, Moldova" },
  { name: "RentPlaceMD · Grigore Ureche 67", address: "Grigore Ureche 67, Chișinău, Moldova" },
] as const;

const mapUrl = `https://www.google.com/maps?output=embed&saddr=${encodeURIComponent(locations[0].address)}&daddr=${encodeURIComponent(locations[1].address)}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(locations[0].address)}&destination=${encodeURIComponent(locations[1].address)}`;

const textByLanguage: Record<Language, {
  eyebrow: string;
  title: string;
  text: string;
  button: string;
  open: string;
  mapTitle: string;
}> = {
  ru: {
    eyebrow: "2 адреса RentPlaceMD",
    title: "RentPlaceMD на карте",
    text: "Квартиры RentPlaceMD находятся по двум адресам в центральной части Кишинёва. Нажмите на метку, чтобы увидеть данные объекта.",
    button: "Маршрут между адресами",
    open: "Открыть в Google Maps",
    mapTitle: "Два адреса RentPlaceMD на карте Кишинёва",
  },
  ro: {
    eyebrow: "2 adrese RentPlaceMD",
    title: "RentPlaceMD pe hartă",
    text: "Apartamentele RentPlaceMD se află la două adrese din zona centrală a Chișinăului. Apăsați un marcaj pentru detaliile locației.",
    button: "Ruta între adrese",
    open: "Deschide în Google Maps",
    mapTitle: "Două adrese RentPlaceMD pe harta Chișinăului",
  },
  en: {
    eyebrow: "2 RentPlaceMD addresses",
    title: "RentPlaceMD on the map",
    text: "RentPlaceMD apartments are available at two addresses in central Chisinau. Select a map marker to view its location details.",
    button: "Directions between addresses",
    open: "Open in Google Maps",
    mapTitle: "Two RentPlaceMD addresses on the Chisinau map",
  },
  uk: {
    eyebrow: "2 адреси RentPlaceMD",
    title: "RentPlaceMD на карті",
    text: "Квартири RentPlaceMD розташовані за двома адресами в центральній частині Кишинева. Натисніть маркер для деталей.",
    button: "Маршрут між адресами",
    open: "Відкрити в Google Maps",
    mapTitle: "Дві адреси RentPlaceMD на карті Кишинева",
  },
  cs: {
    eyebrow: "2 adresy RentPlaceMD",
    title: "RentPlaceMD na mapě",
    text: "Apartmány RentPlaceMD jsou na dvou adresách v centru Kišiněva. Kliknutím na značku zobrazíte podrobnosti.",
    button: "Trasa mezi adresami",
    open: "Otevřít v Google Maps",
    mapTitle: "Dvě adresy RentPlaceMD na mapě Kišiněva",
  },
};

export default function LocationMap() {
  const { language } = useLanguage();
  const text = textByLanguage[language];

  return (
    <section className="bg-[#fffaf0] px-4 pb-12 pt-2 sm:px-6 sm:pb-16 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[26px] border border-[#f0dfbf] bg-white shadow-[0_18px_54px_rgba(15,23,42,0.08)]">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="p-5 sm:p-7 lg:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d4146f]">{text.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-[#07111f] sm:text-4xl">{text.title}</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{text.text}</p>
            <div className="mt-5 grid gap-3">
              {locations.map((location, index) => (
                <a
                  key={location.address}
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-[#f0dfbf] bg-[#fffaf0] p-4 transition hover:border-[#d4146f]/35 hover:bg-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
                >
                  <span className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d4146f] text-xs font-black text-white">{index + 1}</span>
                    <span>
                      <strong className="block text-sm font-black text-[#07111f]">{location.name}</strong>
                      <span className="mt-1 block text-xs font-bold leading-5 text-slate-500">{location.address}</span>
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
          <div className="min-h-[330px] border-t border-[#f0dfbf] bg-[#f7efe3] lg:border-l lg:border-t-0">
            <iframe title={text.mapTitle} src={mapUrl} className="h-[330px] w-full sm:h-[430px] lg:h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
        </div>
      </div>
    </section>
  );
}
