import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import EnergyFlow from "@/components/ui/EnergyFlow";
import LocationMap from "@/components/ui/LocationMap";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata = buildMetadata({
  title: site.contactPage.title,
  description: site.contactPage.description,
  path: "/contacto",
});

export default function ContactPage() {
  return (
    <>
      <Section className="overflow-hidden pt-6 md:pt-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_18%_26%,rgba(125,168,255,0.045),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(255,122,26,0.035),transparent_30%)] [mask-image:linear-gradient(180deg,#000_0%,transparent_100%)]" />

        <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
          <div className="panel-shell flex h-full min-h-[640px] flex-col justify-between rounded-[2rem] p-4 md:p-6 lg:min-h-[700px]">
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
                <p className="max-w-xl text-[0.95rem] leading-7 text-[var(--text)]/82 md:text-lg md:leading-8">
                  {site.contactPage.subtitle}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <EnergyFlow className="hidden max-w-md opacity-60 md:block" />
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="mt-8 grid auto-rows-fr gap-3 sm:grid-cols-2">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="group flex min-h-[132px] flex-col justify-between rounded-[1.3rem] border border-[var(--border)] bg-white/[0.035] p-4 transition hover:border-[rgba(255,194,131,0.26)] hover:bg-white/[0.055]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-normal text-[var(--muted-soft)] md:tracking-[0.24em]">
                      Email
                    </p>
                    <Mail className="h-4 w-4 text-[var(--accent-cool)]/80" />
                  </div>
                  <p className="mt-5 break-words text-base text-[var(--text-secondary)]">
                    {site.contact.email}
                  </p>
                </a>

                <a
                  href={`https://wa.me/${site.contact.mobile.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[132px] flex-col justify-between rounded-[1.3rem] border border-[var(--border)] bg-white/[0.035] p-4 transition hover:border-[rgba(255,194,131,0.26)] hover:bg-white/[0.055]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-normal text-[var(--muted-soft)] md:tracking-[0.24em]">
                      WhatsApp
                    </p>
                    <MessageCircle className="h-4 w-4 text-[var(--accent-cool)]/80" />
                  </div>
                  <p className="mt-5 text-base text-[var(--text-secondary)]">
                    {site.contact.mobile}
                  </p>
                </a>

                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="group flex min-h-[132px] flex-col justify-between rounded-[1.3rem] border border-[var(--border)] bg-white/[0.035] p-4 transition hover:border-[rgba(255,194,131,0.26)] hover:bg-white/[0.055]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-normal text-[var(--muted-soft)] md:tracking-[0.24em]">
                      Teléfono
                    </p>
                    <Phone className="h-4 w-4 text-[var(--accent-cool)]/80" />
                  </div>
                  <p className="mt-5 text-base text-[var(--text-secondary)]">
                    {site.contact.phone}
                  </p>
                </a>

                <div className="flex min-h-[132px] flex-col justify-between rounded-[1.3rem] border border-[var(--border)] bg-white/[0.035] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-normal text-[var(--muted-soft)] md:tracking-[0.24em]">
                      Presencia
                    </p>
                    <MapPin className="h-4 w-4 text-[var(--accent-cool)]/80" />
                  </div>
                  <div className="mt-5">
                    <p className="text-base text-[var(--text-secondary)]">
                      {site.contact.address}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {site.contact.region}
                    </p>
                  </div>
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
