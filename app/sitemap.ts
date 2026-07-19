import type { MetadataRoute } from "next";
import {
  activeApartments,
  apartmentCategoryOrder,
  getApartmentCategoryPath,
} from "@/lib/apartments";
import { baseUrl, getApartmentUrl } from "@/lib/seo";

const routeLastModified: Record<string, Date> = {
  "": new Date("2026-07-19"),
  "/about": new Date("2026-07-12"),
  "/apartments": new Date("2026-07-19"),
  "/check-in-rules": new Date("2026-06-24"),
  "/transfer": new Date("2026-06-24"),
  "/chisinau-guide": new Date("2026-06-24"),
};
const categoryLastModified = new Date("2026-07-19");
const apartmentInventoryLastModified = new Date("2026-07-12");

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
    images: [baseUrl + "/og-image.jpg"],
    alternates: languageAlternates(getApartmentCategoryPath(category)),
  }));

  const apartmentRoutes = activeApartments.map((apartment) => {
    const url = getApartmentUrl(apartment.id);

    return {
      url,
      lastModified: apartmentInventoryLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.86,
      images: uniqueAssetUrls([...apartment.photos, ...(apartment.facadePhoto ? [apartment.facadePhoto] : [])]),
      alternates: languageAlternates("/apartment/" + apartment.slug),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: routeLastModified[""],
      changeFrequency: "daily",
      priority: 1,
      images: [baseUrl + "/og-image.jpg", baseUrl + "/main.jpg", baseUrl + "/icon.png"],
      alternates: languageAlternates(""),
    },
    ...["/about", "/apartments", "/check-in-rules", "/transfer", "/chisinau-guide"].map((path) => ({
      url: baseUrl + path,
      lastModified: routeLastModified[path],
      changeFrequency: "monthly" as const,
      priority: path === "/apartments" ? 0.9 : 0.72,
      images: [baseUrl + "/og-image.jpg"],
      alternates: languageAlternates(path),
    })),
    ...categoryRoutes,
    ...apartmentRoutes,
  ];
}
