import Image from "next/image";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { tecnologia } from "@/content/tecnologia";

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
          const isEven = index % 2 === 0;

          return (
            <div
              key={useCase.title}
              className={`grid gap-4 lg:grid-cols-[1.02fr_0.98fr] lg:items-center ${
                !isEven ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal y={20}>
                <div className="panel-shell overflow-hidden rounded-[1.55rem] p-2.5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.15rem] border border-white/8">
                    <Image
                      src={useCase.image || ""}
                      alt={useCase.title}
                      fill
                      priority={index < 3}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.08)_0%,rgba(4,8,16,0.14)_36%,rgba(4,8,16,0.74)_100%)]" />
                  </div>
                </div>
              </Reveal>

              <Reveal y={20} delay={0.14}>
                <div className="panel-shell flex h-full flex-col justify-center rounded-[1.55rem] p-5 md:p-6">
                  <span className="section-kicker text-[var(--accent-cool)]">
                    Caso {index + 1}
                  </span>
                  <h3 className="mt-4 text-[1.45rem] font-semibold leading-[1] text-[var(--text-strong)] md:text-[1.7rem]">
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
