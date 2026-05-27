import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import RadialOrbitalTimeline, {
  type OrbitalTimelineIcon,
  type OrbitalTimelineItem,
} from "@/components/ui/radial-orbital-timeline";
import { energia } from "@/content/energia";

const icons: OrbitalTimelineIcon[] = [
  "clipboard",
  "settings",
  "route",
  "check",
  "rocket",
];

const processTimeline: OrbitalTimelineItem[] = energia.process.map(
  (step, index, steps) => {
    const relatedIds = [
      index > 0 ? index : null,
      index < steps.length - 1 ? index + 2 : null,
    ].filter((id): id is number => id !== null);

    return {
      id: index + 1,
      step: step.step,
      title: step.title,
      content: step.description,
      icon: icons[index] ?? "clipboard",
      relatedIds,
    };
  },
);

export default function EnergiaProcess() {
  return (
    <Section id="proceso" className="relative overflow-hidden">
      <div className="mb-7 grid gap-4 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
        <div>
          <Reveal>
            <span className="section-kicker">Framework</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="section-heading mt-4">
              Ciclo de Proyecto Certificado
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.14}>
          <p className="section-copy lg:justify-self-end">
            Garantizamos cumplimiento normativo desde el diseño hasta la
            energización.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.18}>
        <RadialOrbitalTimeline
          timelineData={processTimeline}
          mobileKicker="Ciclo certificado"
          mobileTitle="Proyecto energético por etapas"
        />
      </Reveal>
    </Section>
  );
}
