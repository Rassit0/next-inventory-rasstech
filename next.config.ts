import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'standalone',
  images: {
    // unoptimized: process.env.NODE_ENV === 'development',
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api-inventory-laravel-production.up.railway.app',
        port: '8000',
      },
      
      {
        protocol: 'http',
        hostname: '192.168.1.9',
        port: '8000',
        pathname: '/storage/**',
      },
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
};

export default nextConfig;
