"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Language, translations } from "@/locales/translations";
import { getLanguageSwitchHref } from "@/lib/localizedHref";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof translations)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value === "ru" || value === "ro" || value === "en" || value === "uk" || value === "cs";
}

function normalizeLanguage(value: string | null): Language | null {
  if (!value) return null;

  const normalizedValue = value.toLowerCase();

  return isLanguage(normalizedValue) ? normalizedValue : null;
}

export function LanguageProvider({
  children,
  initialLanguage = "ru",
  documentLanguage,
}: {
  children: ReactNode;
  initialLanguage?: Language;
  documentLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const syncLanguageFromHistory = () => {
      const urlLanguage = normalizeLanguage(new URLSearchParams(window.location.search).get("lang")) ?? "ru";
      setLanguageState(urlLanguage);
      window.localStorage.setItem("rentplacemd-language", urlLanguage);
    };

    window.addEventListener("popstate", syncLanguageFromHistory);
    return () => window.removeEventListener("popstate", syncLanguageFromHistory);
  }, []);

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("rentplacemd-language", nextLanguage);
    router.replace(
      getLanguageSwitchHref(pathname, window.location.search, nextLanguage),
      { scroll: false },
    );
  }

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  useEffect(() => {
    document.documentElement.lang = documentLanguage ?? language;
  }, [documentLanguage, language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
