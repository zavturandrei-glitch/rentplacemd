import type { Metadata } from "next";
import type { Language } from "@/locales/translations";
import { eventsUpdatedAt, getUpcomingGuideEvents } from "@/lib/events";
import { guidePages, guidePath, guideUi, type GuideSlug } from "@/lib/guide";
import {
  destinationPath,
  destinations,
  destinationSlugs,
  destinationUi,
  type DestinationSlug,
} from "@/lib/moldovaDestinations";
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
  type: "article" | "website" = "article",
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
      type,
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
    slug === "events" ? "website" : "article",
  );
}

export function getWineriesHubMetadata(languageInput?: string): Metadata {
  const language = normalizeSiteLanguage(languageInput);
  return metadataFor(
    "/guide/wineries",
    destinationUi.hubTitle[language],
    destinationUi.hubIntro[language],
    language,
    languageInput,
    guidePages.wineries.image,
    "website",
  );
}

export function getDestinationMetadata(slug: DestinationSlug, languageInput?: string): Metadata {
  const language = normalizeSiteLanguage(languageInput);
  const data = destinations[slug];
  const copy = data.copy[language];
  return metadataFor(
    destinationPath(slug),
    copy.seoTitle,
    copy.description,
    language,
    languageInput,
    data.image,
    "article",
  );
}

export function buildGuideJsonLd(slug: GuideSlug, languageInput?: string) {
  const language = normalizeSiteLanguage(languageInput);
  const data = guidePages[slug];
  const path = guidePath(slug);
  const url = baseUrl + path + (languageInput ? `?lang=${language}` : "");
  const breadcrumb = {
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
  };

  if (slug === "events") {
    const eventNodes = getUpcomingGuideEvents().map((event) => ({
      "@type": "Event",
      "@id": `${url}#${event.slug}`,
      name: event.title[language],
      description: event.description[language],
      startDate: event.startDate,
      ...(event.endDate ? { endDate: event.endDate } : {}),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: event.venue[language],
        ...(event.address
          ? {
              address: {
                "@type": "PostalAddress",
                streetAddress: event.address[language],
                addressLocality: "Chișinău",
                addressCountry: "MD",
              },
            }
          : {}),
      },
      url: event.sourceUrl,
      organizer: {
        "@type": "Organization",
        name: event.sourceName,
        url: event.sourceUrl,
      },
      inLanguage: language,
    }));

    return [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: data.title[language],
        description: data.description[language],
        url,
        inLanguage: language,
        dateModified: eventsUpdatedAt,
        publisher: { "@type": "Organization", name: siteName, url: baseUrl },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: eventNodes.length,
          itemListElement: eventNodes.map((event, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: event,
          })),
        },
      },
      breadcrumb,
    ];
  }

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
    breadcrumb,
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

export function buildWineriesHubJsonLd(languageInput?: string) {
  const language = normalizeSiteLanguage(languageInput);
  const path = "/guide/wineries";
  const url = baseUrl + path + (languageInput ? `?lang=${language}` : "");
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: destinationUi.hubTitle[language],
      description: destinationUi.hubIntro[language],
      url,
      inLanguage: language,
      dateModified: "2026-08-02",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: destinationSlugs.length,
        itemListElement: destinationSlugs.map((slug, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: destinations[slug].copy[language].title,
          url: baseUrl + destinationPath(slug),
        })),
      },
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
        {
          "@type": "ListItem",
          position: 3,
          name: destinationUi.hubTitle[language],
          item: url,
        },
      ],
    },
  ];
}

export function buildDestinationJsonLd(slug: DestinationSlug, languageInput?: string) {
  const language = normalizeSiteLanguage(languageInput);
  const data = destinations[slug];
  const copy = data.copy[language];
  const path = destinationPath(slug);
  const url = baseUrl + path + (languageInput ? `?lang=${language}` : "");

  return [
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      name: data.name,
      description: copy.description,
      image: baseUrl + data.image,
      url,
      sameAs: data.officialUrl,
      touristType: data.kind === "winery" ? "Wine tourism" : "Cultural tourism",
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: copy.seoTitle,
      description: copy.description,
      image: baseUrl + data.image,
      url,
      inLanguage: language,
      dateModified: "2026-08-02",
      publisher: { "@type": "Organization", name: siteName, url: baseUrl },
      about: { "@type": "TouristAttraction", name: data.name },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: copy.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
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
        {
          "@type": "ListItem",
          position: 3,
          name: destinationUi.hubTitle[language],
          item: baseUrl + "/guide/wineries",
        },
        { "@type": "ListItem", position: 4, name: data.name, item: url },
      ],
    },
  ];
}
