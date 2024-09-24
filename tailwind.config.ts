import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "morphism-bg":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))",
      },
      backdropBlur: {
        lg: "10px",
      },
      boxShadow: {
        morphism: "0 8px 22px 0 rgba(31, 38, 135, 0.37)",
      },
      borderRadius: {
        lg: "15px",
      },
      colors: {
        primary: "#1E40AE",
        secondary: "#4B5563",
        light: "#F9FAFB",
        orangeLight: "#FFD8A8;",
      },
    },
  },
  plugins: [],
};
export default config;
