import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
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
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.76fr_0.96fr]">
        <div className="space-y-6">
          <span className="section-kicker">Infraestructura crítica</span>

          <div className="space-y-5">
            <div className="inline-flex rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3">
              <Link href="/" className="inline-flex">
                <Image
                  src="/images/brand/logo-azul.png"
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
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white/[0.04] text-[var(--muted)] transition hover:-translate-y-0.5 hover:border-[rgba(255,194,131,0.34)] hover:bg-[rgba(255,122,26,0.06)] hover:text-[var(--accent-soft)]"
                    aria-label={social.label}
                  >
                    {getSocialIcon(social.label)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="section-kicker">{site.footer.navTitle}</h3>

          <div className="grid gap-2">
            {site.nav.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center justify-between rounded-[1.15rem] border border-transparent bg-white/[0.01] px-4 py-3 text-base text-[var(--muted)] transition hover:border-white/8 hover:bg-white/[0.03] hover:text-[var(--text-strong)]"
              >
                <span>{item.label}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-soft)] transition group-hover:text-[var(--accent-soft)]">
                  0{index + 1}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="section-kicker">{site.footer.contactTitle}</h3>

          <div className="grid gap-3">
            <div className="rounded-[1.4rem] border border-[var(--border)] bg-[rgba(255,255,255,0.03)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-semibold text-[var(--text-strong)]">
                    {site.contact.address}
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    {site.contact.region}
                  </p>
                </div>
              </div>
            </div>

            <a
              href={`mailto:${site.contact.email}`}
              className="flex items-center gap-3 rounded-[1.4rem] border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-4 py-4 transition hover:border-[rgba(255,194,131,0.34)] hover:bg-[rgba(255,122,26,0.06)]"
            >
              <Mail className="h-5 w-5 text-[var(--accent)]" />
              <span className="text-sm text-[var(--text-secondary)]">
                {site.contact.email}
              </span>
            </a>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={`tel:${site.contact.mobile.replace(/\s/g, "")}`}
                className="flex items-center gap-3 rounded-[1.4rem] border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-4 py-4 transition hover:border-[rgba(255,194,131,0.34)] hover:bg-[rgba(255,122,26,0.06)]"
              >
                <Phone className="h-5 w-5 text-[var(--accent)]" />
                <span className="text-sm text-[var(--text-secondary)]">
                  {site.contact.mobile}
                </span>
              </a>

              <a
                href={`https://wa.me/${site.contact.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-[1.4rem] border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-4 py-4 transition hover:border-[rgba(255,194,131,0.34)] hover:bg-[rgba(255,122,26,0.06)]"
              >
                <Phone className="h-5 w-5 text-[var(--accent)]" />
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
