import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Teljesítmény-optimalizációk a felesleges JS polyfillek és a renderelés gyorsítására:
  compiler: {
    // Eltávolítja a production buildből a console.log hívásokat, csökkentve a JS méretét
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Biztosítja a modern ES6+ kimenetet, megakadályozva a felesleges régi polyfillek beépítését
  experimental: {
    optimizePackageImports: ['lucide-react'], // Ha használsz ikoncsomagokat, itt optimalizálhatod
  },
};

export default nextConfig;