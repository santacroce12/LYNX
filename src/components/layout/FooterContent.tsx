import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { site } from "@/content/site";

export default function FooterContent() {
  const currentYear = new Date().getFullYear();
  const socials = site.contact?.social ?? [];

  const getSocialIcon = (platform: string) => {
    const label = platform.toLowerCase();
    if (label.includes("linkedin")) return <Linkedin className="h-5 w-5" />;
    if (label.includes("instagram")) return <Instagram className="h-5 w-5" />;
    if (label.includes("facebook")) return <Facebook className="h-5 w-5" />;
    return <ExternalLink className="h-5 w-5" />;
  };

  return (
    <>
      <div className="grid gap-8 sm:gap-10 lg:gap-12 xl:grid-cols-3 xl:gap-16">
        <div className="w-full max-w-[360px] space-y-6">
          <span className="section-kicker">Infraestructura crítica</span>

          <div className="space-y-5">
            <div className="inline-flex rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3">
              <Link href="/" className="inline-flex">
                <Image
                  src="/images/brand/lynx-logo-negative.png"
                  alt={site.name}
                  width={188}
                  height={56}
                  className="h-auto w-[156px]"
                />
              </Link>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-[var(--text-secondary)]">
                Redes:
              </p>

              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white/[0.04] text-[var(--muted)] transition hover:-translate-y-0.5 hover:border-[rgba(247,208,163,0.34)] hover:bg-[rgba(239,130,57,0.06)] hover:text-[var(--accent-soft)]"
                    aria-label={social.label}
                  >
                    {getSocialIcon(social.label)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden w-full sm:block xl:mx-auto xl:max-w-[360px] xl:justify-self-center">
          <h3 className="section-kicker">{site.footer.navTitle}</h3>

          <div className="mt-4 overflow-hidden rounded-[1rem] border border-white/[0.07] bg-white/[0.015] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
            {site.nav.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className="group grid min-h-[38px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-white/[0.055] px-3.5 py-2 text-sm text-[var(--muted)] transition last:border-b-0 hover:bg-white/[0.035] hover:text-[var(--text-strong)] md:min-h-[40px] md:px-4"
              >
                <span className="truncate">{item.label}</span>
                <span className="w-7 text-right text-[9px] uppercase tracking-normal text-[var(--muted-soft)] transition group-hover:text-[var(--accent-soft)] md:text-[10px] md:tracking-[0.14em]">
                  0{index + 1}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full xl:ml-auto xl:max-w-[420px]">
          <h3 className="section-kicker">{site.footer.contactTitle}</h3>

          <div className="mt-4 grid gap-3">
            <a
              href={site.contact.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ubicación de ${site.name} en Google Maps`}
              className="group rounded-[1.4rem] border border-[var(--border)] bg-[rgba(255,255,255,0.03)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-[rgba(247,208,163,0.34)] hover:bg-[rgba(239,130,57,0.06)]"
            >
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-[var(--accent)] transition group-hover:text-[var(--accent-soft)]" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-strong)]">
                    {site.contact.address}
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    {site.contact.region}
                  </p>
                </div>
                <ExternalLink className="ml-auto mt-1 h-4 w-4 shrink-0 text-[var(--muted-soft)] transition group-hover:text-[var(--accent-soft)]" />
              </div>
            </a>

            <a
              href={`mailto:${site.contact.email}`}
              className="flex items-center gap-3 rounded-[1.4rem] border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-4 py-4 transition hover:border-[rgba(247,208,163,0.34)] hover:bg-[rgba(239,130,57,0.06)]"
            >
              <Mail className="h-5 w-5 text-[var(--accent)]" />
              <span className="text-sm text-[var(--text-secondary)]">
                {site.contact.email}
              </span>
            </a>

            <div className="grid gap-3">
              <a
                href={`https://wa.me/${site.contact.mobile.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-[1.4rem] border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-4 py-4 transition hover:border-[rgba(37,211,102,0.34)] hover:bg-[rgba(37,211,102,0.08)]"
              >
                <FaWhatsapp className="h-5 w-5 text-[#25D366]" />
                <span className="text-sm text-[var(--text-secondary)]">
                  {site.contact.mobile}
                </span>
              </a>

              <a
                href={`https://wa.me/${site.contact.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-[1.4rem] border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-4 py-4 transition hover:border-[rgba(37,211,102,0.34)] hover:bg-[rgba(37,211,102,0.08)]"
              >
                <FaWhatsapp className="h-5 w-5 text-[#25D366]" />
                <span className="text-sm text-[var(--text-secondary)]">
                  {site.contact.phone}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-5 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {currentYear}{" "}
          <span className="font-display text-[var(--text-strong)]">
            {site.name}
          </span>
          . {site.footer.rights}
        </p>

        <p className="text-[var(--muted-soft)]">{site.tagline}</p>
      </div>
    </>
  );
}
