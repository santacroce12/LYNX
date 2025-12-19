import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import Reveal from "@/components/motion/Reveal";
import { tecnologia } from "@/content/tecnologia";

export default function TecnologiaUseCases() {
  return (
    <Section id="casos">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-3xl font-semibold md:text-4xl">
          {tecnologia.sections.useCasesTitle}
        </h2>
        <p className="mt-3 text-sm text-[var(--muted)] md:text-base">
          {tecnologia.sections.useCasesSubtitle}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {tecnologia.useCases.map((useCase, index) => (
          <Reveal key={useCase.title} delay={index * 0.05}>
            <Card className="h-full">
              <h3 className="text-lg font-semibold">{useCase.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {useCase.description}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
