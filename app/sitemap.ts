import { MetadataRoute } from "next";
import { apartmentDetailsById } from "@/data/apartments";

const baseUrl = "https://rentplace.md";
const lastModified = new Date("2026-06-28");

export default function sitemap(): MetadataRoute.Sitemap {
  const apartmentRoutes = Object.keys(apartmentDetailsById).map((id) => ({
    url: baseUrl + "/apartment/izmail88-" + id,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    ...apartmentRoutes,
  ];
}
