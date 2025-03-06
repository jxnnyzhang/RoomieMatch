import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "RoomieMatch";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    // Disable Next.js image optimization for GitHub Pages
    unoptimized: true,
  },
};

export default nextConfig;
