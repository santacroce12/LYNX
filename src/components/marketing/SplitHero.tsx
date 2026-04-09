import Image from "next/image";
import Link from "next/link";
import Section from "@/components/layout/Section";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import EnergyFlow from "@/components/ui/EnergyFlow";
import { site } from "@/content/site";

const heroSignals = [
  { label: "Cobertura", value: site.contact.region },
  { label: "Especialidad", value: "Energía + tecnología" },
  { label: "Enfoque", value: "Continuidad operativa" },
];

export default function SplitHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-accent opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 bg-radial-accent-2 opacity-55" aria-hidden="true" />

      <Section className="pt-10 pb-6 md:pt-14 md:pb-8">
        <div className="grid gap-4 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
          <div className="panel-shell rounded-[1.65rem] px-5 py-5 md:px-6 md:py-6 lg:px-7">
            <Reveal>
              <Badge>{site.homeHero.badge}</Badge>
            </Reveal>

            <Reveal delay={0.04}>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="section-kicker">{site.name}</span>
                <span className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  {site.company.legalName}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-4 max-w-3xl text-[2.9rem] font-semibold leading-[0.92] text-[var(--text-strong)] md:text-[4.35rem]">
                Infraestructura y software para decisiones críticas.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)] md:text-[1.05rem] md:leading-8">
                {site.tagline}. Diseñamos operaciones más observables, resilientes y rápidas para compañías que no pueden frenar.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                {site.homeHero.description}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href="/contacto" size="lg">
                  Hablar con LYNX
                </Button>
                <Button href="/recursos" size="lg" variant="outline">
                  Ver casos reales
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {heroSignals.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.1rem] border border-[var(--border)] bg-white/[0.03] px-4 py-3"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-[var(--text-secondary)]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-5 hidden sm:block">
                <EnergyFlow className="opacity-70" />
              </div>
            </Reveal>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-1">
            {site.homeCards.map((card, index) => (
              <Reveal key={card.href} delay={0.1 + index * 0.06}>
                <Link
                  href={card.href}
                  className="panel-shell group block overflow-hidden rounded-[1.4rem] p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(255,194,131,0.24)]"
                >
                  <div className="relative overflow-hidden rounded-[1.05rem] border border-white/6">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={720}
                      height={620}
                      priority={index === 0}
                      className="h-[190px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[200px]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.02)_0%,rgba(4,8,16,0.1)_30%,rgba(4,8,16,0.84)_100%)]" />
                  </div>

                  <div className="mt-3 space-y-2.5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="section-kicker text-[var(--accent-soft)]">
                        {card.label}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-[1.55rem] font-semibold leading-[0.98] text-[var(--text-strong)]">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-7 text-[var(--muted)]">
                      {card.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-soft)]">
                      <span className="h-px w-7 bg-[var(--accent)]/60" />
                      {card.cta}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <Reveal delay={0.2}>
            <div className="panel-shell rounded-[1.4rem] px-5 py-[1.125rem]">
              <p className="section-kicker">Operación</p>
              <h3 className="mt-3 text-[1.5rem] font-semibold leading-[1] text-[var(--text-strong)]">
                Desde el diseño hasta la puesta en marcha.
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Arquitectura, integración, visualización, automatización y soporte para activos que no admiten improvisación.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="panel-shell rounded-[1.4rem] px-5 py-[1.125rem]">
              <div className="mb-4 flex items-center justify-between">
                <span className="section-kicker text-[var(--accent-cool)]">
                  Señal
                </span>
                <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[var(--accent)] shadow-[0_0_10px_rgba(255,122,26,0.55)]" />
              </div>

              <div className="space-y-3">
                <div className="h-2 rounded-full bg-white/8">
                  <div className="h-2 w-[82%] rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-soft))]" />
                </div>
                <div className="h-2 rounded-full bg-white/8">
                  <div className="h-2 w-[64%] rounded-full bg-[linear-gradient(90deg,var(--accent-cool),rgba(125,168,255,0.35))]" />
                </div>
                <div className="h-2 rounded-full bg-white/8">
                  <div className="h-2 w-[74%] rounded-full bg-[linear-gradient(90deg,var(--accent),rgba(255,122,26,0.24))]" />
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                Observabilidad, capas de protección y despliegues con criterio operativo, no sólo técnico.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </section>
  );
}
