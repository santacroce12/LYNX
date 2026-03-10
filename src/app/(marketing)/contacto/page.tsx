import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import EnergyFlow from "@/components/ui/EnergyFlow";
import LocationMap from "@/components/ui/LocationMap";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import ContactForm from "./ContactForm";

export const metadata = buildMetadata({
  title: site.contactPage.title,
  description: site.contactPage.description,
  path: "/contacto",
});

export default function ContactPage() {
  return (
    <Section className="pt-24">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div className="space-y-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
              {site.contactPage.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-4xl font-semibold md:text-5xl">
              {site.contactPage.heading}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm text-[var(--muted)] md:text-base">
              {site.contactPage.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <EnergyFlow className="opacity-80" />
          </Reveal>
          <Reveal delay={0.2}>
            {/* Agregué 'flex flex-col gap-2' para que queden mejor separados visualmente */}
            <div className="flex flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-6 text-sm text-[var(--muted)]">
              <p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  {site.contact.email}
                </a>
              </p>
              <p>
                <a
                  // El replace(/\D/g, '') limpia el string para que solo queden los números de Chile
                  href={`https://wa.me/${site.contact.mobile.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  {site.contact.mobile}
                </a>
              </p>
              <p>
                <a
                  href={`https://wa.me/${site.contact.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  {site.contact.phone}
                </a>
              </p>

              <div className="mt-2 border-t border-[var(--border)] pt-2">
                <p>{site.contact.address}</p>
                <p>{site.contact.region}</p>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
      <div className="mt-10">
        <LocationMap />
      </div>
    </Section>
  );
}
