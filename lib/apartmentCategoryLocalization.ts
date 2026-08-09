import type { ApartmentClass } from "@/lib/apartments";
import type { Language } from "@/locales/translations";

export const apartmentClassLabelsByLanguage: Record<
  Language,
  Record<ApartmentClass, string>
> = {
  ru: { economy: "Эконом", standard: "Стандарт", standardPlus: "Комфорт", premium: "Премиум" },
  ro: { economy: "Economic", standard: "Standard", standardPlus: "Confort", premium: "Premium" },
  en: { economy: "Economy", standard: "Standard", standardPlus: "Comfort", premium: "Premium" },
  uk: { economy: "Економ", standard: "Стандарт", standardPlus: "Комфорт", premium: "Преміум" },
  cs: { economy: "Ekonomická", standard: "Standardní", standardPlus: "Komfortní", premium: "Prémiová" },
};

export function getApartmentClassLabel(category: ApartmentClass, language: Language) {
  return apartmentClassLabelsByLanguage[language][category];
}
