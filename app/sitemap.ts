import type { Language } from "@/locales/translations";
import { getCityVideoIdentity } from "@/lib/cityVideoIdentity";
import { readEventInventory } from "@/lib/eventStore";
import { eventMonths, eventPageLanguages } from "@/lib/eventDates";
import type { MetadataRoute } from "next";
import {
  activeApartments,
  apartmentCategoryOrder,
  getApartmentCategoryPath,
} from "@/lib/apartments";
import {
  apartmentAlternates,
  baseUrl,
  getApartmentUrl,
  mainSocialImageUrl,
} from "@/lib/seo";
import { eventsUpdatedAt } from "@/lib/events";
import { eventMonthPath } from "@/lib/eventCalendar";
import { guidePages, guidePath, guideSlugs } from "@/lib/guide";
import { destinations } from "@/lib/moldovaDestinations";
import { readPublishedCityVideos } from "@/lib/cityVideoStore";
import { getCityVideoAbsoluteThumbnail } from "@/lib/cityVideoContent";
import { getCityVideoPath } from "@/lib/cityVideoTypes";
import { centerApartmentsPath } from "@/lib/apartmentDistricts";
import { regionalGuideSlugs } from "@/lib/regionalGuides";

export const revalidate = 3600;

const routeLastModified: Record<string, Date> = {
  "/excursions": new Date("2026-09-26"),
  "": new Date("2026-09-26"),
  "/about": new Date("2026-07-26"),
  "/apartments": new Date("2026-08-02"),
  [centerApartmentsPath]: new Date("2026-09-09"),
  "/owners": new Date("2026-08-02"),
  "/check-in-rules": new Date("2026-07-25"),
  "/transfer": new Date("2026-07-25"),
  "/chisinau-guide": new Date("2026-09-26"),
  "/chisinau-videos": new Date("2026-08-02"),
};
const categoryLastModified = new Date("2026-08-02");
const apartmentInventoryLastModified = new Date("2026-07-26");
const newApartmentLastModified = new Date("2026-09-03");
const newApartmentIds = new Set(["61", "201", "202", "203", "204", "205"]);

function absoluteAssetUrl(path: string) {
  return new URL(path, baseUrl).href;
}

function uniqueAssetUrls(paths: readonly string[]) {
  return [...new Set(paths.map(absoluteAssetUrl))];
}

