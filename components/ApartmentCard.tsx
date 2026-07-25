"use client";

import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";
import { useLanguage } from "@/context/LanguageContext";
import { getApartmentDisplayAddress, getApartmentLocalization } from "@/lib/apartmentLocalization";
import { getApartmentCatalogPrice, getApartmentPath, type Apartment } from "@/lib/apartments";
import type { Language } from "@/locales/translations";

const text: Record<Language, {
  details: string;
  perDay: string;
  center: string;
  botanica: string;
  studio: string;
  oneBedroom: string;
  twoBedroom: string;
  guests: (count: number) => string;
  alt: (id: Apartment["id"], address: string) => string;
}> = {
  ru: {
    details: "Подробнее", perDay: "MDL / сутки", center: "Центр", botanica: "Ботаника",
    studio: "Студия", oneBedroom: "1 спальня + гостиная", twoBedroom: "2 спальни + гостиная",
    guests: (count) => "до " + count + " гостей",
    alt: (id, address) => "Квартира ID " + id + " · " + address,
  },
  ro: {
    details: "Detalii", perDay: "MDL / zi", center: "Centru", botanica: "Botanica",
    studio: "Garsonieră", oneBedroom: "1 dormitor + living", twoBedroom: "2 dormitoare + living",
    guests: (count) => "până la " + count + " oaspeți",
    alt: (id, address) => "Apartament ID " + id + " · " + address,
  },
  en: {
    details: "View", perDay: "MDL / day", center: "Centre", botanica: "Botanica",
    studio: "Studio", oneBedroom: "1 bedroom + living room", twoBedroom: "2 bedrooms + living room",
    guests: (count) => "up to " + count + " guests",
    alt: (id, address) => "Apartment ID " + id + " · " + address,
  },
  uk: {
    details: "Докладніше", perDay: "MDL / доба", center: "Центр", botanica: "Ботаніка",
    studio: "Студія", oneBedroom: "1 спальня + вітальня", twoBedroom: "2 спальні + вітальня",
    guests: (count) => "до " + count + " гостей",
    alt: (id, address) => "Квартира ID " + id + " · " + address,
  },
  cs: {
    details: "Detail", perDay: "MDL / den", center: "Centrum", botanica: "Botanica",
    studio: "Studio", oneBedroom: "1 ložnice + obývací pokoj", twoBedroom: "2 ložnice + obývací pokoj",
    guests: (count) => "až " + count + " hosté",
    alt: (id, address) => "Apartmán ID " + id + " · " + address,
  },
};

const categoryLabel = {
  economy: "Economy",
  standard: "Standard",
  standardPlus: "Standard+",
  premium: "Premium",
} as const;

export default function ApartmentCard({
  apartment,
  priority = false,
}: {
  apartment: Apartment;
  priority?: boolean;
}) {
  const { language } = useLanguage();
  const copy = text[language];
  const localized = getApartmentLocalization(apartment.id, language);
  const address = getApartmentDisplayAddress(apartment.id, apartment.title, language);
  const room = localized?.typeLabel ?? (
    apartment.rooms === "studio"
      ? copy.studio
      : apartment.rooms === "2+1"
        ? copy.twoBedroom
        : copy.oneBedroom
  );
  const district = String(apartment.id) === "6" ? copy.botanica : copy.center;
  const characteristics = [
    room,
    apartment.guests === null ? null : copy.guests(apartment.guests),
    district,
  ].filter(Boolean).join(" · ");
  const displayedPrice = getApartmentCatalogPrice(apartment);

  return (
    <Link
      href={getApartmentPath(apartment)}
      aria-label={copy.details + ": ID " + apartment.id + ", " + address}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_12px_34px_rgba(15,23,42,0.1)] ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(15,23,42,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f] active:scale-[0.99]"
    >
      <ResponsiveImage
        src={apartment.cardPhoto ?? apartment.photos[0]}
        alt={copy.alt(apartment.id, address)}
        className="aspect-[4/3]"
        imgClassName="transition duration-500 group-hover:scale-[1.03]"
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
        objectPosition={apartment.cardImagePosition ?? "center"}
        priority={priority}
        withWatermark
      >
        <div className="absolute left-3 top-3 z-10 rounded-full bg-[#ffd21f] px-3 py-1.5 text-xs font-black text-[#07111f] shadow">
          ID {apartment.id}
        </div>
        <div className="absolute right-3 top-3 z-10 rounded-full bg-white/92 px-3 py-1.5 text-xs font-black text-[#07111f] shadow ring-1 ring-black/10 backdrop-blur">
          {categoryLabel[apartment.class]}
        </div>
      </ResponsiveImage>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-black leading-6 text-[#07111f] sm:text-xl">{address}</h3>
        <p className="mt-1.5 text-sm font-bold leading-5 text-slate-600">{characteristics}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="text-xl font-black leading-none text-[#d4146f] sm:text-2xl">
            {displayedPrice} <span className="text-xs sm:text-sm">{copy.perDay}</span>
          </p>
          <span className="shrink-0 rounded-xl bg-[#07111f] px-4 py-2.5 text-sm font-black text-white">
            {copy.details}
          </span>
        </div>
      </div>
    </Link>
  );
}
