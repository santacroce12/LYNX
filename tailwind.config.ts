import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        border: "var(--border)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
      },
      // En tailwind.config.ts > theme > extend
      animation: {
        "energy-flow": "energy-flow 3s linear infinite", // (Manten la existente)
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite", // <--- NUEVA
      },  
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 106, 0, 0.35)",
        "glow-soft": "0 0 28px rgba(255, 138, 61, 0.25)",
      },
      backgroundImage: {
        "radial-accent": "radial-gradient(600px circle at 20% 20%, rgba(249, 115, 22, 0.16), transparent 60%)",
        "radial-accent-2": "radial-gradient(500px circle at 80% 30%, rgba(251, 146, 60, 0.12), transparent 60%)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "energy-flow": "energy-flow 3s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "energy-flow": {
          "0%": { left: "-100%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { left: "100%", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
