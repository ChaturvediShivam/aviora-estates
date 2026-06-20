import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/property",
        destination: "/properties/noida-estate",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
