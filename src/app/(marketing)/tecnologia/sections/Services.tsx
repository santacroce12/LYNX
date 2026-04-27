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
      <div className="relative mb-7 grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <Reveal>
            <span className="section-kicker">Servicios</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="section-heading mt-4">
              {tecnologia.sections.servicesTitle}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.14}>
          <p className="section-copy lg:justify-self-end">
            {tecnologia.sections.servicesSubtitle}
          </p>
        </Reveal>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <div className="panel-shell overflow-hidden rounded-[1.55rem] p-2.5">
            <div className="relative aspect-video min-h-[280px] overflow-hidden rounded-[1.15rem] border border-white/8 px-5 py-5 md:min-h-[340px] lg:min-h-0">
              <Image
                src="/images/tecnologia/generated/integracion-servicios.png"
                alt="Arquitectura de integración tecnológica con soporte operativo"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center opacity-[0.78]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.08)_0%,rgba(4,8,16,0.32)_36%,rgba(4,8,16,0.9)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(125,168,255,0.18),transparent_24%)]" />

              <div className="relative z-10 flex h-full flex-col justify-end">
                <span className="section-kicker text-[var(--accent-cool)]">
                  Punta a punta
                </span>
                <h3 className="mt-4 max-w-sm text-[1.65rem] font-semibold leading-[1] text-[var(--text-strong)]">
                  Arquitectura de integración tecnológica con soporte operativo.
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
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
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/78 backdrop-blur-md"
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

        <div className="grid gap-3 sm:grid-cols-2">
          {tecnologia.services.map((service, index) => {
            const Icon = icons[service.icon as string] || Layers;

            return (
              <Reveal key={service.title} delay={index * 0.04}>
                <article className="panel-shell group h-full rounded-[1.25rem] p-4 transition duration-300 hover:-translate-y-0.5">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-[0.85rem] border border-[rgba(125,168,255,0.2)] bg-[rgba(125,168,255,0.08)] text-[var(--accent-cool)] transition-all duration-300 group-hover:scale-105">
                      <Icon className="h-[18px] w-[18px]" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted-soft)]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-[1.05rem] font-semibold leading-[1.08] text-[var(--text-strong)]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {service.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
