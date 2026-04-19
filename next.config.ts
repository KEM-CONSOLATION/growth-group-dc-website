import type { NextConfig } from "next";
// import withPWA from "next-pwa";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // 👇 Add this
  typescript: {
    // Warning: this will allow production builds to succeed even if
    // there are type errors in your project.
    ignoreBuildErrors: true,
  },
};

// Temporarily disable PWA to fix build issues
// const config = withPWA({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === "development",
// })(baseConfig);

export default config;
