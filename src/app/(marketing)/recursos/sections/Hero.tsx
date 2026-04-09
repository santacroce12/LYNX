import Image from "next/image";
import Section from "@/components/layout/Section";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/motion/Reveal";
import EnergyFlow from "@/components/ui/EnergyFlow";
import { recursos } from "@/content/recursos";

export default function RecursosHero() {
  return (
    <Section className="pt-16 pb-6 md:pt-20 md:pb-8">
      <div className="panel-shell overflow-hidden rounded-[2.1rem] p-3 md:p-4">
        <div className="relative overflow-hidden rounded-[1.7rem] border border-white/8 px-6 pb-20 pt-6 md:min-h-[420px] md:px-8 md:pb-24 md:pt-8">
          <Image
            src="/images/energia/panel%20solar.jpg"
            alt="Paneles solares en operación"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,15,0.72)_0%,rgba(3,7,15,0.82)_34%,rgba(3,7,15,0.94)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,15,0.8)_0%,rgba(3,7,15,0.56)_40%,rgba(3,7,15,0.7)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,122,26,0.1),transparent_24%),radial-gradient(circle_at_82%_16%,rgba(125,168,255,0.08),transparent_18%)]" />

          <div className="relative z-10 max-w-3xl">
            <Reveal>
              <Badge>{recursos.hero.badge}</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.92] text-white [text-shadow:0_10px_28px_rgba(0,0,0,0.38)] md:text-[3.7rem] lg:text-[4rem]">
                {recursos.hero.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/84 md:text-lg">
                {recursos.hero.subtitle}
              </p>
            </Reveal>
          </div>

          <div className="absolute inset-x-6 bottom-6 z-10 md:inset-x-8">
            <Reveal delay={0.15}>
              <EnergyFlow className="h-10 opacity-90" />
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
