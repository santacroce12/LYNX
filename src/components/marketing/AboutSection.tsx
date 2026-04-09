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
            <p className="max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              Desde 1993 conectamos ingeniería, automatización y software para
              que las operaciones energéticas e industriales ganen velocidad,
              visibilidad y control.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="section-copy">
              No vendemos piezas sueltas: diseñamos soluciones completas,
              integrando hardware crítico, supervisión, datos y ejecución en
              terreno con una lógica de continuidad operativa.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <div className="panel-shell overflow-hidden rounded-[1.8rem] p-3 md:p-4">
            <div className="relative overflow-hidden rounded-[1.35rem] border border-white/8">
              <video
                className="pointer-events-none h-[300px] w-full select-none object-cover md:h-[380px]"
                src="/images/brand/about.mp4"
                poster={about.cover.image}
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                controls={false}
                controlsList="nodownload nofullscreen noremoteplayback"
                aria-label={about.cover.alt}
                onContextMenu={(event) => event.preventDefault()}
              >
                Tu navegador no soporta videos HTML5.
              </video>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.04)_0%,rgba(4,8,16,0.24)_34%,rgba(4,8,16,0.86)_100%)]" />

              <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-4 px-5 py-5 md:px-6 md:py-6">
                <div>
                  <p className="section-kicker">Capacidad instalada</p>
                  <h3 className="mt-3 max-w-sm text-2xl font-semibold leading-[1.02] text-[var(--text-strong)]">
                    Ingeniería aplicada para sistemas donde fallar no es opción.
                  </h3>
                </div>

                <div className="rounded-[1.35rem] border border-[rgba(255,194,131,0.2)] bg-black/25 px-4 py-3 backdrop-blur-md">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted-soft)]">
                    Operación
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Chile + Argentina
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {about.highlights.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];

          return (
            <Reveal key={item.title} delay={0.08 + index * 0.04}>
              <div className="panel-shell group h-full rounded-[1.45rem] p-5 transition duration-300 hover:-translate-y-0.5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(255,194,131,0.18)] bg-[rgba(255,122,26,0.08)] text-[var(--accent)] transition duration-500 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-[var(--bg)]">
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted-soft)]">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-[1.4rem] font-semibold leading-[1.02] text-[var(--text-strong)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
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
