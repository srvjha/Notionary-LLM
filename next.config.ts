import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10000mb', // set to 10mb (or higher if needed)
    },
  },
};

export default nextConfig;
