import Image from "next/image";
import Section from "@/components/layout/Section";
import Badge from "@/components/ui/Badge";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import Reveal from "@/components/motion/Reveal";
import EnergyFlow from "@/components/ui/EnergyFlow";
import { tecnologia } from "@/content/tecnologia";

export default function TecnologiaHero() {
  return (
    <Section className="pt-24">
      <div className="relative flex min-h-[320px] items-center overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/70 px-8 py-12 md:min-h-[400px]">
        <Image
          src="/images/tecnologia/tecnologia-abstracto.jpg"
          alt="Conexiones digitales abstractas"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/80 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 bg-radial-accent opacity-50"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl">
          <Reveal>
            <Badge>{tecnologia.hero.badge}</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
              {tecnologia.hero.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-base text-[var(--muted)] md:text-lg">
              {tecnologia.hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-3 text-sm text-[var(--muted)]">
              {tecnologia.hero.claim}
            </p>
          </Reveal>
        </div>
        <div className="relative z-10 mt-6 w-full">
          <Reveal delay={0.2}>
            <EnergyFlow className="opacity-80" />
          </Reveal>
        </div>
      </div>
      <div className="mt-12">
        <FeatureGrid
          title={tecnologia.sections.featuresTitle}
          subtitle={tecnologia.sections.featuresSubtitle}
          items={tecnologia.features}
          columns={3}
        />
      </div>
    </Section>
  );
}
