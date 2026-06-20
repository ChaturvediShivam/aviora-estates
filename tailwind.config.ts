import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aviora Mediterranean luxury palette — final brand lock
        // Primary: cobalt water, shutters, doors
        primary: "#3057A4",
        "primary-hover": "#4A73C5",

        // Secondary: deep shadow / dark sections
        secondary: "#151515",

        // Surfaces: sunlit villa walls
        surface: "#F6F1E8",
        "surface-elevated": "#FAF7F0",
        "surface-card": "#FFFFFF",
        "surface-dark": "#151515",

        // Text
        text: "#1F1F1F",
        "text-heading": "#151515",
        "text-inverse": "#FFFFFF",

        // Muted
        muted: "rgba(31, 31, 31, 0.60)",
        "muted-inverse": "rgba(255, 255, 255, 0.60)",

        // Borders
        "border-light": "rgba(31, 31, 31, 0.10)",
        "border-dark": "rgba(255, 255, 255, 0.10)",
        "border-accent": "rgba(48, 87, 164, 0.30)",

        // Semantic — nature-led, premium, organic
        success: "#7A8450",
        "success-soft": "rgba(122, 132, 80, 0.12)",
        warning: "#D8CBB8",
        "warning-text": "#8C7D66",
        danger: "#B85C45",
        "danger-soft": "rgba(184, 92, 69, 0.10)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      letterSpacing: {
        lux: "0.22em",
      },
      transitionDuration: {
        "600": "600ms",
        "900": "900ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(1.06)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "scale-in": "scale-in 1.4s cubic-bezier(0.22,1,0.36,1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
