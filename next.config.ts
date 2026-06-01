import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? "/my-acad-tutor" : "",
  assetPrefix: isGithubPages ? "/my-acad-tutor/" : "",
  trailingSlash: true,
};

export default nextConfig;