import { Briefcase } from "lucide-react";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";

export default function CaseStudies() {
  const { experience } = site;

  return (
    <Section id="experiencia">
      <div className="mb-10 max-w-2xl">
        <Reveal>
          <h2 className="text-3xl font-semibold md:text-4xl">
            {experience.title}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 text-sm text-[var(--muted)] md:text-base">
            {experience.subtitle}
          </p>
        </Reveal>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {experience.cases.map((item, index) => (
          <Reveal key={item.client} delay={index * 0.05}>
            <Card className="h-full">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)]">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{item.client}</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">{item.work}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.scope}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
