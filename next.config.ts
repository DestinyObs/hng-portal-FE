import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },

      {
        protocol: 'https',
        hostname: 'api.connect.hng.tech',
      },
      {
        protocol: 'https',
        hostname: 'api.staging.connect.hng.tech',
      },
    ],
  },
};

export default nextConfig;
