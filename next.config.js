/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'undici': 'node-fetch'
    };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
