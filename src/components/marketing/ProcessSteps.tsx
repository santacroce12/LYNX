"use client";

import type { CSSProperties } from "react";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";

interface Step {
  step: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
  title?: string;
  subtitle?: string;
}

export default function ProcessSteps({
  steps,
  title = "Nuestra metodología",
  subtitle = "Estándares de ejecución técnica",
}: ProcessStepsProps) {
  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_18%_0%,rgba(255,122,26,0.1),transparent_22%),radial-gradient(circle_at_82%_0%,rgba(125,168,255,0.1),transparent_20%)]" />

      <div className="mb-10 text-center">
        <Reveal>
          <span className="section-kicker">Framework</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="section-heading mt-4">{title}</h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="section-copy mx-auto mt-4">{subtitle}</p>
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="absolute bottom-5 left-7 top-5 hidden w-px bg-gradient-to-b from-white/6 via-white/10 to-white/6 md:block" />
        <div className="timeline-beam absolute bottom-10 left-[22px] top-6 hidden w-[10px] -translate-x-1/2 md:block" />

        <div className="space-y-4 md:space-y-5">
          {steps.map((item, index) => {
            const stepDelay = `${index * 0.45}s`;
            const connectorDelay = `${index * 0.45 + 0.18}s`;
            const scanDelay = `${index * 0.45 + 0.32}s`;

            return (
              <Reveal key={item.step} delay={index * 0.06}>
                <article className="relative grid gap-3 md:grid-cols-[84px_minmax(0,1fr)] md:gap-5">
                  <div className="relative flex items-start md:justify-center">
                    <div
                      className="timeline-step-chip flex h-12 w-12 items-center justify-center rounded-[1.15rem] border border-[rgba(255,194,131,0.18)] bg-[linear-gradient(180deg,rgba(255,122,26,0.14)_0%,rgba(255,122,26,0.08)_100%)] text-[var(--accent)] shadow-[0_10px_28px_rgba(255,122,26,0.12)]"
                      style={{ "--timeline-delay": stepDelay } as CSSProperties}
                    >
                      <span className="text-sm font-semibold">{item.step}</span>
                    </div>

                    <div
                      className="timeline-connector absolute left-12 top-6 hidden h-px w-8 md:block"
                      style={
                        { "--timeline-delay": connectorDelay } as CSSProperties
                      }
                    />
                  </div>

                  <div className="panel-shell relative overflow-hidden rounded-[1.6rem] px-5 py-5 md:px-6 md:py-6">
                    <div
                      className="panel-decoration timeline-card-scan absolute inset-x-6 top-0 h-[2px]"
                      style={{ "--timeline-delay": scanDelay } as CSSProperties}
                    />

                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <h3 className="max-w-2xl text-[1.45rem] font-semibold leading-[1] text-[var(--text-strong)] md:text-[1.7rem]">
                        {item.title}
                      </h3>
                      <div className="h-px w-20 bg-gradient-to-r from-[var(--accent)]/46 via-[var(--accent-soft)]/24 to-transparent" />
                    </div>

                    <p className="mt-4 text-sm leading-7 text-[var(--text)]/76 md:text-base md:leading-8">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
