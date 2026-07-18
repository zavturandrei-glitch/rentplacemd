import type { MetadataRoute } from "next";
import {
  activeApartments,
  apartmentCategoryOrder,
  getApartmentCategoryPath,
} from "@/lib/apartments";
import { baseUrl, contentLastModified, getApartmentUrl } from "@/lib/seo";

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
    lastModified: contentLastModified,
    changeFrequency: "weekly" as const,
    priority: 0.88,
    images: [baseUrl + "/og-image.jpg"],
    alternates: languageAlternates(getApartmentCategoryPath(category)),
  }));

  const apartmentRoutes = activeApartments.map((apartment) => {
    const url = getApartmentUrl(apartment.id);

    return {
      url,
      lastModified: contentLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.86,
      images: [...apartment.photos, ...(apartment.facadePhoto ? [apartment.facadePhoto] : [])].map((image) => baseUrl + image),
      alternates: languageAlternates("/apartment/" + apartment.slug),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: contentLastModified,
      changeFrequency: "daily",
      priority: 1,
      images: [baseUrl + "/og-image.jpg", baseUrl + "/main.jpg", baseUrl + "/icon.png"],
      alternates: languageAlternates(""),
    },
    ...["/about", "/apartments", "/check-in-rules", "/transfer", "/chisinau-guide"].map((path) => ({
      url: baseUrl + path,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/apartments" ? 0.9 : 0.72,
      images: [baseUrl + "/og-image.jpg"],
      alternates: languageAlternates(path),
    })),
    ...categoryRoutes,
    ...apartmentRoutes,
  ];
}
