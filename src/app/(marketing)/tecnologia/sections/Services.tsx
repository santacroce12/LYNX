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
      <div className="relative mb-12 text-center md:mb-20">
        <Reveal>
          <h2 className="text-3xl font-bold md:text-5xl">
            {tecnologia.sections.servicesTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">
            {tecnologia.sections.servicesSubtitle}
          </p>
        </Reveal>
      </div>
      <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tecnologia.services.map((service, index) => {
          const Icon = icons[service.icon as string] || Layers;
          return (
            <Reveal key={service.title} delay={index * 0.05}>
              {/* ANIMACIÓN PREMIUM APLICADA AQUÍ */}
              <div className="group relative h-full cursor-pointer overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/40 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[var(--accent)]/40 hover:bg-[var(--surface)] hover:shadow-2xl hover:shadow-[var(--accent)]/10">
                {/* Fondo degradado sutil al pasar el mouse */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent to-[var(--accent)]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[var(--accent)]/30">
                  <Icon className="h-7 w-7 transition-transform duration-500 group-hover:rotate-3" />
                </div>
                <div className="relative">
                  <h3 className="mb-3 text-xl font-bold text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                    {service.title}
                  </h3>
                  <p className="leading-relaxed text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--text-secondary)]">
                    {service.description}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
