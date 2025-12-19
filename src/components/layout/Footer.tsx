import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-lg font-semibold">{site.name}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            {site.company.legalName}
          </p>
          <p className="text-sm text-[var(--muted)]">{site.tagline}</p>
          <p className="text-xs text-[var(--muted)]">{site.company.group}</p>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            {site.footer.navTitle}
          </p>
          <div className="flex flex-col gap-2 text-sm">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[var(--accent)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            {site.footer.contactTitle}
          </p>
          <div className="space-y-2 text-sm text-[var(--muted)]">
            <p>{site.contact.email}</p>
            <p>{site.contact.mobile}</p>
            <p>{site.contact.phone}</p>
            <p>{site.contact.address}</p>
            <p>{site.contact.region}</p>
          </div>
          <div className="flex gap-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            {site.contact.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-[var(--accent)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--border)] py-6 text-center text-xs text-[var(--muted)]">
        (c) {new Date().getFullYear()} {site.name}. {site.footer.rights}
      </div>
    </footer>
  );
}
