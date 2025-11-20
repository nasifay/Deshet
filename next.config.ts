import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "c.animaapp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sdhv7uisvpljorhf.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
    // Allow unoptimized images as fallback for any external domains not in remotePatterns
    unoptimized: false,
  },
};

export default nextConfig;
