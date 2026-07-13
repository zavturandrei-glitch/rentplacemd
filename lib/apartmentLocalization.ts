import type { Language } from "@/locales/translations";

export type LocalizedApartmentSeo = {
  displayAddress: string;
  title: string;
  description: string;
  imageAlt: string;
  schemaName: string;
};

const grigoreUreche67: Record<Language, LocalizedApartmentSeo> = {
  ru: {
    displayAddress: "Григоре Уреке, 67",
    title: "Квартира 1+1 на Григоре Уреке, 67 — ID 67",
    description: "Современная квартира 1+1 по адресу Григоре Уреке, 67 в Кишинёве. До 4 гостей, 1000 лей/сутки, реальные фотографии, Wi-Fi, кухня и заселение 24/7.",
    imageAlt: "Квартира RentPlaceMD ID 67, Григоре Уреке, 67, фото {index}",
    schemaName: "RentPlaceMD ID 67 — квартира 1+1, Григоре Уреке, 67",
  },
  ro: {
    displayAddress: "Grigore Ureche 67",
    title: "Apartament 1+1 pe Grigore Ureche 67 — ID 67",
    description: "Apartament modern 1+1 pe Grigore Ureche 67 în Chișinău. Pentru până la 4 oaspeți, 1000 MDL/noapte, fotografii reale, Wi-Fi, bucătărie și cazare 24/7.",
    imageAlt: "Apartament RentPlaceMD ID 67, Grigore Ureche 67, fotografia {index}",
    schemaName: "RentPlaceMD ID 67 — apartament 1+1, Grigore Ureche 67",
  },
  en: {
    displayAddress: "Grigore Ureche 67",
    title: "1+1 apartment at Grigore Ureche 67 — ID 67",
    description: "Modern 1+1 apartment at Grigore Ureche 67 in Chisinau. Up to 4 guests, 1000 MDL per night, real photos, Wi-Fi, kitchen and 24/7 check-in.",
    imageAlt: "RentPlaceMD apartment ID 67, Grigore Ureche 67, photo {index}",
    schemaName: "RentPlaceMD ID 67 — 1+1 apartment, Grigore Ureche 67",
  },
  uk: {
    displayAddress: "Грігоре Уреке, 67",
    title: "Квартира 1+1 на Грігоре Уреке, 67 — ID 67",
    description: "Сучасна квартира 1+1 за адресою Грігоре Уреке, 67 у Кишиневі. До 4 гостей, 1000 леїв/добу, реальні фотографії, Wi-Fi, кухня та заселення 24/7.",
    imageAlt: "Квартира RentPlaceMD ID 67, Грігоре Уреке, 67, фото {index}",
    schemaName: "RentPlaceMD ID 67 — квартира 1+1, Грігоре Уреке, 67",
  },
  cs: {
    displayAddress: "Grigore Ureche 67",
    title: "Apartmán 1+1 na adrese Grigore Ureche 67 — ID 67",
    description: "Moderní apartmán 1+1 na adrese Grigore Ureche 67 v Kišiněvě. Až pro 4 hosty, 1000 MDL za noc, reálné fotografie, Wi-Fi, kuchyně a ubytování 24/7.",
    imageAlt: "Apartmán RentPlaceMD ID 67, Grigore Ureche 67, fotografie {index}",
    schemaName: "RentPlaceMD ID 67 — apartmán 1+1, Grigore Ureche 67",
  },
};

export function getApartmentDisplayAddress(
  apartmentId: number,
  fallbackAddress: string,
  language: Language,
) {
  return apartmentId === 67
    ? grigoreUreche67[language].displayAddress
    : fallbackAddress;
}

export function getApartmentSeoLocalization(apartmentId: number, language: Language) {
  return apartmentId === 67 ? grigoreUreche67[language] : null;
}

export function formatLocalizedImageAlt(template: string, index: number) {
  return template.replace("{index}", String(index));
}
