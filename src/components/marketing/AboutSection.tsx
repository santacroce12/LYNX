import Image from "next/image";
import { Building, Clock, Globe, Layers, Shield, Users } from "lucide-react";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";

const iconMap = {
  layers: Layers,
  clock: Clock,
  building: Building,
  globe: Globe,
  users: Users,
  shield: Shield,
};

export default function AboutSection() {
  const { about } = site;

  return (
    <Section id="nosotros">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-8">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                {about.title}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                {about.subtitle}
              </h2>
            </Reveal>
          </div>

          <div className="space-y-4 text-sm text-[var(--muted)] md:text-base">
            {about.body.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 16)} delay={0.08 + index * 0.03}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <div>
            <Reveal>
              <h3 className="text-xl font-semibold">{about.teamTitle}</h3>
            </Reveal>
            <div className="mt-4 space-y-4 text-sm text-[var(--muted)] md:text-base">
              {about.teamBody.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 16)} delay={0.05 + index * 0.03}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Reveal>
            <Card className="overflow-hidden p-0">
              <Image
                src={about.cover.image}
                alt={about.cover.alt}
                width={720}
                height={520}
                className="h-64 w-full object-cover md:h-72"
                priority
              />
            </Card>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                {about.highlightsTitle}
              </p>
            </Reveal>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {about.highlights.map((item, index) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                return (
                  <Reveal key={item.title} delay={0.05 + index * 0.03}>
                    <Card className="h-full">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)]">
                        {Icon ? <Icon className="h-5 w-5" /> : null}
                      </div>
                      <h4 className="text-base font-semibold">{item.title}</h4>
                      <p className="mt-2 text-sm text-[var(--muted)]">
                        {item.description}
                      </p>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
