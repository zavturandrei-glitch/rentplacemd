import type { MetadataRoute } from "next";
import { activeApartments } from "@/lib/apartments";
import { baseUrl, contentLastModified, getApartmentUrl, languageAlternates } from "@/lib/seo";

function alternatesFor(url: string) {
  return {
    languages: Object.fromEntries(Object.keys(languageAlternates).map((language) => [language, url])),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const apartmentRoutes = activeApartments.map((apartment) => {
    const url = getApartmentUrl(apartment.id);

    return {
      url,
      lastModified: contentLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.86,
      alternates: alternatesFor(url),
      images: [...apartment.photos, apartment.facadePhoto].map((image) => baseUrl + image),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: contentLastModified,
      changeFrequency: "daily",
      priority: 1,
      alternates: alternatesFor(baseUrl),
      images: [baseUrl + "/og-image.jpg", baseUrl + "/main.jpg", baseUrl + "/icon.png"],
    },
    ...apartmentRoutes,
  ];
}
