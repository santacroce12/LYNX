import Image from "next/image";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";

export default function Partners() {
  const { partners } = site;

  return (
    <Section id="partners">
      <div className="mb-10 max-w-2xl">
        <Reveal>
          <h2 className="text-3xl font-semibold md:text-4xl">{partners.title}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 text-sm text-[var(--muted)] md:text-base">
            {partners.subtitle}
          </p>
        </Reveal>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {partners.items.map((partner, index) => (
          <Reveal key={partner.name} delay={index * 0.04}>
            <Card className="flex h-full items-center gap-5">
              <div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]/80">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={120}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{partner.name}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {partner.description}
                </p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
