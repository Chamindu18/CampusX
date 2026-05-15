/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      // UploadThing CDN
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      // Vercel image optimization (if using Vercel)
      {
        protocol: "https",
        hostname: "*.vercel.com",
      },
      // Add other trusted image hosts as needed
      // {
      //   protocol: "https",
      //   hostname: "images.example.com",
      // },
    ],
  },
};

module.exports = nextConfig;