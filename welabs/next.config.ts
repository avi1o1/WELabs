import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.vlabs.ac.in",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
