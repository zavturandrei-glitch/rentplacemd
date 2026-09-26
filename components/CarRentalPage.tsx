"use client";

import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/context/LanguageContext";
import { carUi, travelUi } from "@/lib/excursions";

// Keep the preparation state until a real vehicle and all commercial terms are verified.
// A future vehicle section belongs here, with owned photos and explicit insurance/driver terms.
export default function CarRentalPage() {
  const { language } = useLanguage();
  return <section className="bg-[#f5f1e8] px-4 py-16 text-[#15231d] sm:px-6 sm:py-24">
    <div className="mx-auto max-w-4xl">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b3e2f]">RentPlaceMD · {carUi.status[language]}</p>
      <h1 className="mt-5 font-serif text-5xl tracking-tight sm:text-7xl">{carUi.title[language]}</h1>
      <p className="mt-8 max-w-2xl text-xl leading-9">{carUi.description[language]}</p>
      <p className="mt-5 max-w-2xl leading-8 text-[#526158]">{carUi.later[language]}</p>
      <nav className="mt-10 grid gap-4 sm:grid-cols-3" aria-label={carUi.title[language]}>
        {[{ href: "/apartments", label: travelUi.apartments }, { href: "/excursions", label: travelUi.navTitle }, { href: "/transfer", label: travelUi.transfer }].map(({ href, label }) => <Link key={href} href={href} className="flex min-h-24 items-center justify-between gap-3 rounded-2xl border border-[#15231d]/20 bg-white p-5 font-bold transition hover:bg-[#e6eadf]">{label[language]} <span aria-hidden="true">→</span></Link>)}
      </nav>
    </div>
  </section>;
}
