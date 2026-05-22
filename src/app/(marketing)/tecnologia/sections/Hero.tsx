import Image from "next/image";
import Section from "@/components/layout/Section";
import Badge from "@/components/ui/Badge";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import TechSignal from "@/components/marketing/TechSignal";
import Reveal from "@/components/motion/Reveal";
import EnergyFlow from "@/components/ui/EnergyFlow";
import { tecnologia } from "@/content/tecnologia";

export default function TecnologiaHero() {
  return (
    <>
      <section className="relative isolate -mt-16 overflow-hidden border-b border-white/8 md:-mt-[78px]">
        <Image
          src={tecnologia.hero.image}
          alt={tecnologia.hero.title}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-68"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,7,15,0.34)_0%,rgba(3,7,15,0.56)_45%,rgba(3,7,15,0.9)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,7,15,0.82)_0%,rgba(3,7,15,0.5)_46%,rgba(3,7,15,0.62)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(125,168,255,0.12),transparent_26%),radial-gradient(circle_at_82%_22%,rgba(94,234,212,0.055),transparent_18%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent" />
        <TechSignal variant="tech" />

        <div className="mx-auto flex min-h-[560px] w-full max-w-[1320px] flex-col justify-center px-4 py-16 sm:px-6 md:min-h-[740px] md:px-8 md:py-20">
          <div className="relative z-10 max-w-4xl">
            <Reveal>
              <Badge>{tecnologia.hero.badge}</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 max-w-4xl text-[2.05rem] font-semibold leading-[1.02] text-white [text-shadow:0_10px_28px_rgba(0,0,0,0.38)] md:mt-5 md:text-[3.9rem] md:leading-[0.92] lg:text-[4.35rem]">
                {tecnologia.hero.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-7 text-white/84 md:mt-5 md:text-[1.08rem] md:leading-8">
                {tecnologia.hero.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68 md:mt-5">
                {tecnologia.hero.claim}
              </p>
            </Reveal>
          </div>

          <div className="relative z-10 mt-14 md:mt-20">
            <EnergyFlow variant="tech" className="h-10 opacity-55" />
          </div>
        </div>
      </section>

      <Section className="pt-8">
        <FeatureGrid
          title={tecnologia.sections.featuresTitle}
          subtitle={tecnologia.sections.featuresSubtitle}
          items={tecnologia.features}
          columns={3}
        />
      </Section>
    </>
  );
}
