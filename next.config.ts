import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.cdn.appfolio.com",
        pathname: "/maia/images/**",
      },
    ],
  },
};

export default nextConfig;
