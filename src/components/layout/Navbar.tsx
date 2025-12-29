"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClass =
    "fixed top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--surface)]/95 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(249,115,22,0.16),transparent_60%)] backdrop-blur-md shadow-sm transition-all duration-300 ease-in-out";

  const containerClass = `mx-auto flex w-full max-w-6xl items-center justify-between px-6 transition-all duration-300 ease-in-out ${
    isScrolled ? "py-3" : "py-5"
  }`;

  const logoClass = `w-auto transition-all duration-300 ease-in-out ${
    isScrolled ? "h-8" : "h-10"
  }`;

  return (
    <header className={headerClass}>
      <div className={containerClass}>
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/brand/logo-azul.png"
            alt="LYNX logo"
            width={160}
            height={48}
            className={logoClass}
            priority
          />
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-white">
            {site.name}
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <nav
            aria-label={site.aria.primaryNav}
            className="hidden items-center gap-4 md:flex"
          >
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:text-[var(--accent-soft)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-white transition hover:border-[var(--accent-soft)] md:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div
        id="mobile-nav"
        className={`border-t border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md transition-all md:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:text-[var(--accent-soft)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
