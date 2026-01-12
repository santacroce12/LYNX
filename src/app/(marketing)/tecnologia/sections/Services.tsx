import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { tecnologia } from "@/content/tecnologia";
import {
  Activity,
  Cpu,
  Layers,
  PenTool,
  Plug,
  Wifi,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "pen-tool": PenTool,
  layers: Layers,
  wifi: Wifi,
  plug: Plug,
  bot: Cpu,
  activity: Activity,
};

export default function TecnologiaServices() {
  return (
    <Section id="servicios">
      <div className="relative mb-12 text-center md:mb-20">
        <Reveal>
          <h2 className="text-3xl font-bold md:text-5xl">
            {tecnologia.sections.servicesTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">
            {tecnologia.sections.servicesSubtitle}
          </p>
        </Reveal>
      </div>
      <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tecnologia.services.map((service, index) => {
          const Icon = icons[service.icon as string] || Layers;
          return (
            <Reveal key={service.title} delay={index * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 p-8 transition-all hover:border-[var(--accent)]/50 hover:shadow-lg hover:shadow-[var(--accent)]/10">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[var(--text)]">
                  {service.title}
                </h3>
                <p className="leading-relaxed text-[var(--muted)]">
                  {service.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
