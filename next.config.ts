import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/de/endreinigung-oberwallis",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
