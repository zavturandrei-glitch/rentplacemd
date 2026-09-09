"use client";

import ApartmentCard from "@/components/ApartmentCard";
import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/context/LanguageContext";
import { centerApartmentsContent } from "@/lib/centerApartmentsContent";
import { centerApartments } from "@/lib/apartmentDistricts";

export default function CenterApartmentsLanding() {
  const { language } = useLanguage();
  const copy = centerApartmentsContent[language];

  return (
    <>
      <section className="bg-[#111b2a] px-4 pb-10 pt-5 text-white sm:px-6 sm:pb-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-bold text-white/55 sm:text-sm">
            <Link href="/" className="transition hover:text-[#ffd21f]">{copy.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <Link href="/apartments" className="transition hover:text-[#ffd21f]">{copy.breadcrumbApartments}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">{copy.breadcrumbCenter}</span>
          </nav>
          <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-[#ff83b9]">{copy.eyebrow}</p>
          <h1 className="mt-3 max-w-5xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">{copy.title}</h1>
          <p className="mt-5 max-w-4xl text-sm font-medium leading-6 text-white/72 sm:text-base sm:leading-7">{copy.intro}</p>
          <Link href="/apartments" className="mt-6 inline-flex min-h-11 items-center rounded-xl border border-white/20 px-5 text-sm font-black transition hover:border-[#ffd21f] hover:text-[#ffd21f]">
            {copy.allApartments} →
          </Link>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-black tracking-[-0.03em] text-[#07111f] sm:text-4xl">{copy.inventoryTitle}</h2>
          <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-slate-600 sm:text-base sm:leading-7">{copy.inventorySummary(centerApartments.length)}</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {centerApartments.map((apartment, index) => (
              <ApartmentCard key={apartment.id} apartment={apartment} priority={index < 2} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
