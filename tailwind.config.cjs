/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ['var(--font-merienda)', fontFamily.sans],
        scrawl: ['var(--font-caveat)', fontFamily.sans]
      }
    },
  },
  plugins: [],
};
