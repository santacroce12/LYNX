"use client";

import Image from "next/image";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { tecnologia } from "@/content/tecnologia";
import {
  Truck,
  ClipboardCheck,
  Code,
  Layers,
  LifeBuoy,
  Network,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  truck: Truck,
  "clipboard-check": ClipboardCheck,
  code: Code,
  layers: Layers,
  network: Network,
  "life-buoy": LifeBuoy,
};

export default function TecnologiaServices() {
  return (
    <Section id="servicios">
      <div className="relative mx-auto mb-7 max-w-3xl text-left md:mb-8 md:text-center">
        <Reveal>
          <span className="section-kicker">Servicios</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="section-heading mx-auto mt-4 max-w-2xl">
            {tecnologia.sections.servicesTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="section-copy mx-auto mt-4">
            {tecnologia.sections.servicesSubtitle}
          </p>
        </Reveal>
      </div>

      <Reveal>
        <div className="panel-shell mb-4 overflow-hidden rounded-[1.55rem] p-2.5">
          <div className="relative min-h-[260px] overflow-hidden rounded-[1.15rem] border border-white/8 px-4 py-4 md:min-h-[300px] md:px-6 md:py-6 lg:min-h-[320px]">
            <Image
              src="/images/tecnologia/generated/integracion-servicios.optimized.webp"
              alt="Arquitectura de integración tecnológica con soporte operativo"
              fill
              sizes="(min-width: 1280px) 1120px, 100vw"
              className="object-cover object-center opacity-[0.78]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,16,0.92)_0%,rgba(4,8,16,0.72)_42%,rgba(4,8,16,0.38)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.08)_0%,rgba(4,8,16,0.2)_44%,rgba(4,8,16,0.74)_100%)]" />

            <div className="relative z-10 flex min-h-[228px] max-w-2xl flex-col justify-end md:min-h-[252px] lg:min-h-[268px]">
              <span className="section-kicker text-[var(--accent-cool)]">
                Punta a punta
              </span>
              <h3 className="mt-4 max-w-xl text-[1.35rem] font-semibold leading-[1.08] text-[var(--text-strong)] md:text-[1.85rem] md:leading-[1]">
                Arquitectura de integración tecnológica con soporte operativo.
              </h3>
              <div className="mt-5 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-3">
                {[
                  "Diseñar",
                  "Integrar",
                  "Implementar",
                  "Operar",
                  "Mantener",
                  "Evolucionar",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex min-h-9 min-w-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-normal text-white/78 backdrop-blur-md md:tracking-[0.18em]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(255,122,26,0.6)]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="grid auto-rows-fr gap-3 md:grid-cols-2 xl:grid-cols-3">
        {tecnologia.services.map((service, index) => {
          const Icon = icons[service.icon as string] || Layers;

          return (
            <Reveal key={service.title} delay={index * 0.04}>
              <article className="panel-shell group flex h-full min-h-[178px] min-w-0 flex-col rounded-[1.25rem] p-4 transition duration-300 hover:-translate-y-0.5 md:min-h-[188px] md:p-5">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.85rem] border border-[rgba(125,168,255,0.2)] bg-[rgba(125,168,255,0.08)] text-[var(--accent-cool)] transition-all duration-300 group-hover:scale-105">
                    <Icon className="h-[18px] w-[18px]" />
                  </div>
                  <span className="text-[10px] uppercase tracking-normal text-[var(--muted-soft)] md:tracking-[0.22em]">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="min-w-0 text-[1.05rem] font-semibold leading-[1.08] text-[var(--text-strong)] md:min-h-[2.3rem]">
                  {service.title}
                </h3>
                <p className="mt-2 min-w-0 text-sm leading-6 text-[var(--muted)]">
                  {service.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
