import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/og/rentplace-main-1200x630-v2.jpg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=31536000, immutable",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
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
