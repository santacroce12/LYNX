"use client";

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
  title = "Nuestra Metodolog\u00eda",
  subtitle = "Est\u00e1ndares de ejecuci\u00f3n t\u00e9cnica",
}: ProcessStepsProps) {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--border)] to-transparent opacity-50" />

      <div className="mb-16 text-center">
        <Reveal>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto max-w-2xl text-[var(--muted)]">{subtitle}</p>
        </Reveal>
      </div>

      <div className="relative grid gap-8 md:grid-cols-4">
        <div className="absolute left-0 top-12 hidden h-0.5 w-full bg-[var(--border)] md:block -z-10" />

        {steps.map((item, index) => (
          <Reveal key={item.step} delay={index * 0.1}>
            <div className="group relative">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--bg)] shadow-xl shadow-[var(--bg)] transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--accent)]">
                <span className="text-2xl font-bold text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]">
                  {item.step}
                </span>
              </div>

              <div className="px-2 text-center">
                <h3 className="mb-3 text-lg font-bold text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {item.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
