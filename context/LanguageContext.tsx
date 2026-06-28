"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Language, translations } from "@/locales/translations";

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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ru");

  useEffect(() => {
    const savedLanguage = normalizeLanguage(
      window.localStorage.getItem("rentplacemd-language")
    );

    if (savedLanguage) {
      setLanguageState(savedLanguage);
      window.localStorage.setItem("rentplacemd-language", savedLanguage);
    }

    function handleLanguageChange(event: Event) {
      const nextLanguage = normalizeLanguage(
        (event as CustomEvent<string>).detail ?? null
      );

      if (nextLanguage) {
        setLanguageState(nextLanguage);
        window.localStorage.setItem("rentplacemd-language", nextLanguage);
      }
    }

    window.addEventListener("rentplacemd-language-change", handleLanguageChange);

    return () => {
      window.removeEventListener("rentplacemd-language-change", handleLanguageChange);
    };
  }, []);

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("rentplacemd-language", nextLanguage);
    window.dispatchEvent(
      new CustomEvent("rentplacemd-language-change", { detail: nextLanguage })
    );
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
