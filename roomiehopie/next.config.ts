import type { NextConfig } from "next";

<<<<<<< Updated upstream
const isProd = process.env.NODE_ENV === "production";
const repoName = "RoomieMatch"; // your repository name

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true, // Disable image optimization for GitHub Pages
  },
  output: "export", // Enable static export mode
};

export default nextConfig;
=======

  
module.exports = {};  // Add other config options here if needed


>>>>>>> Stashed changes
