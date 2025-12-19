"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

type Theme = "light" | "dark";

const THEME_KEY = "lynx-theme";

const applyTheme = (value: Theme) => {
  document.documentElement.setAttribute("data-theme", value);
};

const getInitialTheme = (): Theme => {
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(THEME_KEY);
  } catch (error) {
    stored = null;
  }
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  const prefersDark = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : true;

  return prefersDark ? "dark" : "light";
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const labels = site.theme;

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch (error) {
    }
  };

  const label = theme === "dark" ? labels.dark : labels.light;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`${labels.toggleLabel}: ${label}`}
      aria-pressed={theme === "dark"}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
    >
      <span
        className={`h-2 w-2 rounded-full ${
          theme === "dark" ? "bg-[var(--accent)]" : "bg-[var(--border)]"
        }`}
        aria-hidden="true"
      />
      <span>{labels.toggleLabel}</span>
      <span className="text-[var(--text)]">{label}</span>
    </button>
  );
}
