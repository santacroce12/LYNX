import Image from "next/image";
import {
  CheckCircle2,
  ClipboardList,
  GitBranch,
  Rocket,
  Route,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { tecnologia } from "@/content/tecnologia";

const icons: LucideIcon[] = [
  ClipboardList,
  Route,
  GitBranch,
  Settings2,
  Rocket,
  CheckCircle2,
];

export default function TecnologiaProcess() {
  return (
    <Section id="proceso" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_18%_0%,rgba(255,122,26,0.08),transparent_22%),radial-gradient(circle_at_82%_0%,rgba(125,168,255,0.1),transparent_20%)]" />

      <div className="mb-7 grid gap-4 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
        <div>
          <Reveal>
            <span className="section-kicker">{tecnologia.sections.processKicker}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="section-heading mt-4">
              {tecnologia.sections.processTitle}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.14}>
          <p className="section-copy lg:justify-self-end">
            {tecnologia.sections.processSubtitle}
          </p>
        </Reveal>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <Reveal>
          <div className="panel-shell overflow-hidden rounded-[1.55rem] p-2.5">
            <div className="relative aspect-video overflow-hidden rounded-[1.15rem] border border-white/8">
              <Image
                src="/images/tecnologia/generated/integracion-proceso.png"
                alt="Recorrido de implementación tecnológica por etapas"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center opacity-[0.82]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.04)_0%,rgba(4,8,16,0.1)_42%,rgba(4,8,16,0.46)_100%)]" />
            </div>
            <div className="px-3 py-4 md:px-4 md:py-5">
              <p className="section-kicker text-[var(--accent-cool)]">
                As-Is / To-Be / Implementación / Operación / Mantenimiento
              </p>
              <h3 className="mt-4 max-w-sm text-[1.65rem] font-semibold leading-[1] text-[var(--text-strong)]">
                Un recorrido claro, sin transformar todo a la vez y con acompañamiento posterior a la puesta en marcha.
              </h3>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {tecnologia.process.map((step, index) => {
            const Icon = icons[index] ?? ClipboardList;

            return (
              <Reveal key={step.step} delay={index * 0.04}>
                <article className="panel-shell h-full rounded-[1.1rem] px-4 py-4 transition duration-300 hover:border-[rgba(255,194,131,0.18)]">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-[0.8rem] border border-[rgba(255,194,131,0.16)] bg-[rgba(255,122,26,0.08)] text-[var(--accent)]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted-soft)]">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-[1.02rem] font-semibold leading-[1.08] text-[var(--text-strong)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {step.description}
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
