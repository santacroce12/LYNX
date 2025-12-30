import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import EnergyFlow from "@/components/ui/EnergyFlow";
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
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-6 text-sm text-[var(--muted)]">
              <p>{site.contact.email}</p>
              <p>{site.contact.mobile}</p>
              <p>{site.contact.phone}</p>
              <p>{site.contact.address}</p>
              <p>{site.contact.region}</p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
