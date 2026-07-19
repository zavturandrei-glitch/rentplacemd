import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82],
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [
      {
        source: "/apartment/mihai-eminescu-76-me-76/",
        destination: "/apartment/mihai-eminescu-76-76",
        permanent: true,
      },
      {
        source: "/apartment/lev-tolstoi-63-1-ltz-63/",
        destination: "/apartment/lev-tolstoi-63-1-77",
        permanent: true,
      },
      {
        source: "/apartment/lev-tolstoi-63-1-ltg-63/",
        destination: "/apartment/lev-tolstoi-63-1-78",
        permanent: true,
      },
      {
        source: "/apartment/mihai-eminescu-76-me-76",
        destination: "/apartment/mihai-eminescu-76-76",
        permanent: true,
      },
      {
        source: "/apartment/lev-tolstoi-63-1-ltz-63",
        destination: "/apartment/lev-tolstoi-63-1-77",
        permanent: true,
      },
      {
        source: "/apartment/lev-tolstoi-63-1-ltg-63",
        destination: "/apartment/lev-tolstoi-63-1-78",
        permanent: true,
      },
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
