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
import { eventMonthKeys, eventMonthPath } from "@/lib/eventCalendar";
import { guidePages, guidePath, guideSlugs } from "@/lib/guide";
import {
  destinationPath,
  destinations,
  destinationSlugs,
} from "@/lib/moldovaDestinations";

const routeLastModified: Record<string, Date> = {
  "": new Date("2026-07-26"),
  "/about": new Date("2026-07-26"),
  "/apartments": new Date("2026-08-02"),
  "/owners": new Date("2026-08-02"),
  "/check-in-rules": new Date("2026-07-25"),
  "/booking-terms": new Date("2026-08-02"),
  "/transfer": new Date("2026-07-25"),
  "/chisinau-guide": new Date("2026-07-26"),
  "/chisinau-videos": new Date("2026-08-02"),
};
const categoryLastModified = new Date("2026-08-02");
const apartmentInventoryLastModified = new Date("2026-07-26");
const newApartmentLastModified = new Date("2026-08-02");
const newApartmentIds = new Set(["201", "202", "203", "204", "205"]);

function absoluteAssetUrl(path: string) {
  return new URL(path, baseUrl).href;
}

function uniqueAssetUrls(paths: readonly string[]) {
  return [...new Set(paths.map(absoluteAssetUrl))];
}

function languageAlternates(path: string) {
  return {
    languages: {
      ru: baseUrl + path + "?lang=ru",
      ro: baseUrl + path + "?lang=ro",
      en: baseUrl + path + "?lang=en",
      uk: baseUrl + path + "?lang=uk",
      cs: baseUrl + path + "?lang=cs",
      "x-default": baseUrl + path,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
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
      lastModified: newApartmentIds.has(String(apartment.id))
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
      lastModified: new Date(slug === "events" ? eventsUpdatedAt : slug === "wineries" ? "2026-08-02" : "2026-07-25"),
      changeFrequency: slug === "events" ? "weekly" as const : "monthly" as const,
      priority: 0.7,
      images: slug === "wineries"
        ? uniqueAssetUrls([
            guidePages.wineries.image,
            ...destinationSlugs.map((destinationSlug) => destinations[destinationSlug].image),
          ])
        : [baseUrl + guidePages[slug].image],
      alternates: languageAlternates(path),
    };
  });

  const destinationRoutes = destinationSlugs.map((slug) => {
    const path = destinationPath(slug);
    return {
      url: baseUrl + path,
      lastModified: new Date("2026-08-02"),
      changeFrequency: "monthly" as const,
      priority: 0.74,
      images: [baseUrl + destinations[slug].image],
      alternates: languageAlternates(path),
    };
  });

  const eventMonthRoutes = eventMonthKeys.map((monthKey) => {
    const path = eventMonthPath(monthKey);
    return {
      url: baseUrl + path,
      lastModified: new Date(eventsUpdatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.74,
      images: [baseUrl + guidePages.events.image],
      alternates: languageAlternates(path),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: routeLastModified[""],
      changeFrequency: "daily",
      priority: 1,
      images: [mainSocialImageUrl, baseUrl + "/main.jpg", baseUrl + "/icon.png"],
      alternates: languageAlternates(""),
    },
    ...["/about", "/apartments", "/owners", "/check-in-rules", "/booking-terms", "/transfer", "/chisinau-guide", "/chisinau-videos"].map((path) => ({
      url: baseUrl + path,
      lastModified: routeLastModified[path],
      changeFrequency: "monthly" as const,
      priority: path === "/apartments" ? 0.9 : path === "/owners" ? 0.76 : path === "/chisinau-videos" ? 0.74 : 0.72,
      images: [mainSocialImageUrl],
      alternates: languageAlternates(path),
    })),
    ...categoryRoutes,
    ...guideRoutes,
    ...destinationRoutes,
    ...eventMonthRoutes,
    ...apartmentRoutes,
  ];
}
