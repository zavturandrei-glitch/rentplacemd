import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: ["Googlebot", "Googlebot-Image"],
        allow: ["/", "/_next/image", "/favicon.ico", "/icon.png", "/apple-icon.png", "/android-chrome-512x512.png"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: baseUrl + "/sitemap.xml",
    host: baseUrl,
  };
}
