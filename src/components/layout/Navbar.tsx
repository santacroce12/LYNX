"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const activeNavItem = site.nav.find((item) => isActive(item.href)) ?? site.nav[0];
  const compact = isScrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative overflow-hidden border-b transition-all duration-500 ${
          compact
            ? "border-white/10 bg-[rgba(7,12,22,0.58)] shadow-[0_14px_34px_rgba(3,8,20,0.2)] backdrop-blur-[20px]"
            : "border-white/8 bg-[rgba(7,12,22,0.9)] backdrop-blur-[12px]"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_78%)]" />
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_24%_0%,rgba(255,122,26,0.12),transparent_28%)] transition-opacity duration-500 ${
            compact ? "opacity-55" : "opacity-85"
          }`}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/8" />

        <div
          className={`mx-auto flex w-full max-w-[1180px] items-center justify-between gap-6 transition-all duration-500 ${
            compact
              ? "h-[60px] px-4 md:h-[64px] md:px-6"
              : "h-[72px] px-5 md:h-[78px] md:px-6"
          }`}
        >
          <Link href="/" className="flex min-w-0 items-center">
            <Image
              src="/images/brand/logo-azul.png"
              alt="LYNX logo"
              width={160}
              height={45}
              priority
              className={`h-auto shrink-0 transition-all duration-500 ${
                compact ? "w-[104px] md:w-[118px]" : "w-[112px] md:w-[128px]"
              }`}
            />
          </Link>

          <nav
            aria-label={site.aria.primaryNav}
            className="hidden min-w-0 items-center gap-5 lg:flex xl:gap-7"
          >
            {site.nav.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                    active
                      ? "text-[var(--text-strong)]"
                      : "text-[var(--text)]/82 hover:text-[var(--text-strong)]"
                  }`}
                >
                  {item.label}
                  <span
                    className={`pointer-events-none absolute inset-x-0 mx-auto h-px w-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-all duration-300 ${
                      compact ? "-bottom-[0.65rem]" : "-bottom-[0.84rem]"
                    } ${
                      active
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/[0.04] text-[var(--text)] transition-all duration-300 hover:border-[rgba(255,194,131,0.3)] hover:text-[var(--accent-soft)] lg:hidden ${
                compact ? "h-9 w-9" : "h-10 w-10"
              }`}
              aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 lg:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-[rgba(2,6,16,0.62)] backdrop-blur-md transition duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menu"
        />

        <div
          className={`absolute inset-0 bg-[rgba(4,9,18,0.94)] transition duration-500 ease-out-expo ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 pb-8 pt-24 sm:px-6">
            <div className="panel-shell flex min-h-[calc(100dvh-8rem)] flex-1 flex-col rounded-[2rem] px-5 py-6 md:px-8 md:py-8">
              <div className="border-b border-white/8 pb-5">
                <span className="section-kicker">{activeNavItem.label}</span>
                <p className="mt-4 max-w-md text-sm leading-7 text-[var(--text)]/76">
                  {site.tagline}
                </p>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-2 py-6">
                {site.nav.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between rounded-[1.4rem] border px-5 py-4 transition ${
                      isActive(item.href)
                        ? "border-[rgba(255,194,131,0.24)] bg-[rgba(255,122,26,0.1)] text-[var(--text-strong)]"
                        : "border-transparent bg-transparent text-[var(--muted)] hover:border-white/8 hover:bg-white/[0.03] hover:text-[var(--text-strong)]"
                    }`}
                  >
                    <span className="text-[1.6rem] font-semibold leading-none">
                      {item.label}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted-soft)] transition group-hover:text-[var(--accent-soft)]">
                      0{index + 1}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="pt-4">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(255,194,131,0.2)] bg-[rgba(255,122,26,0.12)] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-strong)] transition hover:border-[rgba(255,194,131,0.34)] hover:bg-[rgba(255,122,26,0.18)]"
                >
                  Agendar diagnostico
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
