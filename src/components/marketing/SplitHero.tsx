import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

      <Section className="pt-5 pb-6 md:pt-14 md:pb-8">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch">
          <div className="panel-shell h-full rounded-[1.65rem] px-4 py-5 md:px-6 md:py-6 lg:px-7">
            <Reveal>
              <Badge>{site.homeHero.badge}</Badge>
            </Reveal>

            <Reveal delay={0.04}>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="section-kicker">{site.name}</span>
                <span className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-normal text-[var(--muted)] md:tracking-[0.22em]">
                  {site.company.legalName}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-4 max-w-3xl text-[2.25rem] font-semibold leading-[0.98] text-[var(--text-strong)] md:text-[4.35rem] md:leading-[0.92]">
                Infraestructura y software para decisiones críticas.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-7 text-[var(--text-secondary)] md:text-[1.05rem] md:leading-8">
                {site.tagline}. Diseñamos operaciones más observables, resilientes y rápidas para compañías que no pueden frenar.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                {site.homeHero.description}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="/contacto" size="lg" className="w-full sm:w-auto">
                  Hablar con LYNX
                </Button>
                <Button href="/recursos" size="lg" variant="outline" className="w-full sm:w-auto">
                  Ver casos reales
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {heroSignals.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1rem] border border-[var(--border)] bg-white/[0.03] px-3.5 py-3 md:px-4"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-normal text-[var(--muted-soft)] md:tracking-[0.18em]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-[0.92rem] font-medium leading-5 text-[var(--text-secondary)]">
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

          <div className="grid h-full gap-3 md:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
            {site.homeCards.map((card, index) => (
              <Reveal key={card.href} delay={0.1 + index * 0.06}>
                <Link
                  href={card.href}
                  aria-label={`${card.cta}: ${card.title}`}
                  className="panel-shell group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.4rem] p-3 transition duration-300 ease-out-expo hover:-translate-y-1 hover:border-[rgba(255,194,131,0.34)] hover:shadow-[0_24px_70px_rgba(3,8,20,0.48),0_0_0_1px_rgba(255,194,131,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] active:translate-y-0 md:p-3.5"
                >
                  <span className="panel-decoration pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,194,131,0.34)] to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                  <div className="relative overflow-hidden rounded-[1.05rem] border border-white/6 transition duration-300 group-hover:border-[rgba(255,194,131,0.22)]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={720}
                      height={620}
                      priority={index === 0}
                      className="h-[162px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[200px] lg:h-[184px] xl:h-[198px]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.02)_0%,rgba(4,8,16,0.1)_30%,rgba(4,8,16,0.84)_100%)]" />
                    <div className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/35 px-3 py-2 text-[10px] font-semibold uppercase tracking-normal text-[var(--text-strong)] opacity-0 shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-md transition duration-300 group-hover:opacity-100 md:tracking-[0.18em]">
                      Abrir
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="mt-3 flex flex-1 flex-col">
                    <div className="flex items-center justify-between gap-4">
                      <span className="section-kicker text-[var(--accent-soft)]">
                        {card.label}
                      </span>
                      <span className="text-[10px] uppercase tracking-normal text-[var(--muted-soft)] md:tracking-[0.18em]">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-[1.28rem] font-semibold leading-[1.04] text-[var(--text-strong)] md:text-[1.55rem] md:leading-[0.98]">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-7 text-[var(--muted)]">
                      {card.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3 rounded-full border border-[rgba(255,194,131,0.18)] bg-[rgba(255,122,26,0.08)] px-3.5 py-2.5 text-[10px] font-semibold uppercase tracking-normal text-[var(--accent-soft)] transition duration-300 group-hover:border-[rgba(255,194,131,0.34)] group-hover:bg-[rgba(255,122,26,0.14)] group-hover:text-[var(--text-strong)] md:tracking-[0.2em]">
                      <span>{card.cta}</span>
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent-soft),var(--accent))] text-[#07101f] shadow-[0_10px_26px_rgba(255,122,26,0.22)] transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <Reveal delay={0.2}>
            <div className="panel-shell rounded-[1.4rem] px-4 py-[1.125rem] md:px-5">
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
            <div className="panel-shell rounded-[1.4rem] px-4 py-[1.125rem] md:px-5">
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
