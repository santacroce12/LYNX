import Image from "next/image";
import Section from "@/components/layout/Section";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/motion/Reveal";
import EnergyFlow from "@/components/ui/EnergyFlow";
import { recursos } from "@/content/recursos";

export default function RecursosHero() {
  return (
    <Section className="pt-1 pb-8 md:pt-4 md:pb-2">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/70 px-8 py-12 md:min-h-[360px]">
        <Image
          src="/images/energia/panel%20solar.jpg"
          alt="Paneles solares en operación"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/80 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 bg-radial-accent opacity-40"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl">
          <Reveal>
            <Badge>{recursos.hero.badge}</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
              {recursos.hero.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-base text-[var(--muted)] md:text-lg">
              {recursos.hero.subtitle}
            </p>
          </Reveal>
        </div>
        <div className="relative z-10 mt-6 w-full">
          <Reveal delay={0.15}>
            <EnergyFlow className="opacity-80" />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
