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
    <Section className="pt-12 md:pt-16">
      <div className="panel-shell overflow-hidden rounded-[2rem] p-3 md:p-4">
        <div className="relative overflow-hidden rounded-[1.65rem] border border-white/8 px-5 pb-20 pt-6 md:min-h-[430px] md:px-8 md:pb-24 md:pt-8">
          <Image
            src={tecnologia.hero.image}
            alt={tecnologia.hero.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-68"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,15,0.46)_0%,rgba(3,7,15,0.58)_34%,rgba(3,7,15,0.8)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,15,0.68)_0%,rgba(3,7,15,0.34)_42%,rgba(3,7,15,0.52)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(125,168,255,0.14),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(255,122,26,0.08),transparent_16%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_0%,transparent_34%,transparent_100%)]" />
          <TechSignal />

          <div className="relative z-10 max-w-3xl">
            <Reveal>
              <Badge>{tecnologia.hero.badge}</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 max-w-3xl text-[2.85rem] font-semibold leading-[0.92] text-white [text-shadow:0_10px_28px_rgba(0,0,0,0.38)] md:text-[3.7rem] lg:text-[4rem]">
                {tecnologia.hero.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/84 md:text-[1.08rem]">
                {tecnologia.hero.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68">
                {tecnologia.hero.claim}
              </p>
            </Reveal>
          </div>

          <div className="absolute inset-x-5 bottom-6 z-10 md:inset-x-8">
            <EnergyFlow className="h-10 opacity-90" />
          </div>
        </div>
      </div>

      <div className="mt-8">
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
