import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-alt": "var(--bg-alt)",
        surface: "var(--surface)",
        "surface-strong": "var(--surface-strong)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        text: "var(--text)",
        "text-strong": "var(--text-strong)",
        "text-secondary": "var(--text-secondary)",
        muted: "var(--muted)",
        "muted-soft": "var(--muted-soft)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "accent-cool": "var(--accent-cool)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 28px 90px rgba(255, 122, 26, 0.22)",
        "glow-soft": "0 18px 42px rgba(255, 178, 107, 0.18)",
        panel: "var(--shadow-panel)",
        floating: "0 26px 60px rgba(4, 10, 24, 0.42)",
      },
      backgroundImage: {
        "radial-accent":
          "radial-gradient(720px circle at 12% 18%, rgba(255, 122, 26, 0.2), transparent 58%)",
        "radial-accent-2":
          "radial-gradient(640px circle at 84% 20%, rgba(120, 167, 255, 0.16), transparent 62%)",
        "panel-grid":
          "linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "energy-flow": "energy-flow 3s linear infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        sheen: "sheen 5.5s ease-in-out infinite",
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
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        sheen: {
          "0%, 100%": { transform: "translateX(-120%)", opacity: "0" },
          "20%": { opacity: "0.35" },
          "50%": { transform: "translateX(120%)", opacity: "0.18" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
