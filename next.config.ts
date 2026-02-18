import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // For placeholders
        pathname: '/**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'shopify.com',
        pathname: '/**',
        port: '',
      }
    ],
  },
};

export default nextConfig;
