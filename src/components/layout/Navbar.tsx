import Link from "next/link";
import { site } from "@/content/site";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide text-[var(--text)]"
        >
          {site.name}
        </Link>
        <div className="flex items-center gap-4">
          <nav
            aria-label={site.aria.primaryNav}
            className="flex items-center gap-4"
          >
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
