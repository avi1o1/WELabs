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
  // Ignore ESLint errors during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during builds
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
