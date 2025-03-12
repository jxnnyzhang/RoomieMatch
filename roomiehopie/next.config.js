const isProd = process.env.NODE_ENV === "production";
const repoName = "RoomieMatch"; // your repository name

const nextConfig = {
  reactStrictMode: true,
  //basePath: isProd ? `/${repoName}` : "",
  //assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true, // Disable image optimization for GitHub Pages
  }, 
};

module.exports = nextConfig;