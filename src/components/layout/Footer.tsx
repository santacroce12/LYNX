"use client";

import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import {
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socials = site.contact?.social ?? [];

  const getSocialIcon = (platform: string) => {
    const label = platform.toLowerCase();
    if (label.includes("linkedin")) return <Linkedin className="h-5 w-5" />;
    if (label.includes("instagram")) return <Instagram className="h-5 w-5" />;
    if (label.includes("facebook")) return <Facebook className="h-5 w-5" />;
    if (label.includes("twitter") || label === "x") {
      return <Twitter className="h-5 w-5" />;
    }
    return <ExternalLink className="h-5 w-5" />;
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" className="block">
              <Image
                src="/images/brand/logo-azul.png"
                alt={site.name}
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--muted)]">
              {site.description}
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                  aria-label={social.label}
                >
                  {getSocialIcon(social.label)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[var(--text)]">
              Navegacion
            </h3>
            <ul className="space-y-4">
              {site.nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[var(--text)]">
              Legal
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/privacidad"
                  className="block text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  Politica de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="block text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  Terminos de Servicio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[var(--text)]">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-[var(--accent)]" />
                <span className="text-sm leading-relaxed text-[var(--muted)]">
                  {site.contact.address}
                </span>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="group flex items-center gap-3"
                >
                  <Mail className="h-5 w-5 flex-shrink-0 text-[var(--accent)] transition-colors group-hover:text-[var(--text)]" />
                  <span className="text-sm text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]">
                    {site.contact.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="group flex items-center gap-3"
                >
                  <Phone className="h-5 w-5 flex-shrink-0 text-[var(--accent)] transition-colors group-hover:text-[var(--text)]" />
                  <span className="text-sm text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]">
                    {site.contact.phone}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--border)] pt-8 text-center">
          <p className="text-sm text-[var(--muted)]">
            &copy; {currentYear} {site.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
