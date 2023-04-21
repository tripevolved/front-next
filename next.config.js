/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_KEY: process.env.API_KEY,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
