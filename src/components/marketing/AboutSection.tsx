"use client";

import {
  Building,
  Clock,
  Globe,
  Layers,
  Shield,
  Users,
  Zap,
  Activity,
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
    <Section id="nosotros">
      <div className="mb-20 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
              {about.title}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl lg:leading-[1.1]">
              {about.subtitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              Desde 1993, combinamos innovación tecnológica, ingeniería experta y equipamiento de vanguardia para acelerar y proteger las operaciones críticas del sector energético e industrial.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] shadow-2xl shadow-[var(--accent)]/5">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent"></div>
            <video
              className="pointer-events-none w-full select-none object-cover md:h-[400px]"
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
              onContextMenu={(e) => e.preventDefault()}
            >
              Tu navegador no soporta videos HTML5.
            </video>
          </div>
        </Reveal>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {about.highlights.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          return (
            <Reveal key={item.title} delay={0.1 + index * 0.05}>
              <div className="group relative flex h-full flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--surface)] hover:shadow-xl hover:shadow-[var(--accent)]/5 hover:border-[var(--accent)]/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-white">
                  {Icon ? <Icon className="h-6 w-6" /> : null}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[var(--text)]">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {item.description}
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
