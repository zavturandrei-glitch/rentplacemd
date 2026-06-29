import type { MetadataRoute } from "next";
import { apartmentDetailsById } from "@/data/apartments";
import { baseUrl, getApartmentUrl, languageAlternates } from "@/lib/seo";

const lastModified = new Date("2026-06-29");

function alternatesFor(url: string) {
  return {
    languages: Object.fromEntries(Object.keys(languageAlternates).map((language) => [language, url])),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const apartmentRoutes = Object.values(apartmentDetailsById).map((apartment) => {
    const url = getApartmentUrl(apartment.id);

    return {
      url,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.86,
      alternates: alternatesFor(url),
      images: apartment.images.map((image) => baseUrl + image),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
      alternates: alternatesFor(baseUrl),
      images: [baseUrl + "/og-image.jpg", baseUrl + "/main.jpg", baseUrl + "/icon.png"],
    },
    ...apartmentRoutes,
  ];
}
