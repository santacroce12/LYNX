import Footer from "@/components/layout/Footer";
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
    <>
      <Section className="pt-12 md:pt-16">
        <div className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
          <div className="panel-shell rounded-[2rem] p-5 md:p-6">
            <div className="space-y-5">
              <Reveal>
                <span className="section-kicker">{site.contactPage.eyebrow}</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="section-heading max-w-xl">
                  {site.contactPage.heading}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-xl text-base leading-8 text-[var(--text)]/82 md:text-lg">
                  {site.contactPage.subtitle}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <EnergyFlow className="hidden max-w-md opacity-75 md:block" />
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="rounded-[1.3rem] border border-[var(--border)] bg-white/[0.03] p-4 transition hover:border-[rgba(255,194,131,0.34)] hover:bg-[rgba(255,122,26,0.05)]"
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted-soft)]">
                    Email
                  </p>
                  <p className="mt-3 text-base text-[var(--text-secondary)]">
                    {site.contact.email}
                  </p>
                </a>

                <a
                  href={`https://wa.me/${site.contact.mobile.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[1.3rem] border border-[var(--border)] bg-white/[0.03] p-4 transition hover:border-[rgba(255,194,131,0.34)] hover:bg-[rgba(255,122,26,0.05)]"
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted-soft)]">
                    WhatsApp
                  </p>
                  <p className="mt-3 text-base text-[var(--text-secondary)]">
                    {site.contact.mobile}
                  </p>
                </a>

                <div className="rounded-[1.3rem] border border-[var(--border)] bg-white/[0.03] p-4 sm:col-span-2">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted-soft)]">
                    Presencia
                  </p>
                  <p className="mt-3 text-base text-[var(--text-secondary)]">
                    {site.contact.address}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {site.contact.region}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>

        <div className="mt-8">
          <LocationMap />
        </div>
      </Section>
      <Footer />
    </>
  );
}
