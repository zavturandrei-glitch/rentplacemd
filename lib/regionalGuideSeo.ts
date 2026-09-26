import type { Metadata } from "next";
import { regionalGuides, type RegionalGuideSlug } from "@/lib/regionalGuides";
import { baseUrl, localizedUrl, normalizeSiteLanguage, routeAlternates, siteName, mainSocialImageUrl } from "@/lib/seo";
import { travelUi } from "@/lib/excursions";

export function getRegionalGuideMetadata(slug: RegionalGuideSlug, input?: string): Metadata {
  const language = normalizeSiteLanguage(input);
  const guide = regionalGuides[slug];
  const title = guide.title[language];
  const description = guide.description[language];
  return { title, description, alternates: routeAlternates(`/guide/${slug}`, input),
    openGraph: { title, description, type: "article", siteName, url: localizedUrl(`/guide/${slug}`, language), locale: { ru: "ru_MD", ro: "ro_MD", en: "en_US", uk: "uk_UA", cs: "cs_CZ" }[language], images: [{ url: mainSocialImageUrl, alt: siteName }] },
    twitter: { card: "summary_large_image", title, description, images: [mainSocialImageUrl] },
  };
}

export function buildRegionalGuideJsonLd(slug: RegionalGuideSlug, input?: string) {
  const language = normalizeSiteLanguage(input);
  const guide = regionalGuides[slug];
  const url = localizedUrl(`/guide/${slug}`, language);
  return [
    { "@context": "https://schema.org", "@type": "Article", headline: guide.title[language], description: guide.description[language], url, inLanguage: language, dateModified: "2026-09-26", publisher: { "@type": "Organization", name: siteName, url: baseUrl } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: siteName, item: localizedUrl("", language) },
      { "@type": "ListItem", position: 2, name: travelUi.navTitle[language], item: localizedUrl("/excursions", language) },
      { "@type": "ListItem", position: 3, name: guide.title[language], item: url },
    ] },
  ];
}
