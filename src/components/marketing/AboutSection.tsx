"use client";

import {
  Activity,
  Building,
  Clock,
  Globe,
  Layers,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import GlobeBars from "@/components/ui/cobe-globe-bars";
import { site } from "@/content/site";

const iconMap = {
  layers: Layers,
  clock: Clock,
  building: Building,
  globe: Globe,
  users: Users,
  shield: Shield,
  zap: Zap,
  activity: Activity,
};

export default function AboutSection() {
  const { about } = site;

  return (
    <Section id="nosotros" className="pt-4">
      <div className="grid gap-6 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
        <div className="space-y-6">
          <Reveal>
            <span className="section-kicker">{about.title}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-heading max-w-xl">{about.subtitle}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-[0.95rem] leading-7 text-[var(--text-secondary)] md:text-lg md:leading-8">
              Desde 1993 conectamos ingeniería, automatización y software para
              operaciones energéticas e industriales.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="hidden section-copy md:block">
              Diseñamos, implementamos y mantenemos soluciones completas:
              hardware crítico, supervisión, datos y ejecución en terreno.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <div className="panel-shell overflow-hidden rounded-[1.8rem] p-3 md:p-4">
            <div className="relative overflow-hidden rounded-[1.35rem] border border-white/8 bg-[#030711]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(239,130,57,0.16),transparent_35%),radial-gradient(circle_at_18%_18%,rgba(247,208,163,0.08),transparent_24%),linear-gradient(180deg,rgba(13,6,37,0.2)_0%,rgba(7,3,24,0.9)_100%)]" />
              <div className="panel-decoration pointer-events-none absolute inset-0 panel-grid opacity-15 [mask-image:radial-gradient(circle_at_center,#000_24%,transparent_78%)]" />

              <div className="relative mx-auto flex min-h-[250px] max-w-[460px] items-center justify-center px-3 pb-2 pt-4 sm:min-h-[330px] sm:pt-6 md:min-h-[380px] md:px-6 md:pt-8">
                <GlobeBars className="w-full max-w-[300px] sm:max-w-[390px] md:max-w-[430px]" speed={0.0014} />
              </div>

              <div className="relative z-20 flex flex-wrap items-end justify-between gap-3 border-t border-white/8 bg-[rgba(7,3,24,0.96)] px-4 pb-4 pt-4 md:gap-4 md:px-6 md:pb-6">
                <div>
                  <p className="section-kicker">Cobertura regional</p>
                  <h3 className="mt-2 max-w-sm text-[1.05rem] font-semibold leading-[1.08] text-[var(--text-strong)] md:mt-3 md:text-2xl md:leading-[1.02]">
                    Presencia operativa en Chile y Argentina.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {about.highlights.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];

          return (
            <Reveal key={item.title} delay={0.08 + index * 0.04}>
              <div
                className={`panel-shell group h-full rounded-[1.1rem] p-3.5 transition duration-300 hover:-translate-y-0.5 sm:rounded-[1.45rem] sm:p-5 ${
                  index > 2 ? "hidden sm:block" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[0.9rem] border border-[rgba(247,208,163,0.18)] bg-[rgba(239,130,57,0.08)] text-[var(--accent)] transition duration-500 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-[var(--bg)] sm:h-12 sm:w-12 sm:rounded-2xl">
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </div>
                  <span className="text-[10px] uppercase tracking-normal text-[var(--muted-soft)] sm:text-[11px] sm:tracking-[0.24em]">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-3 text-[1rem] font-semibold leading-[1.08] text-[var(--text-strong)] sm:mt-5 md:text-[1.4rem] md:leading-[1.02]">
                  {item.title}
                </h3>
                <p className="mt-3 hidden text-sm leading-7 text-[var(--muted)] sm:block">
                  {item.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
