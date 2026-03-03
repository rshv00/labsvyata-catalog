import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff8ed",
          100: "#ffefd6",
          200: "#ffd8ab",
          300: "#ffbe77",
          400: "#ffa255",
          500: "#ff8433",
          600: "#eb651c",
          700: "#c24a16",
          800: "#9a3a18",
          900: "#7c3217",
        },
      },
      boxShadow: {
        soft: "0 10px 30px -14px rgba(0, 0, 0, 0.2)",
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};

export default config;
