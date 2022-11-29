/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
