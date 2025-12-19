import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import Reveal from "@/components/motion/Reveal";
import { energia } from "@/content/energia";

export default function EnergiaServices() {
  return (
    <Section id="servicios">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-3xl font-semibold md:text-4xl">
          {energia.sections.servicesTitle}
        </h2>
        <p className="mt-3 text-sm text-[var(--muted)] md:text-base">
          {energia.sections.servicesSubtitle}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {energia.services.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.05}>
            <Card className="h-full">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {service.description}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
