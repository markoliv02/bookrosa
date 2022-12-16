/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "viudhkddfyymxinmimyo.supabase.co",
        // pathname: "/account123/**",
      },
    ],
  },
};

module.exports = nextConfig;
