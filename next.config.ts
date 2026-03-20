import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), 'src/config/env/.env.local') });
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        pathname: '/b/id/**',
      },
    ],
  },
  /** Avoid mixed-content (HTTPS page requesting HTTP) on production deploys. */
  async headers() {
    if (process.env.NODE_ENV !== "production") return [];
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
