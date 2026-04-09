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
      setIsScrolled(window.scrollY > 10);
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

  const getBrandSuffix = () => {
    if (pathname?.startsWith("/energia")) return "División Energía";
    if (pathname?.startsWith("/tecnologia")) return "División Tecnología";
    if (pathname?.startsWith("/recursos")) return "Casos y recursos";
    if (pathname?.startsWith("/contacto")) return "Contacto directo";
    return "Infraestructura crítica";
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-6xl px-3 pt-3 md:px-4 md:pt-4">
        <div
          className={`panel-shell rounded-[1.55rem] px-4 transition-all duration-300 md:px-5 ${
            isScrolled || menuOpen ? "py-3" : "py-3.5"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-2.5 py-2 md:px-3">
                <Image
                  src="/images/brand/logo-azul.png"
                  alt="LYNX logo"
                  width={160}
                  height={45}
                  priority
                  className="h-auto w-[104px] sm:w-[112px] md:w-[126px]"
                />
              </div>

              <div className="hidden min-w-0 xl:block">
                <p className="section-kicker">{getBrandSuffix()}</p>
                <p className="mt-1 truncate text-[11px] text-[var(--muted-soft)]">
                  Energía + software + operación
                </p>
              </div>
            </Link>

            <nav
              aria-label={site.aria.primaryNav}
              className="hidden min-w-0 items-center gap-1 rounded-[1rem] border border-white/8 bg-white/[0.03] p-1 lg:flex"
            >
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-[0.85rem] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-200 lg:px-4 ${
                    isActive(item.href)
                      ? "border border-[rgba(255,194,131,0.22)] bg-[rgba(255,122,26,0.12)] text-[var(--text-strong)]"
                      : "border border-transparent text-[var(--muted)] hover:bg-white/[0.04] hover:text-[var(--text-strong)]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/contacto"
                className="hidden rounded-full border border-[rgba(255,194,131,0.2)] bg-[rgba(255,122,26,0.12)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-strong)] transition hover:border-[rgba(255,194,131,0.34)] hover:bg-[rgba(255,122,26,0.18)] xl:inline-flex"
              >
                Agendar diagnóstico
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white/[0.03] text-[var(--text)] transition hover:border-[rgba(255,194,131,0.3)] hover:text-[var(--accent-soft)] lg:hidden"
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
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
          aria-label="Cerrar menú"
        />

        <div
          className={`absolute inset-0 bg-[rgba(4,9,18,0.94)] transition duration-500 ease-out-expo ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 pb-8 pt-24 sm:px-6">
            <div className="panel-shell flex min-h-[calc(100dvh-8rem)] flex-1 flex-col rounded-[2rem] px-5 py-6 md:px-8 md:py-8">
              <div className="border-b border-white/8 pb-5">
                <span className="section-kicker">{getBrandSuffix()}</span>
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
                  Agendar diagnóstico
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
