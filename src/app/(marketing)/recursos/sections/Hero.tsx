import Image from "next/image";
import Badge from "@/components/ui/Badge";
import EnergyFlow from "@/components/ui/EnergyFlow";
import Reveal from "@/components/motion/Reveal";
import SuccessNetwork from "@/components/marketing/SuccessNetwork";
import { recursos } from "@/content/recursos";

export default function RecursosHero() {
  return (
    <section className="relative isolate -mt-16 overflow-hidden border-b border-white/8 md:-mt-[78px]">
      <Image
        src="/images/recursos/hero-recursos-lynx.webp"
        alt="Ingenieria y control de infraestructura electrica critica"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,7,15,0.1)_0%,rgba(3,7,15,0.24)_48%,rgba(3,7,15,0.8)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,7,15,0.72)_0%,rgba(3,7,15,0.34)_44%,rgba(3,7,15,0.1)_78%,rgba(3,7,15,0.2)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_18%,rgba(239,130,57,0.14),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(89,89,201,0.08),transparent_18%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      <SuccessNetwork className="right-[9%] top-[48%] w-[37%] max-w-[470px] xl:right-[11%] xl:w-[35%]" />

      <div className="mx-auto flex min-h-[560px] w-full max-w-[1320px] flex-col justify-center px-4 py-16 sm:px-6 md:min-h-[740px] md:px-8 md:py-20">
        <div className="relative z-10 max-w-4xl">
          <Reveal>
            <Badge>{recursos.hero.badge}</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 max-w-4xl text-[2.05rem] font-semibold leading-[1.02] text-white [text-shadow:0_10px_28px_rgba(0,0,0,0.38)] md:mt-5 md:text-[3.9rem] md:leading-[0.92] lg:text-[4.35rem]">
              {recursos.hero.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-7 text-white/84 md:mt-5 md:text-[1.08rem] md:leading-8">
              {recursos.hero.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="relative z-10 mt-14 md:mt-20">
          <EnergyFlow className="h-10 opacity-90" />
        </div>
      </div>
    </section>
  );
}
