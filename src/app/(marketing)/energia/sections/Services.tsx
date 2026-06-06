"use client";

import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { energia } from "@/content/energia";
import {
  Activity,
  Lock,
  Monitor,
  Radio,
  ShieldCheck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  activity: Activity,
  zap: Zap,
  monitor: Monitor,
  shield: ShieldCheck,
  radio: Radio,
  lock: Lock,
  wrench: Wrench,
};

export default function EnergiaServices() {
  return (
    <Section id="servicios">
      <div className="relative mb-7 text-left md:mb-8 md:text-center">
        <Reveal>
          <span className="section-kicker">Servicios</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="section-heading mt-4">
            {energia.sections.servicesTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="section-copy mt-4 md:mx-auto">
            {energia.sections.servicesSubtitle}
          </p>
        </Reveal>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3">
        {energia.services.map((service, index) => {
          const Icon = icons[service.icon as string] || Zap;

          return (
            <Reveal key={service.title} delay={index * 0.05}>
              <div className="panel-shell group h-full rounded-[1.1rem] p-3.5 transition duration-300 hover:-translate-y-0.5 sm:rounded-[1.35rem] sm:p-[1.125rem]">
                <div className="mb-3 flex items-center justify-between gap-4 sm:mb-4">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-[0.8rem] border border-[rgba(255,194,131,0.18)] bg-[rgba(255,122,26,0.08)] text-[var(--accent)] transition-all duration-300 group-hover:scale-105 sm:h-10 sm:w-10 sm:rounded-[0.9rem]">
                    <Icon className="h-5 w-5" />
                  </div>
                <span className="text-[10px] uppercase tracking-normal text-[var(--muted-soft)] sm:text-[11px] md:tracking-[0.24em]">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-[1rem] font-semibold leading-[1.08] text-[var(--text-strong)] sm:text-[1.2rem] sm:leading-[1.04]">
                  {service.title}
                </h3>
                <p className="mt-2.5 hidden text-sm leading-7 text-[var(--muted)] sm:block">
                  {service.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
