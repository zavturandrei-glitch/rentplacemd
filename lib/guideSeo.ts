import type { Metadata } from "next";
import type { Language } from "@/locales/translations";
import { guidePages, guidePath, guideUi, type GuideSlug } from "@/lib/guide";
import {
  baseUrl,
  mainSocialImageUrl,
  normalizeSiteLanguage,
  routeAlternates,
  siteName,
} from "@/lib/seo";

const ogLocale: Record<Language, string> = {
  ru: "ru_MD",
  ro: "ro_MD",
  en: "en_US",
  uk: "uk_UA",
  cs: "cs_CZ",
};

function metadataFor(
  path: string,
  title: string,
  description: string,
  language: Language,
  explicitLanguage?: string,
  image = mainSocialImageUrl,
): Metadata {
  const url = baseUrl + path + (explicitLanguage ? `?lang=${language}` : "");
  const imageUrl = image.startsWith("http") ? image : baseUrl + image;

  return {
    title,
    description,
    alternates: routeAlternates(path, explicitLanguage),
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: ogLocale[language],
      type: "article",
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function getGuideHubMetadata(languageInput?: string): Metadata {
  const language = normalizeSiteLanguage(languageInput);
  return metadataFor(
    "/chisinau-guide",
    guideUi.hubTitle[language],
    guideUi.hubIntro[language],
    language,
    languageInput,
  );
}

export function getGuidePageMetadata(slug: GuideSlug, languageInput?: string): Metadata {
  const language = normalizeSiteLanguage(languageInput);
  const data = guidePages[slug];
  return metadataFor(
    guidePath(slug),
    data.title[language],
    data.description[language],
    language,
    languageInput,
    data.image,
  );
}

export function buildGuideJsonLd(slug: GuideSlug, languageInput?: string) {
  const language = normalizeSiteLanguage(languageInput);
  const data = guidePages[slug];
  const path = guidePath(slug);
  const url = baseUrl + path + (languageInput ? `?lang=${language}` : "");

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.title[language],
      description: data.description[language],
      image: baseUrl + data.image,
      url,
      inLanguage: language,
      dateModified: "2026-07-25",
      publisher: { "@type": "Organization", name: siteName, url: baseUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: baseUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: guideUi.hubTitle[language],
          item: baseUrl + "/chisinau-guide",
        },
        { "@type": "ListItem", position: 3, name: data.title[language], item: url },
      ],
    },
  ];
}

export function buildGuideHubJsonLd(languageInput?: string) {
  const language = normalizeSiteLanguage(languageInput);
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: guideUi.hubTitle[language],
      description: guideUi.hubIntro[language],
      url: baseUrl + "/chisinau-guide",
      inLanguage: language,
      hasPart: Object.values(guidePages).map((item) => ({
        "@type": "Article",
        name: item.title[language],
        url: baseUrl + guidePath(item.slug),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: baseUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: guideUi.hubTitle[language],
          item: baseUrl + "/chisinau-guide",
        },
      ],
    },
  ];
}
