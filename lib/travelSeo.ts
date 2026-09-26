import type { Metadata } from "next";
import { carUi, travelUi, excursions, excursionLabel } from "@/lib/excursions";
import { baseUrl, normalizeSiteLanguage, routeAlternates, localizedUrl, siteName } from "@/lib/seo";

export function getTravelMetadata(kind: "excursions" | "car-rental", input?: string): Metadata {
  const language = normalizeSiteLanguage(input);
  const path = `/${kind}`;
  const title = kind === "excursions" ? travelUi.title[language] : `${carUi.title[language]} — ${carUi.status[language]}`;
  const description = kind === "excursions" ? travelUi.intro[language] : carUi.description[language];
  const image = baseUrl + (kind === "excursions" ? "/guide/moldova-trips.webp" : "/og/rentplace-gold-main-1200x630-v3.jpg");
  return {
    title, description, alternates: routeAlternates(path, input),
    ...(kind === "car-rental" ? { robots: { index: false, follow: true, googleBot: { index: false, follow: true } } } : {}),
    openGraph: { title, description, url: localizedUrl(path, language), siteName, type: "website", locale: { ru: "ru_MD", ro: "ro_MD", en: "en_US", uk: "uk_UA", cs: "cs_CZ" }[language], images: [{ url: image, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function buildExcursionsJsonLd(input?: string) {
  const language = normalizeSiteLanguage(input);
  const url = localizedUrl("/excursions", language);
  return [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: travelUi.title[language], description: travelUi.intro[language], url, inLanguage: language,
      mainEntity: { "@type": "ItemList", numberOfItems: excursions.length, itemListElement: excursions.map((route, index) => ({ "@type": "ListItem", position: index + 1, name: excursionLabel(route, language), url: `${url}#${route.id}` })) } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: siteName, item: localizedUrl("", language) },
      { "@type": "ListItem", position: 2, name: travelUi.navTitle[language], item: url },
    ] },
  ];
}
