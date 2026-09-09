"use client";

import { useLanguage } from "@/context/LanguageContext";
import { apartmentsPageContent } from "@/lib/apartmentsPageContent";

export default function ApartmentsFaq() {
  const { language } = useLanguage();
  const copy = apartmentsPageContent[language];

  return (
    <section className="bg-[#111b2a] px-4 pb-14 text-white sm:px-6 sm:pb-18 lg:px-8" aria-labelledby="apartments-faq-title">
      <div className="mx-auto max-w-5xl border-t border-white/12 pt-8">
        <h2 id="apartments-faq-title" className="text-2xl font-black tracking-[-0.03em] sm:text-3xl">
          {copy.faqTitle}
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {copy.faq.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5">
              <summary className="cursor-pointer list-none pr-6 text-sm font-black leading-6 marker:content-none">
                {item.question}
              </summary>
              <p className="mt-3 text-sm font-medium leading-6 text-white/68">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
