import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // Suppress Ant Design v5 compatibility warnings
    config.ignoreWarnings = [
      { module: /node_modules\/antd/ },
      /antd.*compatible/,
      /antd v5 support React/,
    ];
    
    if (!isServer) {
      // Suppress browser console warnings
      config.resolve.alias = {
        ...config.resolve.alias,
      };
    }
    
    return config;
  },
  // Suppress dev overlay warnings
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
