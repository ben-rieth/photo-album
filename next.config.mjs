// @ts-check

import { withPlaiceholder } from "@plaiceholder/next";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = withPlaiceholder({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ['wrldtapbwzeyusnxrzbh.supabase.co', 'res.cloudinary.com']
  }
});
export default config;
