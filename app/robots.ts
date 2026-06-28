import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://rentplace.md/sitemap.xml",
    host: "https://rentplace.md",
  };
}
