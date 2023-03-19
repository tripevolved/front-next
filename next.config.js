/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL || "https://api.dev.tripevolved.com.br",
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
