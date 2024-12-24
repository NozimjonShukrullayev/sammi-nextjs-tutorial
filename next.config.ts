import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, 
  swcMinify: true,
  images: {
    domains: ["media.graphassets.com", "eu-west-2.graphassets.com"],
  },
};

export default nextConfig;
