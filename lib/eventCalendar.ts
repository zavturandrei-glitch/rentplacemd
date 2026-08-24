import type { Metadata } from "next";
import type { Language } from "@/locales/translations";
import { guideEvents, type ChisinauEvent } from "@/lib/events";
import {
  baseUrl,
  mainSocialImageUrl,
  normalizeSiteLanguage,
  routeAlternates,
  siteName,
} from "@/lib/seo";

const monthSlugs = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

const localeByLanguage: Record<Language, string> = {
  ru: "ru-RU",
  ro: "ro-RO",
  en: "en-GB",
  uk: "uk-UA",
  cs: "cs-CZ",
};

const seoText: Record<Language, {
  title: (month: string) => string;
  description: (month: string) => string;
  intro: (month: string) => string;
  calendar: string;
}> = {
  ru: {
    title: (month) => `События в Кишинёве — ${month}`,
    description: (month) => `Концерты, фестивали, выставки и городские события в Кишинёве на ${month}: даты, площадки и прогноз спроса на посуточное жильё.`,
    intro: (month) => `Подтверждённые концерты, фестивали и другие заметные события на ${month}. Сверяйте программу у организатора и бронируйте жильё заранее на даты высокого спроса.`,
    calendar: "Календарь событий",
  },
  ro: {
    title: (month) => `Evenimente în Chișinău — ${month}`,
    description: (month) => `Concerte, festivaluri, expoziții și evenimente urbane în Chișinău pentru ${month}: date, locații și cererea estimată pentru cazare.`,
    intro: (month) => `Concerte, festivaluri și alte evenimente importante confirmate pentru ${month}. Verificați programul la organizator și rezervați din timp pentru datele cu cerere mare.`,
    calendar: "Calendarul evenimentelor",
  },
  en: {
    title: (month) => `Events in Chișinău — ${month}`,
    description: (month) => `Concerts, festivals, exhibitions and city events in Chișinău for ${month}, with dates, venues and expected short-stay accommodation demand.`,
    intro: (month) => `Confirmed concerts, festivals and other notable events for ${month}. Check the organiser’s latest programme and arrange accommodation early for high-demand dates.`,
    calendar: "Events calendar",
  },
  uk: {
    title: (month) => `Події в Кишиневі — ${month}`,
    description: (month) => `Концерти, фестивалі, виставки та міські події в Кишиневі на ${month}: дати, місця й очікуваний попит на подобове житло.`,
    intro: (month) => `Підтверджені концерти, фестивалі та інші помітні події на ${month}. Перевіряйте програму в організатора й бронюйте житло заздалегідь на дати високого попиту.`,
    calendar: "Календар подій",
  },
  cs: {
    title: (month) => `Akce v Kišiněvě — ${month}`,
    description: (month) => `Koncerty, festivaly, výstavy a městské akce v Kišiněvě na ${month}: termíny, místa a očekávaná poptávka po krátkodobém ubytování.`,
    intro: (month) => `Potvrzené koncerty, festivaly a další významné akce na ${month}. Ověřte aktuální program u pořadatele a na termíny s vysokou poptávkou rezervujte ubytování včas.`,
    calendar: "Kalendář akcí",
  },
};

export const eventMonthKeys = [...new Set(guideEvents.map((event) => event.startDate.slice(0, 7)))].sort();

export function eventMonthPath(monthKey: string) {
  const [year, month] = monthKey.split("-").map(Number);
  const monthSlug = monthSlugs[month - 1];
  return monthSlug ? `/events/${monthSlug}-${year}` : "/events";
}

export function parseEventMonthSlug(slug: string) {
  const match = /^([a-z]+)-(\d{4})$/.exec(slug);
  if (!match) return null;
  const monthIndex = monthSlugs.indexOf(match[1] as (typeof monthSlugs)[number]);
  if (monthIndex < 0) return null;
  return `${match[2]}-${String(monthIndex + 1).padStart(2, "0")}`;
}

export function getEventsForMonth(monthKey: string): readonly ChisinauEvent[] {
  return guideEvents.filter(
    (event) => event.status !== "cancelled" && event.startDate.startsWith(monthKey),
  );
}

export function formatEventMonth(monthKey: string, language: Language) {
  return new Intl.DateTimeFormat(localeByLanguage[language], {
    month: "long",
    year: "numeric",
    timeZone: "Europe/Chisinau",
  }).format(new Date(`${monthKey}-01T12:00:00+03:00`));
}

export function getChisinauMonthKey(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    timeZone: "Europe/Chisinau",
  }).formatToParts(now);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  return `${year}-${month}`;
}

export function getAdjacentEventMonths(monthKey: string) {
  const index = eventMonthKeys.indexOf(monthKey);
  return {
    previous: index > 0 ? eventMonthKeys[index - 1] : null,
    next: index >= 0 && index < eventMonthKeys.length - 1 ? eventMonthKeys[index + 1] : null,
  };
}

export function getEventMonthSeo(monthKey: string, languageInput?: string) {
  const language = normalizeSiteLanguage(languageInput);
  const month = formatEventMonth(monthKey, language);
  return {
    language,
    month,
    title: seoText[language].title(month),
    description: seoText[language].description(month),
    intro: seoText[language].intro(month),
    calendar: seoText[language].calendar,
  };
}

export function getEventMonthMetadata(monthKey: string, languageInput?: string): Metadata {
  const seo = getEventMonthSeo(monthKey, languageInput);
  const path = eventMonthPath(monthKey);
  const url = baseUrl + path + (languageInput ? `?lang=${seo.language}` : "");
  return {
    title: { absolute: `${seo.title} | ${siteName}` },
    description: seo.description,
    alternates: routeAlternates(path, languageInput),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName,
      locale: localeByLanguage[seo.language].replace("-", "_"),
      type: "article",
      images: [{ url: mainSocialImageUrl, alt: seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [mainSocialImageUrl],
    },
  };
}

function eventDateTime(date: string, time?: string) {
  return time ? `${date}T${time}:00` : date;
}

export function buildEventMonthJsonLd(monthKey: string, languageInput?: string) {
  const seo = getEventMonthSeo(monthKey, languageInput);
  const path = eventMonthPath(monthKey);
  const pageUrl = baseUrl + path + (languageInput ? `?lang=${seo.language}` : "");
  const events = getEventsForMonth(monthKey);

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: baseUrl },
        { "@type": "ListItem", position: 2, name: seo.calendar, item: baseUrl + "/events" },
        { "@type": "ListItem", position: 3, name: seo.month, item: pageUrl },
      ],
    },
    ...events.map((event) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: event.title[seo.language],
      description: event.description[seo.language],
      startDate: eventDateTime(event.startDate, event.startTime),
      ...(event.endDate ? { endDate: eventDateTime(event.endDate) } : {}),
      eventStatus: event.status === "postponed"
        ? "https://schema.org/EventPostponed"
        : event.status === "cancelled"
          ? "https://schema.org/EventCancelled"
          : "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: event.venue[seo.language],
        ...(event.address ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: event.address[seo.language],
            addressLocality: event.city === "Chisinau" ? "Chișinău" : "Moldova",
            addressCountry: "MD",
          },
        } : {}),
      },
      url: `${pageUrl}#${event.slug}`,
      sameAs: [...new Set([event.sourceUrl, event.ticketUrl].filter(Boolean))],
      mainEntityOfPage: pageUrl,
      inLanguage: seo.language,
    })),
  ];
}
