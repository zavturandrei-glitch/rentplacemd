"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/locales/translations";

const mapUrl =
  "https://www.google.com/maps?q=Izmail%2088%2C%20Chi%C8%99in%C4%83u%2C%20Moldova&output=embed";
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Izmail%2088%2C%20Chi%C8%99in%C4%83u%2C%20Moldova";

const textByLanguage: Record<
  Language,
  { eyebrow: string; title: string; text: string; button: string; mapTitle: string }
> = {
  ru: {
    eyebrow: "Измаил 88",
    title: "RentPlaceMD на карте",
    text: "Основная локация находится в центральной части Кишинёва, рядом с удобным выездом к городским улицам.",
    button: "Построить маршрут",
    mapTitle: "RentPlaceMD на карте: Измаил 88, Кишинёв, Молдова",
  },
  ro: {
    eyebrow: "Ismail 88",
    title: "RentPlaceMD pe harta",
    text: "Locatia principala este in zona centrala a Chisinaului, aproape de strazi comode ale orasului.",
    button: "Construieste ruta",
    mapTitle: "RentPlaceMD pe harta: Ismail 88, Chisinau, Moldova",
  },
  en: {
    eyebrow: "Ismail 88",
    title: "RentPlaceMD on the map",
    text: "The main location is in central Chisinau, with convenient access to city streets.",
    button: "Get directions",
    mapTitle: "RentPlaceMD on the map: Ismail 88, Chisinau, Moldova",
  },
  uk: {
    eyebrow: "Ізмаїл 88",
    title: "RentPlaceMD на карті",
    text: "Основна локація розташована в центральній частині Кишинева, поруч зі зручними міськими вулицями.",
    button: "Побудувати маршрут",
    mapTitle: "RentPlaceMD на карті: Ізмаїл 88, Кишинів, Молдова",
  },
  cs: {
    eyebrow: "Ismail 88",
    title: "RentPlaceMD na mape",
    text: "Hlavni lokalita je v centralni casti Kisineva s pohodlnym pristupem do mesta.",
    button: "Naplanovat trasu",
    mapTitle: "RentPlaceMD na mape: Ismail 88, Kisinev, Moldavsko",
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
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d4146f]">
              {text.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-[#07111f] sm:text-4xl">
              {text.title}
            </h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
              {text.text}
            </p>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#d4146f] px-6 py-4 text-center text-base font-black text-white shadow-lg shadow-pink-700/20 transition hover:bg-[#bd0f60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f] sm:w-auto"
            >
              {text.button}
            </a>
          </div>

          <div className="min-h-[310px] border-t border-[#f0dfbf] bg-[#f7efe3] lg:border-l lg:border-t-0">
            <iframe
              title={text.mapTitle}
              src={mapUrl}
              className="h-[310px] w-full sm:h-[380px] lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
