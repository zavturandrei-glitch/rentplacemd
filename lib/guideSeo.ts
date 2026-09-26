import type { Metadata } from "next";
import type { Language } from "@/locales/translations";
import { regionalGuideSlugs, regionalGuides } from "@/lib/regionalGuides";
import { eventsUpdatedAt, getUpcomingGuideEvents, isEventEligibleForStructuredData } from "@/lib/events";
import { guidePages, guidePath, guideUi, type GuideSlug } from "@/lib/guide";
import {
  destinations,
  type DestinationSlug,
} from "@/lib/moldovaDestinations";
import {
  baseUrl,
  mainSocialImageUrl,
  normalizeSiteLanguage,
  localizedUrl,
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
  const url = explicitLanguage ? localizedUrl(path, language) : baseUrl + path;
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

export function getDestinationMetadata(slug: DestinationSlug, languageInput?: string): Metadata {
  const language = normalizeSiteLanguage(languageInput);
  const data = destinations[slug];
  return metadataFor(
    data.path,
    data.title[language],
    data.description[language],
    language,
    languageInput,
    data.image,
  );
}

export function buildDestinationJsonLd(slug: DestinationSlug, languageInput?: string) {
  const language = normalizeSiteLanguage(languageInput);
  const data = destinations[slug];
  const url = languageInput ? localizedUrl(data.path, language) : baseUrl + data.path;
  const parentPath = slug === "orheiul-vechi" ? "/chisinau-guide" : "/guide/wineries";
  const parentName = slug === "orheiul-vechi"
    ? guideUi.hubTitle[language]
    : guidePages.wineries.title[language];

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.title[language],
      description: data.description[language],
      image: baseUrl + data.image,
      url,
      inLanguage: language,
      dateModified: "2026-08-02",
      publisher: { "@type": "Organization", name: siteName, url: baseUrl },
      about: {
        "@type": "TouristAttraction",
        name: data.officialName,
        url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: localizedUrl("", language) },
        { "@type": "ListItem", position: 2, name: guideUi.hubTitle[language], item: localizedUrl("/chisinau-guide", language) },
        ...(slug === "orheiul-vechi" ? [] : [
          { "@type": "ListItem", position: 3, name: parentName, item: localizedUrl(parentPath, language) },
        ]),
        { "@type": "ListItem", position: slug === "orheiul-vechi" ? 3 : 4, name: data.title[language], item: url },
      ],
    },
  ];
}

export function buildGuideJsonLd(slug: GuideSlug, languageInput?: string) {
  const language = normalizeSiteLanguage(languageInput);
  const data = guidePages[slug];
  const path = guidePath(slug);
  const url = languageInput ? localizedUrl(path, language) : baseUrl + path;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteName, item: localizedUrl("", language) },
      {
        "@type": "ListItem",
        position: 2,
        name: guideUi.hubTitle[language],
        item: localizedUrl("/chisinau-guide", language),
      },
      { "@type": "ListItem", position: 3, name: data.title[language], item: url },
    ],
  };

  if (slug === "events") {
    const eventNodes = getUpcomingGuideEvents().filter(isEventEligibleForStructuredData).map((event) => ({
      "@type": "Event",
      "@id": `${url}#${event.slug}`,
      name: event.title[language],
      description: event.description[language],
      startDate: event.startTime ? `${event.startDate}T${event.startTime}:00+03:00` : event.startDate,
      ...(event.endDate ? { endDate: event.endDate } : {}),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      organizer: {
        "@type": event.organizer.type,
        name: event.organizer.name,
        url: event.organizer.url,
      },
      location: {
        "@type": "Place",
        name: event.venue[language],
        address: {
          "@type": "PostalAddress",
          streetAddress: event.address[language],
          addressLocality: event.city === "Chisinau" ? "Chișinău" : "Moldova",
          addressCountry: "MD",
        },
      },
      url: `${url}#${event.slug}`,
      sameAs: [...new Set([event.sourceUrl, event.ticketUrl].filter(Boolean))],
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
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: siteName, item: localizedUrl("", language) },
          { "@type": "ListItem", position: 2, name: data.title[language], item: url },
        ],
      },
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
      url: localizedUrl("/chisinau-guide", language),
      inLanguage: language,
      hasPart: Object.values(guidePages).map((item) => ({
        "@type": "Article",
        name: item.title[language],
        url: localizedUrl(guidePath(item.slug), language),
      })).concat(Object.values(destinations).map((item) => ({
        "@type": "Article",
        name: item.title[language],
        url: localizedUrl(item.path, language),
      }))).concat(regionalGuideSlugs.map((slug) => ({
        "@type": "Article", name: regionalGuides[slug].title[language], url: localizedUrl(`/guide/${slug}`, language),
      }))),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: localizedUrl("", language) },
        {
          "@type": "ListItem",
          position: 2,
          name: guideUi.hubTitle[language],
          item: localizedUrl("/chisinau-guide", language),
        },
      ],
    },
  ];
}