function languageAlternates(path: string) {
  return {
    languages: {
      ru: baseUrl + path,
      ro: baseUrl + (path || "/") + "?lang=ro",
      en: baseUrl + (path || "/") + "?lang=en",
      uk: baseUrl + (path || "/") + "?lang=uk",
      cs: baseUrl + (path || "/") + "?lang=cs",
      "x-default": baseUrl + path,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const inventory = await readEventInventory();
  const eventMonthKeys = eventMonths(inventory);
  const eventModified = new Date(inventory.reduce((latest, event) => event.verifiedAt > latest ? event.verifiedAt : latest, eventsUpdatedAt));
  const publishedVideos = await readPublishedCityVideos();
  const videoLastModified = publishedVideos.reduce(
    (latest, video) => Math.max(latest, new Date(video.updatedAt).getTime()),
    routeLastModified["/chisinau-videos"].getTime(),
  );
  const categoryRoutes = apartmentCategoryOrder.map((category) => ({
    url: baseUrl + getApartmentCategoryPath(category),
    lastModified: categoryLastModified,
    changeFrequency: "weekly" as const,
    priority: 0.88,
    images: [mainSocialImageUrl],
    alternates: languageAlternates(getApartmentCategoryPath(category)),
  }));

  const apartmentRoutes = activeApartments.map((apartment) => {
    const url = getApartmentUrl(apartment.id);

    return {
      url,
      lastModified: ["77", "78"].includes(String(apartment.id)) ? new Date("2026-09-26") : String(apartment.id) === "84" ? new Date("2026-09-23") : newApartmentIds.has(String(apartment.id))
        ? newApartmentLastModified
        : apartmentInventoryLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.86,
      images: uniqueAssetUrls([...apartment.photos, ...(apartment.facadePhoto ? [apartment.facadePhoto] : [])]),
      alternates: {
        languages: apartmentAlternates(apartment.id).languages,
      },
    };
  });

  const guideRoutes = guideSlugs.map((slug) => {
    const path = guidePath(slug);
    return {
      url: baseUrl + path,
      lastModified: slug === "events" ? eventModified : new Date("2026-09-26"),
      changeFrequency: slug === "events" ? "weekly" as const : "monthly" as const,
      priority: 0.7,
      images: [baseUrl + guidePages[slug].image],
      alternates: slug === "events" ? { languages: Object.fromEntries(Object.entries(languageAlternates(path).languages).filter(([language]) => language === "x-default" || eventPageLanguages(inventory).includes(language as Language))) } : languageAlternates(path),
    };
  });

  const eventMonthRoutes = eventMonthKeys.map((monthKey) => {
    const path = eventMonthPath(monthKey);
    return {
      url: baseUrl + path,
      lastModified: eventModified,
      changeFrequency: "weekly" as const,
      priority: 0.74,
      images: [baseUrl + guidePages.events.image],
      alternates: { languages: Object.fromEntries(Object.entries(languageAlternates(path).languages).filter(([language]) => language === "x-default" || eventPageLanguages(inventory.filter(event => event.startDate.slice(0, 7) <= monthKey && (event.endDate ?? event.startDate).slice(0, 7) >= monthKey)).includes(language as Language))) },
    };
  });

  const destinationRoutes = Object.values(destinations).map((destination) => ({
    url: baseUrl + destination.path,
    lastModified: new Date("2026-09-26"),
    changeFrequency: "monthly" as const,
    priority: 0.76,
    images: [baseUrl + destination.image],
    alternates: languageAlternates(destination.path),
  }));

  const videoRoutes = publishedVideos.filter(video => !getCityVideoIdentity(video, "ru", publishedVideos).duplicate).map((video) => {
    const path = getCityVideoPath(video.slug);
    const thumbnail = getCityVideoAbsoluteThumbnail(video);
    return {
      url: baseUrl + path,
      lastModified: new Date(video.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.72,
      ...(thumbnail ? { images: [thumbnail] } : {}),
      alternates: languageAlternates(path),
    };
  });

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: routeLastModified[""],
      changeFrequency: "daily",
      priority: 1,
      images: [mainSocialImageUrl, baseUrl + "/main.jpg", baseUrl + "/icon.png"],
      alternates: languageAlternates(""),
    },
    ...["/about", "/apartments", centerApartmentsPath, "/owners", "/check-in-rules", "/transfer", "/chisinau-guide", "/excursions", "/chisinau-videos"].map((path) => ({
      url: baseUrl + path,
      lastModified: path === "/chisinau-videos" ? new Date(videoLastModified) : routeLastModified[path],
      changeFrequency: "monthly" as const,
      priority: path === "/apartments" ? 0.9 : path === centerApartmentsPath ? 0.89 : path === "/owners" ? 0.76 : path === "/chisinau-videos" ? 0.74 : 0.72,
      images: [path === "/excursions" ? baseUrl + "/guide/moldova-trips.webp" : mainSocialImageUrl],
      alternates: languageAlternates(path),
    })),
    ...categoryRoutes,
    ...guideRoutes,
    ...destinationRoutes,
    ...regionalGuideSlugs.map((slug) => ({
      url: baseUrl + `/guide/${slug}`,
      lastModified: new Date("2026-09-26"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: languageAlternates(`/guide/${slug}`),
    })),
    ...eventMonthRoutes,
    ...inventory.map(event => ({ url: baseUrl + `/events/event/${event.slug}`, lastModified: new Date(event.verifiedAt), changeFrequency: "weekly" as const, images: [baseUrl + (event.image?.path ?? `/events/categories/${event.category}.svg`)], alternates: { languages: Object.fromEntries((event.translatedLanguages ?? ["ru", "ro", "en", "uk", "cs"]).map(language => [language, baseUrl + `/events/event/${event.slug}` + (language === "ru" ? "" : `?lang=${language}`)])) } })),
    ...videoRoutes,
    ...apartmentRoutes,
  ];
  // Each translated canonical is a URL entry with reciprocal alternates.
  // Apartment alternates already exclude languages without translated content.
  return entries.flatMap((entry) => [...new Set([
    entry.url,
    ...Object.values(entry.alternates?.languages ?? {}).flat().map(String),
  ])].map((url) => ({ ...entry, url })));
}
