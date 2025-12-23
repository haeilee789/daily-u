/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', 
    images: {
        unoptimized: true, 
    },
    env: {
    NEXT_PUBLIC_DEMO_EMAIL: process.env.NEXT_PUBLIC_DEMO_EMAIL,
    NEXT_PUBLIC_DEMO_PASSWORD: process.env.NEXT_PUBLIC_DEMO_PASSWORD,
  },
};

module.exports = nextConfig;
