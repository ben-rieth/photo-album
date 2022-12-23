// @ts-check

import { env } from "./src/env/client.mjs";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

const ContentSecurityPolicy = `
  default-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  style-src 'unsafe-inline' 'self';
  font-src data: 'self';
  object-src 'none';
  img-src 'self';
  connect-src ws: https: 'self';
  script-src 'unsafe-eval' 'self';
  prefetch-src 'self';
`;

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${env.NEXT_PUBLIC_URL}/api/:path*`
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
        ]
      }
    ]
  }
};
export default config;
