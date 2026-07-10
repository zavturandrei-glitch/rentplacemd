import type { MetadataRoute } from "next";
import {
  activeApartments,
  apartmentCategoryOrder,
  getApartmentCategoryPath,
} from "@/lib/apartments";
import { baseUrl, contentLastModified, getApartmentUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryRoutes = apartmentCategoryOrder.map((category) => ({
    url: baseUrl + getApartmentCategoryPath(category),
    lastModified: contentLastModified,
    changeFrequency: "weekly" as const,
    priority: 0.88,
    images: [baseUrl + "/og-image.jpg"],
  }));

  const apartmentRoutes = activeApartments.map((apartment) => {
    const url = getApartmentUrl(apartment.id);

    return {
      url,
      lastModified: contentLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.86,
      images: [...apartment.photos, apartment.facadePhoto].map((image) => baseUrl + image),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: contentLastModified,
      changeFrequency: "daily",
      priority: 1,
      images: [baseUrl + "/og-image.jpg", baseUrl + "/main.jpg", baseUrl + "/icon.png"],
    },
    ...["/about", "/apartments", "/check-in-rules", "/transfer", "/chisinau-guide"].map((path) => ({
      url: baseUrl + path,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/apartments" ? 0.9 : 0.72,
      images: [baseUrl + "/og-image.jpg"],
    })),
    ...categoryRoutes,
    ...apartmentRoutes,
  ];
}
