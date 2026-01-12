import Image from "next/image";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { tecnologia } from "@/content/tecnologia";

export default function TecnologiaUseCases() {
  return (
    <Section id="casos">
      <div className="mb-12 max-w-2xl">
        <Reveal>
          <h2 className="text-3xl font-bold md:text-5xl">
            {tecnologia.sections.useCasesTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg text-[var(--muted)]">
            {tecnologia.sections.useCasesSubtitle}
          </p>
        </Reveal>
      </div>
      <div className="space-y-24 md:space-y-32">
        {tecnologia.useCases.map((useCase, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={useCase.title}
              className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-16 ${
                !isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <Reveal y={20}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[var(--border)] shadow-2xl">
                    <Image
                      src={useCase.image || ""}
                      alt={useCase.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg)]/20 to-transparent" />
                  </div>
                </Reveal>
              </div>
              <div className="flex-1">
                <Reveal y={20} delay={0.2}>
                  <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                    {useCase.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-[var(--muted)]">
                    {useCase.description}
                  </p>
                  <div className="mt-6 h-1 w-20 rounded-full bg-[var(--accent)]" />
                </Reveal>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
