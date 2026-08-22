import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/video-thumbnails/"],
        disallow: ["/admin", "/admin/", "/api", "/api/"],
      },
      {
        userAgent: ["Googlebot", "Googlebot-Image"],
        allow: ["/", "/api/video-thumbnails/", "/_next/image", "/favicon.ico", "/icon.png", "/apple-icon.png", "/android-chrome-512x512.png"],
        disallow: ["/admin", "/admin/", "/api", "/api/"],
      },
    ],
    sitemap: [baseUrl + "/sitemap.xml", baseUrl + "/video-sitemap.xml"],
    host: baseUrl,
  };
}
