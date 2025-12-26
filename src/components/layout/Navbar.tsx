"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

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
    "fixed top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--surface)]/95 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,106,0,0.16),transparent_60%)] backdrop-blur-md shadow-sm transition-all duration-300 ease-in-out";

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
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--text)]">
            {site.name}
          </span>
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
        </div>
      </div>
    </header>
  );
}
