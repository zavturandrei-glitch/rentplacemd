"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/locales/translations";

const labels: Record<Language, string> = {
  ru: "← Назад",
  ro: "← Înapoi",
  en: "← Back",
  uk: "← Назад",
  cs: "← Zpět",
};

export default function BackButton() {
  const router = useRouter();
  const { language } = useLanguage();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  }

  return (
    <div className="bg-[#fffaf0] px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#ead9bd] bg-white px-4 py-2 text-sm font-black text-[#07111f] shadow-sm transition hover:-translate-y-0.5 hover:border-[#d4146f]/30 hover:text-[#d4146f] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f] active:translate-y-0"
          aria-label={labels[language]}
        >
          {labels[language]}
        </button>
      </div>
    </div>
  );
}
