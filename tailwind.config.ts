import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#04091a",
          900: "#060e22",
          800: "#0a1628",
          700: "#0f1f3a",
          600: "#162848",
          500: "#1e3460",
          400: "#2a4a80",
          300: "#3d64a8",
        },
        gold: {
          300: "#f5d87a",
          400: "#e8c052",
          500: "#d4a843",
          600: "#b88a2a",
          700: "#9a6e18",
          800: "#7a530e",
        },
        "text-primary": "#e8edf8",
        "text-muted": "#8899b8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Playfair Display", "Georgia", "serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(135deg, #04091a 0%, #0a1628 60%, #0f1f3a 100%)",
        "gold-gradient": "linear-gradient(135deg, #d4a843 0%, #e8c052 100%)",
        "hero-overlay": "linear-gradient(to right, rgba(4,9,26,0.92) 40%, rgba(4,9,26,0.6) 100%)",
        "card-shine": "linear-gradient(135deg, rgba(212,168,67,0.08) 0%, transparent 60%)",
      },
      boxShadow: {
        gold: "0 0 30px rgba(212,168,67,0.25)",
        "gold-lg": "0 0 60px rgba(212,168,67,0.35)",
        "gold-sm": "0 0 12px rgba(212,168,67,0.15)",
        glass: "0 8px 32px rgba(0,0,0,0.4)",
        card: "0 4px 24px rgba(0,0,0,0.3)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
    },
  },
  plugins: [],
};

export default config;
