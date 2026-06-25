import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rentplace.md";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/apartment/izmail88-10`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/apartment/izmail88-11`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/apartment/izmail88-12`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/apartment/izmail88-13`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/apartment/izmail88-20`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/apartment/izmail88-21`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/apartment/izmail88-22`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/apartment/izmail88-23`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/apartment/izmail88-37`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/apartment/izmail88-38`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/apartment/izmail88-42`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/apartment/izmail88-371`,
      lastModified: new Date(),
    },
  ];
}