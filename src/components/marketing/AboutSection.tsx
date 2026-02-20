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
import Card from "@/components/ui/Card";
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
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-8">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                {about.title}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                {about.subtitle}
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {about.highlights.map((item, index) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              return (
                <Reveal key={item.title} delay={0.1 + index * 0.05}>
                  <Card className="h-full p-5 transition-colors hover:border-[var(--accent)]/50">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)]">
                      {Icon ? <Icon className="h-5 w-5" /> : null}
                    </div>
                    <h4 className="text-base font-semibold text-[var(--text)]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {item.description}
                    </p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.3}>
            <Card className="overflow-hidden bg-[var(--surface)]/70 p-4 md:p-6">
              <div className="rounded-2xl bg-[var(--bg)] p-3 md:p-4">
                <div className="overflow-hidden rounded-xl">
                  <video
                    className="h-96 w-full origin-center scale-[1.2] object-contain object-center md:h-[28rem] md:scale-[1.45]"
                    src="/images/brand/about.mp4"
                    poster={about.cover.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={about.cover.alt}
                  >
                    Tu navegador no soporta videos HTML5.
                  </video>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
