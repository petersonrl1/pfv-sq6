import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-base": "#0b1220",
        "bg-surface": "#111b2d",
        "bg-elevated": "#15223f",
        "bg-overlay": "rgba(11, 18, 32, 0.7)",
        "border-subtle": "#2c3a56",
        "border-default": "#344463",
        "border-strong": "#4b5b7a",
        "text-primary": "#edf2ff",
        "text-secondary": "#c6d0ff",
        "text-muted": "#8f9abb",
        "text-faint": "#62708f",
        "accent-amber": "#f5c16d",
        "accent-teal": "#5bd6cf",
        "accent-coral": "#ff8a72",
        "accent-steel": "#7da4ff",
        "accent-plum": "#c08bff",
        "accent-sky": "#84c8ff",
      },
      boxShadow: {
        soft: "0 16px 40px rgba(0, 0, 0, 0.16)",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui"],
        display: ["Playfair Display", "Georgia", "serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular"],
      },
      animation: {
        fadeIn: "fadeIn 0.45s ease-out",
        slideIn: "slideIn 0.35s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
