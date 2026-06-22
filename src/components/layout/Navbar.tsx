"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
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
    if (!menuOpen) return;

    const scrollY = window.scrollY;
    const htmlOverflow = document.documentElement.style.overflow;
    const bodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
    };

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      Object.assign(document.body.style, bodyStyles);
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) setMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      desktopQuery.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
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
        className={`relative z-50 overflow-hidden border-b transition-all duration-500 ${
          compact
            ? "border-white/10 bg-[rgba(13,6,37,0.64)] shadow-[0_14px_34px_rgba(7,3,24,0.24)] backdrop-blur-[20px]"
            : "border-white/8 bg-[rgba(13,6,37,0.9)] backdrop-blur-[12px]"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_78%)]" />
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_24%_0%,rgba(239,130,57,0.12),transparent_28%)] transition-opacity duration-500 ${
            compact ? "opacity-55" : "opacity-85"
          }`}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/8" />

        <div
          className={`mx-auto flex w-full max-w-[1180px] items-center justify-between gap-6 transition-all duration-500 ${
            compact
              ? "h-[60px] px-4 md:h-[64px] md:px-6"
              : "h-[64px] px-4 md:h-[78px] md:px-6"
          }`}
        >
          <Link href="/" className="flex min-w-0 items-center">
            <Image
              src="/images/brand/lynx-logo-negative.png"
              alt="LYNX logo"
              width={160}
              height={45}
              priority
              className={`h-auto shrink-0 transition-all duration-500 ${
                compact ? "w-[104px] md:w-[118px]" : "w-[104px] md:w-[128px]"
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
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/[0.04] text-[var(--text)] transition-all duration-300 hover:border-[rgba(247,208,163,0.3)] hover:text-[var(--accent-soft)] lg:hidden ${
                compact ? "h-9 w-9" : "h-9 w-9 md:h-10 md:w-10"
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
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 overflow-hidden lg:hidden ${
          menuOpen
            ? "visible pointer-events-auto"
            : "invisible pointer-events-none delay-500"
        }`}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-[rgba(7,3,24,0.68)] backdrop-blur-md transition duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menu"
        />

        <div
          className={`absolute inset-0 bg-[rgba(13,6,37,0.95)] transition duration-500 ease-out-expo ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <div className="mx-auto flex h-[100dvh] w-full max-w-6xl items-start px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[calc(4.5rem+env(safe-area-inset-top))] sm:px-6 md:pb-8 md:pt-[calc(5.25rem+env(safe-area-inset-top))]">
            <div className="panel-shell flex max-h-full w-full flex-col overflow-hidden rounded-[1.55rem] px-4 py-5 md:rounded-[2rem] md:px-8 md:py-8">
              <div className="min-h-0 overflow-y-auto overscroll-contain pr-1 [scrollbar-color:rgba(170,166,246,0.35)_transparent] [scrollbar-width:thin]">
                <div className="border-b border-white/8 pb-4 md:pb-5">
                  <span className="section-kicker">{activeNavItem.label}</span>
                  <p className="mt-3 max-w-md text-sm leading-6 text-[var(--text)]/76 md:mt-4 md:leading-7">
                    {site.tagline}
                  </p>
                </div>

                <nav className="flex flex-col gap-1.5 py-4 md:gap-2 md:py-6">
                  {site.nav.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`group flex items-center justify-between rounded-[1.05rem] border px-4 py-3 transition md:rounded-[1.4rem] md:px-5 md:py-4 [@media(max-height:700px)]:py-2.5 ${
                        isActive(item.href)
                          ? "border-[rgba(247,208,163,0.24)] bg-[rgba(239,130,57,0.1)] text-[var(--text-strong)]"
                          : "border-transparent bg-transparent text-[var(--muted)] hover:border-white/8 hover:bg-white/[0.03] hover:text-[var(--text-strong)]"
                      }`}
                    >
                      <span className="text-[1.2rem] font-semibold leading-none md:text-[1.6rem]">
                        {item.label}
                      </span>
                      <span className="text-[10px] uppercase tracking-normal text-[var(--muted-soft)] transition group-hover:text-[var(--accent-soft)] md:text-[11px] md:tracking-[0.24em]">
                        0{index + 1}
                      </span>
                    </Link>
                  ))}
                </nav>

                <div className="border-t border-white/8 pt-4">
                  <Link
                    href="/contacto"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-full border border-[rgba(247,208,163,0.2)] bg-[rgba(239,130,57,0.12)] px-5 py-3 text-[10px] font-semibold uppercase tracking-normal text-[var(--text-strong)] transition hover:border-[rgba(247,208,163,0.34)] hover:bg-[rgba(239,130,57,0.18)] sm:w-auto md:tracking-[0.18em]"
                  >
                    Agendar diagnostico
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
