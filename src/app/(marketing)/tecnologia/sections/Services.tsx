"use client";

import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { tecnologia } from "@/content/tecnologia";
import {
  Users,
  Truck,
  ClipboardCheck,
  Code,
  Layers,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  users: Users,
  truck: Truck,
  "clipboard-check": ClipboardCheck,
  code: Code,
  layers: Layers,
  "life-buoy": LifeBuoy,
};

export default function TecnologiaServices() {
  return (
    <Section id="servicios">
      <div className="relative mb-7 text-center md:mb-8">
        <Reveal>
          <span className="section-kicker">Servicios</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="section-heading mt-4">
            {tecnologia.sections.servicesTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="section-copy mx-auto mt-4">
            {tecnologia.sections.servicesSubtitle}
          </p>
        </Reveal>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {tecnologia.services.map((service, index) => {
          const Icon = icons[service.icon as string] || Layers;

          return (
            <Reveal key={service.title} delay={index * 0.05}>
              <div className="panel-shell group h-full rounded-[1.35rem] p-[1.125rem] transition duration-300 hover:-translate-y-0.5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-[0.9rem] border border-[rgba(125,168,255,0.2)] bg-[rgba(125,168,255,0.08)] text-[var(--accent-cool)] transition-all duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted-soft)]">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-[1.2rem] font-semibold leading-[1.04] text-[var(--text-strong)]">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-[var(--muted)]">
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
