"use client";

import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import TechLogo from "@/components/ui/TechLogo";

interface Stat {
  label: string;
  value: string;
}

interface ImpactStatsProps {
  stats: Stat[];
  badges?: string[];
  badgeTitle?: string;
  title?: string;
}

export default function ImpactStats({
  stats,
  badges,
  badgeTitle = "Estándares & Tecnologías",
  title = "Respaldo Operativo",
}: ImpactStatsProps) {
  return (
    <Section className="relative border-y border-[var(--border)] bg-[var(--surface)]/50">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10">
        <div className="mb-12 text-center">
          <Reveal>
            <h2 className="text-2xl font-bold text-[var(--text)] md:text-3xl">
              {title}
            </h2>
          </Reveal>
        </div>

        <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.1}>
              <div className="group text-center">
                <div className="mb-2 text-4xl font-extrabold tracking-tight text-[var(--accent)] transition-transform duration-300 group-hover:scale-110 md:text-5xl">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {badges && (
          <Reveal delay={0.4}>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)]/80 p-6 backdrop-blur-sm md:p-8">
              <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-[var(--muted)]">
                {badgeTitle}
              </p>

              <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-10 md:gap-x-12">
                {badges.map((badgeName, idx) => (
                  <div
                    key={idx}
                    className="flex w-24 flex-col items-center justify-start text-center"
                  >
                    <TechLogo
                      name={badgeName}
                      className="mb-3 h-10 w-10 text-[var(--accent)] opacity-90 transition-all duration-300 hover:opacity-100 hover:scale-110 md:h-12 md:w-12"
                    />
                    <span className="text-[11px] font-semibold uppercase tracking-wider leading-tight text-[var(--muted)]">
                      {badgeName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
