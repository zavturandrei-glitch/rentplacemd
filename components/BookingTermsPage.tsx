"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { bookingTermsContent } from "@/lib/bookingTerms";

export default function BookingTermsPage() {
  const { language } = useLanguage();
  const copy = bookingTermsContent[language];

  return (
    <article className="bg-[#faf9f6] text-[#07111f]">
      <header className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        <h1 className="max-w-4xl text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
          {copy.lead}
        </p>
        <p className="mt-8 max-w-3xl border-l-2 border-[#d4146f] pl-5 text-base leading-7 text-slate-700">
          {copy.summary}
        </p>
      </header>

      <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        {copy.sections.map((section) => (
          <section key={section.title} className="border-t border-slate-300 py-9 sm:py-11">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              {section.title}
            </h2>
            <div className="mt-4 max-w-3xl space-y-4 text-base leading-8 text-slate-600 sm:text-lg">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ))}
      </div>

      <section className="bg-[#07111f] px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row">
          <Link href={`/apartments?lang=${language}`} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#ffd21f] px-6 py-3 text-sm font-semibold text-[#07111f] transition hover:bg-white">
            {copy.apartments}
          </Link>
          <Link href={`/check-in-rules?lang=${language}`} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#07111f]">
            {copy.rules}
          </Link>
          <a href="https://wa.me/37369990190" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#07111f]">
            {copy.contact}
          </a>
        </div>
      </section>
    </article>
  );
}
