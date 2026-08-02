"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ownersContent, ownersPath } from "@/lib/ownersContent";

export default function OwnersCta() {
  const { language } = useLanguage();
  const copy = ownersContent[language].home;

  return (
    <section className="bg-[#fffaf0] px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[22px] bg-[#07111f] px-5 py-6 text-white shadow-[0_18px_50px_rgba(7,17,31,0.18)] sm:flex sm:items-center sm:justify-between sm:gap-8 sm:rounded-[26px] sm:px-8 sm:py-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ff4b9d]">{copy.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">{copy.title}</h2>
          <p className="mt-3 text-sm leading-6 text-white/68 sm:text-base sm:leading-7">{copy.text}</p>
        </div>
        <div className="mt-5 shrink-0 sm:mt-0 sm:text-right">
          <Link
            href={ownersPath}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#d4146f] px-5 text-center text-sm font-black text-white shadow-lg shadow-[#d4146f]/20 transition hover:-translate-y-0.5 hover:bg-[#e11979] sm:w-auto"
          >
            {copy.button}
          </Link>
          <p className="mt-2 text-center text-xs font-semibold text-white/45 sm:text-right">{copy.note}</p>
        </div>
      </div>
    </section>
  );
}
