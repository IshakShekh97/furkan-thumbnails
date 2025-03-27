import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: `/images/${process.env.SANITY_PROJECT_ID}/${process.env.SANITY_DATASET}/**`,
      },
    ],
  },
};

export default nextConfig;
