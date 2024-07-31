/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: '/subpath'
};

module.exports = nextConfig;
