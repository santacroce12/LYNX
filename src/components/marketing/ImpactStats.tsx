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
  title = "Respaldo operativo",
}: ImpactStatsProps) {
  return (
    <Section className="relative">
      <div className="panel-shell overflow-hidden rounded-[1.75rem] px-5 py-6 md:px-6 md:py-7">
        <div className="mb-8 text-center">
          <Reveal>
            <span className="section-kicker">Respaldo</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="section-heading mt-4">{title}</h2>
          </Reveal>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div className="rounded-[1.25rem] border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="text-3xl font-semibold tracking-tight text-[var(--accent-soft)] md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted-soft)]">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {badges ? (
          <Reveal delay={0.32}>
            <div className="rounded-[1.45rem] border border-[var(--border)] bg-[rgba(255,255,255,0.03)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-6">
              <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--muted-soft)]">
                {badgeTitle}
              </p>

              <div className="flex flex-wrap items-start justify-center gap-x-7 gap-y-7 md:gap-x-10">
                {badges.map((badgeName, idx) => (
                  <div
                    key={idx}
                    className="flex w-20 flex-col items-center justify-start text-center"
                  >
                    <TechLogo
                      name={badgeName}
                      className="mb-3 h-10 w-10 text-[var(--accent)] opacity-90 transition-all duration-300 hover:scale-110 hover:opacity-100 md:h-12 md:w-12"
                    />
                    <span className="text-[11px] font-semibold uppercase leading-tight tracking-wider text-[var(--muted)]">
                      {badgeName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
