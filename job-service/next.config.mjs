/** @type {import('next').NextConfig} */
// import dotenv from 'dotenv';

const nextConfig = {
    reactStrictMode: true,
    env: {
      MONGO_URI: process.env.MONGO_URI,
    },
};

export default nextConfig;
