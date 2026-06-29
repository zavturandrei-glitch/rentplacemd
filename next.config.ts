import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [
      {
        source: "/apartment/:slug/",
        destination: "/apartment/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
