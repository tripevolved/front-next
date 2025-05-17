const { withNextVideo } = require('next-video/process');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_KEY: process.env.API_KEY,
    NEXT_PUBLIC_CAN_SIGNUP: process.env.CAN_SIGNUP,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = withNextVideo(nextConfig);
