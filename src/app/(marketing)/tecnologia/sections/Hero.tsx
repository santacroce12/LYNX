import Image from "next/image";
import Section from "@/components/layout/Section";
import Badge from "@/components/ui/Badge";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import TechCircuit from "@/components/marketing/TechCircuit";
import Reveal from "@/components/motion/Reveal";
import { tecnologia } from "@/content/tecnologia";

export default function TecnologiaHero() {
  return (
    <Section className="pt-24">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/70 px-8 py-12 md:min-h-[400px] md:px-10 lg:px-12">
        <Image
          src={tecnologia.hero.image}
          alt={tecnologia.hero.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/80 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 bg-radial-accent opacity-50"
          aria-hidden="true"
        />
        <TechCircuit />
        <div className="relative z-10 max-w-3xl md:max-w-[54%]">
          <Reveal>
            <Badge>{tecnologia.hero.badge}</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">
              {tecnologia.hero.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-base text-[var(--muted)] md:text-lg">
              {tecnologia.hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {tecnologia.hero.claim}
            </p>
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
