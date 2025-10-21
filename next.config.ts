import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // Suppress Ant Design v5 compatibility warnings
    config.ignoreWarnings = [
      { module: /node_modules\/antd/ },
      /antd.*compatible/,
    ];
    return config;
  },
};

export default nextConfig;
