"use client";

import ApartmentCard from "@/components/ApartmentCard";
import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/context/LanguageContext";
import { activeApartments } from "@/lib/apartments";
import type { Language } from "@/locales/translations";

const copy: Record<Language, { title: string; hint: string }> = {
  ru: { title: "Квартиры под управлением RentPlaceMD", hint: "Реальные фото и цены. Даты и условия — на странице квартиры. Прямая связь с администратором." },
  ro: { title: "Apartamente administrate de RentPlaceMD", hint: "Fotografii și prețuri reale. Datele și condițiile — pe pagina apartamentului. Contact direct cu administratorul." },
  en: { title: "Apartments managed by RentPlaceMD", hint: "Real photos and prices. Check dates and conditions on the apartment page. Contact the administrator directly." },
  uk: { title: "Квартири під управлінням RentPlaceMD", hint: "Реальні фото та ціни. Дати й умови — на сторінці квартири. Прямий зв’язок з адміністратором." },
  cs: { title: "Apartmány ve správě RentPlaceMD", hint: "Skutečné fotografie a ceny. Termíny a podmínky na stránce apartmánu. Přímý kontakt se správcem." },
};

const managedApartments = [6, 61, 84].flatMap((id) =>
  activeApartments.filter((apartment) => String(apartment.id) === String(id)),
);

export default function HomeManagedApartments() {
  const { language, t } = useLanguage();
  const text = copy[language];

  return (
    <section className="hidden bg-[#07111f] px-8 pb-8 pt-2 lg:block" aria-labelledby="managed-apartments-title">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-between gap-6">
          <h2 id="managed-apartments-title" className="text-2xl font-black tracking-tight text-white">{text.title}</h2>
          <Link href="/apartments" className="shrink-0 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-[#ffd21f] transition hover:bg-white/5">
            {t.hero.catalogTitle} →
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {managedApartments.map((apartment) => <ApartmentCard key={apartment.id} apartment={apartment} />)}
        </div>
        <p className="mt-5 border-t border-white/10 pt-4 text-sm font-medium leading-6 text-white/70">{text.hint}</p>
      </div>
    </section>
  );
}
