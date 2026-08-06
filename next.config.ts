import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },

  async redirects() {
    return [
      // www → non-www (301)
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.theweeklywrap.online",
          },
        ],
        destination: "https://theweeklywrap.online/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
