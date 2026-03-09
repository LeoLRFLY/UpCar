import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "upcar-red": "#CC0000",
        "upcar-red-light": "#E60000",
        "upcar-dark": "#1A1A1A",
        "upcar-darker": "#0D0D0D",
        "upcar-steel": "#222222",
        "upcar-chrome": "#8A8A8A",
        "upcar-white": "#F5F5F0",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};
export default config;
