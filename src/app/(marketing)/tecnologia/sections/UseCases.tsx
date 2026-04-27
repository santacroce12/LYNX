import Image from "next/image";
import {
  BarChart3,
  MapPinned,
  Network,
  RadioTower,
  RefreshCcw,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { tecnologia } from "@/content/tecnologia";

const icons: Record<string, LucideIcon> = {
  chart: BarChart3,
  map: MapPinned,
  network: Network,
  radio: RadioTower,
  refresh: RefreshCcw,
  workflow: Workflow,
};

export default function TecnologiaUseCases() {
  return (
    <Section id="casos">
      <div className="mb-7 max-w-2xl">
        <Reveal>
          <span className="section-kicker">Aplicaciones</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="section-heading mt-4">
            {tecnologia.sections.useCasesTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="section-copy mt-4">
            {tecnologia.sections.useCasesSubtitle}
          </p>
        </Reveal>
      </div>

      <div className="space-y-5">
        {tecnologia.useCases.map((useCase, index) => {
          const Icon = icons[useCase.icon] ?? Network;
          const isEven = index % 2 === 0;

          return (
            <div
              key={useCase.title}
              className={`grid gap-4 lg:grid-cols-[1.02fr_0.98fr] lg:items-center ${
                !isEven ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal y={20}>
                <div className="panel-shell group overflow-hidden rounded-[1.55rem] p-2.5">
                  <div className="relative aspect-video overflow-hidden rounded-[1.15rem] border border-white/8">
                    <Image
                      src={
                        useCase.image ??
                        "/images/tecnologia/generated/caso-operaciones-conectadas.png"
                      }
                      alt={useCase.title}
                      fill
                      priority={index < 2}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.04)_0%,rgba(4,8,16,0.12)_38%,rgba(4,8,16,0.58)_100%)]" />
                  </div>
                </div>
              </Reveal>

              <Reveal y={20} delay={0.14}>
                <div className="panel-shell flex h-full flex-col justify-center rounded-[1.55rem] p-5 md:p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-[0.85rem] border border-[rgba(125,168,255,0.2)] bg-[rgba(125,168,255,0.08)] text-[var(--accent-cool)]">
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="section-kicker">Caso 0{index + 1}</span>
                  </div>
                  <h3 className="text-[1.35rem] font-semibold leading-[1] text-[var(--text-strong)] md:text-[1.6rem]">
                    {useCase.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[var(--text)]/76">
                    {useCase.description}
                  </p>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
