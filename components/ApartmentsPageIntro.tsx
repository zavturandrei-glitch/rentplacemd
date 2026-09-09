"use client";

import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/context/LanguageContext";
import { apartmentsPageContent } from "@/lib/apartmentsPageContent";

export default function ApartmentsPageIntro() {
  const { language } = useLanguage();
  const copy = apartmentsPageContent[language];

  return (
    <section className="bg-[#111b2a] px-4 pb-6 pt-4 text-white sm:px-6 sm:pb-8 sm:pt-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-white/55 sm:text-sm">
          <Link href="/" className="transition hover:text-[#ffd21f]">{copy.breadcrumbHome}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-white">{copy.breadcrumbApartments}</span>
        </nav>
        <h1 className="mt-5 max-w-5xl text-3xl font-black leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-4xl text-sm font-medium leading-6 text-white/72 sm:text-base sm:leading-7">
          {copy.intro}
        </p>
      </div>
    </section>
  );
}
