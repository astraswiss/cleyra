import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        content: "1180px",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#EEF4F1",
          100: "#D7E6DE",
          200: "#B0CDBD",
          300: "#85B29A",
          400: "#5C9679",
          500: "#3D7A5C",
          600: "#2E6249",
          700: "#244C3A",
          800: "#1C3B2E",
          900: "#142B21",
        },
        clay: {
          50: "#FDF1EC",
          100: "#FBDFD1",
          200: "#F5BEA3",
          300: "#EC9974",
          400: "#E17A4E",
          500: "#C85F35",
          600: "#A64926",
          700: "#7D371D",
        },
        ink: {
          50: "#F7F6F4",
          100: "#EDEBE7",
          200: "#DCD8D1",
          300: "#B8B2A7",
          400: "#8C8577",
          500: "#655F53",
          600: "#4A453C",
          700: "#37332C",
          800: "#26231E",
          900: "#181613",
        },
      },
      boxShadow: {
        soft: "0 2px 10px 0 rgb(20 43 33 / 0.06), 0 1px 2px 0 rgb(20 43 33 / 0.04)",
        card: "0 4px 20px -4px rgb(20 43 33 / 0.10)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
