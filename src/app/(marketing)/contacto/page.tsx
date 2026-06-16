import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import EnergyFlow from "@/components/ui/EnergyFlow";
import LocationMap from "@/components/ui/LocationMap";
import TubesBackground from "@/components/ui/neon-flow";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata = buildMetadata({
  title: site.contactPage.title,
  description: site.contactPage.description,
  path: "/contacto",
});

export default function ContactPage() {
  const contactMethods = [
    {
      label: "Correo",
      value: site.contact.email,
      href: `mailto:${site.contact.email}`,
      icon: Mail,
      accent: "text-[var(--accent-soft)]",
      border: "hover:border-[rgba(247,208,163,0.28)]",
    },
    {
      label: "WhatsApp principal",
      value: site.contact.mobile,
      href: `https://wa.me/${site.contact.mobile.replace(/\D/g, "")}`,
      icon: MessageCircle,
      accent: "text-[var(--accent-cool)]",
      border: "hover:border-[rgba(89,89,201,0.28)]",
    },
    {
      label: "WhatsApp alternativo",
      value: site.contact.phone,
      href: `https://wa.me/${site.contact.phone.replace(/\D/g, "")}`,
      icon: MessageCircle,
      accent: "text-[var(--accent-cool)]",
      border: "hover:border-[rgba(89,89,201,0.28)]",
    },
  ];

  return (
    <TubesBackground
      className="isolate min-h-0"
      canvasClassName="pointer-events-none opacity-[0.32]"
      fixedCanvas
      intensity="low"
    >
      <Section className="overflow-hidden pt-2 md:pt-5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_18%_26%,rgba(89,89,201,0.045),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(239,130,57,0.035),transparent_30%)] [mask-image:linear-gradient(180deg,#000_0%,transparent_100%)]" />

        <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="flex min-h-[680px] flex-col justify-between">
            <div>
              <Reveal>
                <span className="section-kicker text-[var(--accent-cool)]">
                  {site.contactPage.eyebrow}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-4 max-w-xl text-[2.25rem] font-semibold leading-[0.98] text-[var(--text-strong)] md:text-[4rem]">
                  {site.contactPage.heading}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-xl text-[0.98rem] leading-8 text-[var(--text)]/78 md:text-[1.08rem]">
                  {site.contactPage.subtitle}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 max-w-[34rem]">
                  <EnergyFlow variant="tech" className="opacity-65" />
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {contactMethods.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("https://") ? "_blank" : undefined}
                        rel={
                          item.href.startsWith("https://")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className={`group flex items-start gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.025] px-4 py-4 transition ${item.border} hover:bg-white/[0.04]`}
                      >
                        <span
                          className={`mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] border border-white/10 bg-white/[0.03] ${item.accent}`}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                            {item.label}
                          </span>
                          <span className="mt-2 block break-words text-[1rem] text-[var(--text-secondary)] md:text-[1.02rem]">
                            {item.value}
                          </span>
                        </span>
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[var(--muted-soft)] transition group-hover:text-[var(--text-strong)]" />
                      </a>
                    );
                  })}
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-4 flex items-start gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.025] px-4 py-4">
                  <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] border border-white/10 bg-white/[0.03] text-[var(--accent-soft)]">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      Ubicacion
                    </p>
                    <p className="mt-2 text-[1rem] text-[var(--text-secondary)] md:text-[1.02rem]">
                      {site.contact.address}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {site.contact.region}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>

        <div className="mt-8 md:mt-10">
          <Reveal delay={0.16}>
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="section-kicker">Ubicacion</span>
                <h2 className="mt-3 text-[1.55rem] font-semibold leading-[1.04] text-[var(--text-strong)] md:text-[2.2rem]">
                  Donde operamos
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[var(--muted)] md:text-[0.98rem]">
                Mantenemos presencia operativa en Chile y Argentina, con base en Santiago.
              </p>
            </div>
          </Reveal>
          <LocationMap />
        </div>
      </Section>
      <Footer />
    </TubesBackground>
  );
}
