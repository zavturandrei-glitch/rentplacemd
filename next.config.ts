import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rentplace.md" }],
        destination: "https://rentplace.md/:path*",
        permanent: true,
      },
      {
        source: "/apartment/:slug/",
        destination: "/apartment/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
