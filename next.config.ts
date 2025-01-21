import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    domains: ["images.pexels.com", "i.ibb.co", "firebasestorage.googleapis.com"],
  },
};

module.exports = {
  async redirects() {
    return [
      {
        source: '/unauthorized',
        destination: '/unauthorized',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/api/middleware',
      },
    ];
  },
};

export default nextConfig;
