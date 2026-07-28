"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  apartmentCategoryOrder,
  getApartmentCategoryPath,
  type ApartmentClass,
} from "@/lib/apartments";
import type { Language } from "@/locales/translations";

const textByLanguage: Record<
  Language,
  {
    home: string;
    allApartments: string;
    allCategories: string;
    category: string;
    back: string;
    categories: Record<ApartmentClass, string>;
  }
> = {
  ru: {
    home: "Главная",
    allApartments: "Все квартиры",
    allCategories: "Все категории",
    category: "Категория",
    back: "Назад",
    categories: { economy: "Economy", standard: "Standard", standardPlus: "Standard+", premium: "Premium" },
  },
  ro: {
    home: "Acasă",
    allApartments: "Toate apartamentele",
    allCategories: "Toate categoriile",
    category: "Categorie",
    back: "Înapoi",
    categories: { economy: "Economy", standard: "Standard", standardPlus: "Standard+", premium: "Premium" },
  },
  en: {
    home: "Home",
    allApartments: "All apartments",
    allCategories: "All categories",
    category: "Category",
    back: "Back",
    categories: { economy: "Economy", standard: "Standard", standardPlus: "Standard+", premium: "Premium" },
  },
  uk: {
    home: "Головна",
    allApartments: "Усі квартири",
    allCategories: "Усі категорії",
    category: "Категорія",
    back: "Назад",
    categories: { economy: "Economy", standard: "Standard", standardPlus: "Standard+", premium: "Premium" },
  },
  cs: {
    home: "Domů",
    allApartments: "Všechny apartmány",
    allCategories: "Všechny kategorie",
    category: "Kategorie",
    back: "Zpět",
    categories: { economy: "Economy", standard: "Standard", standardPlus: "Standard+", premium: "Premium" },
  },
};

export default function ApartmentCategoryNav({ currentClass }: { currentClass: ApartmentClass }) {
  const { language } = useLanguage();
  const text = textByLanguage[language];
  const router = useRouter();

  return (
    <section className="bg-[#fffaf0] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-3">
          <Link href="/apartments" className="inline-flex min-h-11 items-center rounded-xl bg-white px-4 text-sm font-black text-[#07111f] shadow-sm ring-1 ring-black/5 transition hover:text-[#d4146f]">
            ← {text.back}
          </Link>
          <label className="flex min-h-11 min-w-0 items-center gap-2 rounded-xl bg-white px-3 shadow-sm ring-1 ring-black/5">
            <span className="hidden text-xs font-black text-slate-500 sm:inline">{text.category}:</span>
            <select
              value={currentClass}
              onChange={(event) => {
                const category = event.target.value as ApartmentClass | "all";
                router.push(category === "all" ? "/apartments" : getApartmentCategoryPath(category));
              }}
              className="min-w-0 bg-transparent py-2 text-sm font-black text-[#07111f] outline-none"
              aria-label={text.category}
            >
              <option value="all">{text.allCategories}</option>
              {apartmentCategoryOrder.map((category) => (
                <option key={category} value={category}>{text.categories[category]}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </section>
  );
}
