import type { Metadata } from "next";
import type { Language } from "@/locales/translations";
import {
  baseUrl,
  mainSocialImageUrl,
  normalizeSiteLanguage,
  routeAlternates,
  siteName,
} from "@/lib/seo";

export type LegacyInfoKind = "about" | "rules" | "transfer";

const homeContent: Record<Language, { title: string; description: string }> = {
  ru: { title: "RentPlaceMD — квартиры посуточно в Кишинёве", description: "Квартиры посуточно в Кишинёве без посредников: реальные фотографии, актуальные цены и прямое бронирование у RentPlaceMD." },
  ro: { title: "RentPlaceMD — apartamente în regim hotelier în Chișinău", description: "Apartamente în regim hotelier în Chișinău fără intermediari, cu fotografii reale, prețuri actuale și rezervare directă." },
  en: { title: "RentPlaceMD — short-stay apartments in Chisinau", description: "Short-stay apartments in Chisinau without intermediaries, with real photographs, current prices and direct booking." },
  uk: { title: "RentPlaceMD — квартири подобово в Кишиневі", description: "Квартири подобово в Кишиневі без посередників: реальні фотографії, актуальні ціни та пряме бронювання." },
  cs: { title: "RentPlaceMD — krátkodobé pronájmy v Kišiněvě", description: "Krátkodobé pronájmy apartmánů v Kišiněvě bez prostředníků, se skutečnými fotografiemi, aktuálními cenami a přímou rezervací." },
};

const paths: Record<LegacyInfoKind, string> = {
  about: "/about",
  rules: "/check-in-rules",
  transfer: "/transfer",
};

const content: Record<LegacyInfoKind, Record<Language, { title: string; description: string }>> = {
  about: {
    ru: { title: "О RentPlaceMD", description: "О сервисе RentPlaceMD: квартиры посуточно в Кишинёве, реальные фотографии, понятные цены и прямой контакт с командой." },
    ro: { title: "Despre RentPlaceMD", description: "Despre RentPlaceMD: apartamente în regim hotelier în Chișinău, fotografii reale, prețuri clare și contact direct cu echipa." },
    en: { title: "About RentPlaceMD", description: "About RentPlaceMD: short-stay apartments in Chisinau, real photographs, clear prices and direct contact with the team." },
    uk: { title: "Про RentPlaceMD", description: "Про RentPlaceMD: квартири подобово в Кишиневі, реальні фотографії, зрозумілі ціни та прямий зв’язок із командою." },
    cs: { title: "O RentPlaceMD", description: "O RentPlaceMD: krátkodobé pronájmy apartmánů v Kišiněvě, skutečné fotografie, jasné ceny a přímý kontakt s týmem." },
  },
  rules: {
    ru: { title: "Правила заселения RentPlaceMD", description: "Время заезда и выезда, документы, оплата и связь перед заселением в квартиры RentPlaceMD." },
    ro: { title: "Regulile de cazare RentPlaceMD", description: "Orele de check-in și check-out, documentele, plata și comunicarea înainte de cazarea în apartamentele RentPlaceMD." },
    en: { title: "RentPlaceMD check-in rules", description: "Check-in and check-out times, documents, payment and communication before staying in a RentPlaceMD apartment." },
    uk: { title: "Правила заселення RentPlaceMD", description: "Час заїзду й виїзду, документи, оплата та зв’язок перед заселенням у квартири RentPlaceMD." },
    cs: { title: "Pravidla ubytování RentPlaceMD", description: "Časy příjezdu a odjezdu, doklady, platba a komunikace před pobytem v apartmánu RentPlaceMD." },
  },
  transfer: {
    ru: { title: "Трансфер из аэропорта Кишинёва", description: "Трансфер RentPlaceMD из аэропорта Кишинёва до квартиры по предварительной договорённости." },
    ro: { title: "Transfer de la Aeroportul Chișinău", description: "Transfer RentPlaceMD de la Aeroportul Chișinău la apartament, disponibil prin aranjament prealabil." },
    en: { title: "Chisinau Airport transfer", description: "RentPlaceMD transfer from Chisinau Airport to your apartment, available by prior arrangement." },
    uk: { title: "Трансфер з аеропорту Кишинева", description: "Трансфер RentPlaceMD з аеропорту Кишинева до квартири за попередньою домовленістю." },
    cs: { title: "Transfer z letiště Kišiněv", description: "Transfer RentPlaceMD z letiště Kišiněv do apartmánu po předchozí domluvě." },
  },
};

export function getInfoMetadata(kind: LegacyInfoKind, languageInput?: string): Metadata {
  const language = normalizeSiteLanguage(languageInput);
  const item = content[kind][language];
  const path = paths[kind];
  const url = baseUrl + path + (languageInput ? `?lang=${language}` : "");

  return {
    title: item.title,
    description: item.description,
    alternates: routeAlternates(path, languageInput),
    openGraph: {
      title: item.title,
      description: item.description,
      url,
      siteName,
      type: "website",
      images: [{ url: mainSocialImageUrl, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
      images: [mainSocialImageUrl],
    },
  };
}

export function getHomeMetadata(languageInput?: string): Metadata {
  const language = normalizeSiteLanguage(languageInput);
  const item = homeContent[language];
  const url = baseUrl + (languageInput ? `?lang=${language}` : "");

  return {
    title: { absolute: item.title },
    description: item.description,
    alternates: routeAlternates("", languageInput),
    openGraph: {
      title: item.title,
      description: item.description,
      url,
      siteName,
      type: "website",
      images: [{ url: mainSocialImageUrl, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
      images: [mainSocialImageUrl],
    },
  };
}

export function buildInfoJsonLd(kind: LegacyInfoKind, languageInput?: string) {
  const language = normalizeSiteLanguage(languageInput);
  const item = content[kind][language];
  const path = paths[kind];
  const url = baseUrl + path + (languageInput ? `?lang=${language}` : "");

  return [
    {
      "@context": "https://schema.org",
      "@type": kind === "about" ? "AboutPage" : "WebPage",
      name: item.title,
      description: item.description,
      url,
      inLanguage: language,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: baseUrl },
        { "@type": "ListItem", position: 2, name: item.title, item: url },
      ],
    },
  ];
}
