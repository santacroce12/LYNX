import Link from "next/link";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import EnergyFlow from "@/components/ui/EnergyFlow";
import TubesBackground from "@/components/ui/neon-flow";
import { buildMetadata } from "@/lib/seo";
import {
  ArrowRight,
  Bolt,
  Cpu,
  Gauge,
  Network,
  Zap,
  type LucideIcon,
} from "lucide-react";

const faqChoices = [
  {
    href: "/faqs/energia",
    label: "FAQs - Energía",
    title: "Energía",
    description:
      "Automatización eléctrica, SCADA, CEN, PMU, protocolos OT, commissioning y ciberseguridad.",
    count: "8 preguntas",
    icon: Bolt,
    visualIcon: Zap,
    tone: "energy",
  },
  {
    href: "/faqs/tecnologia",
    label: "FAQs - Tecnología",
    title: "Tecnología",
    description:
      "Integración OT/IT, IoT industrial, hardware, datos, transformación digital y equipos técnicos.",
    count: "9 preguntas",
    icon: Cpu,
    visualIcon: Network,
    tone: "tech",
  },
] as const;

export const metadata = buildMetadata({
  title: "Preguntas frecuentes",
  description:
    "Elegí entre preguntas frecuentes de energía o tecnología de LYNX.",
  path: "/faqs",
});

function ChoiceGraphic({
  tone,
  icon: Icon,
}: {
  tone: "energy" | "tech";
  icon: LucideIcon;
}) {
  const isEnergy = tone === "energy";
  const nodeIcons = isEnergy ? [Bolt, Gauge] : [Cpu, Network];

  return (
    <div
      className={`relative h-[82px] overflow-hidden rounded-[1.15rem] border sm:h-[124px] lg:h-[150px] ${
        isEnergy
          ? "border-[rgba(255,194,131,0.32)] bg-[linear-gradient(135deg,rgba(255,122,26,0.22),rgba(255,122,26,0.04)_58%,rgba(8,13,23,0.72))]"
          : "border-[rgba(125,168,255,0.34)] bg-[linear-gradient(135deg,rgba(42,112,255,0.23),rgba(125,168,255,0.04)_58%,rgba(8,13,23,0.72))]"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          isEnergy
            ? "bg-[radial-gradient(circle_at_28%_42%,rgba(255,194,131,0.28),transparent_28%),radial-gradient(circle_at_76%_34%,rgba(255,122,26,0.22),transparent_24%)]"
            : "bg-[radial-gradient(circle_at_28%_42%,rgba(125,168,255,0.26),transparent_28%),radial-gradient(circle_at_76%_34%,rgba(80,170,255,0.18),transparent_24%)]"
        }`}
      />
      <div className="panel-decoration pointer-events-none absolute inset-0 panel-grid opacity-25" />

      <div className="absolute left-[5.3rem] right-5 top-1/2 h-px -translate-y-1/2 bg-white/10 sm:left-[7.35rem] sm:right-6">
        <span
          className={`absolute left-0 top-1/2 h-[3px] w-[68%] -translate-y-1/2 rounded-full ${
            isEnergy
              ? "bg-[linear-gradient(90deg,var(--accent),var(--accent-soft),transparent)] shadow-[0_0_18px_rgba(255,122,26,0.35)]"
              : "bg-[linear-gradient(90deg,var(--accent-cool),#b7d1ff,transparent)] shadow-[0_0_18px_rgba(125,168,255,0.32)]"
          }`}
        />
      </div>

      <div className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-2 sm:left-6 sm:gap-3">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-[1rem] border sm:h-20 sm:w-20 sm:rounded-[1.1rem] ${
            isEnergy
              ? "border-[rgba(255,194,131,0.42)] bg-[rgba(255,122,26,0.2)] text-[var(--accent-soft)] shadow-[0_0_34px_rgba(255,122,26,0.28)]"
              : "border-[rgba(125,168,255,0.44)] bg-[rgba(42,112,255,0.2)] text-[#b7d1ff] shadow-[0_0_34px_rgba(125,168,255,0.24)]"
          }`}
        >
          <Icon className="h-6 w-6 sm:h-10 sm:w-10" aria-hidden="true" />
        </span>
        <div className="grid gap-1.5 sm:gap-2">
          {[0, 1, 2].map((item) => (
            <span
              key={item}
              className={`block h-2 rounded-full ${
                isEnergy ? "bg-[rgba(255,194,131,0.44)]" : "bg-[rgba(125,168,255,0.44)]"
              }`}
              style={{ width: `${42 + item * 14}px` }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 right-3 grid grid-cols-2 gap-1.5 sm:bottom-4 sm:right-4 sm:gap-2">
        {nodeIcons.map((NodeIcon, index) => (
          <span
            key={index}
            className={`flex h-7 w-7 items-center justify-center rounded-full border bg-[rgba(4,9,18,0.72)] sm:h-9 sm:w-9 ${
              isEnergy
                ? "border-[rgba(255,194,131,0.34)] text-[var(--accent-soft)]"
                : "border-[rgba(125,168,255,0.34)] text-[#b7d1ff]"
            }`}
          >
            <NodeIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FAQChoicePage() {
  return (
    <TubesBackground
      className="isolate min-h-0"
      canvasClassName="pointer-events-none opacity-[0.38]"
      fixedCanvas
      intensity="low"
    >
      <Section className="flex min-h-[calc(100svh-4.75rem)] items-center py-3 md:py-6 lg:py-4">
        <div className="w-full">
          <div className="mb-4 max-w-3xl lg:mb-5">
            <div className="max-w-3xl">
              <Reveal>
                <span className="section-kicker">Preguntas frecuentes</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="mt-3 max-w-4xl text-[2rem] font-semibold leading-[0.96] text-white md:mt-4 md:text-[3.3rem]">
                  Elegí la vertical que querés consultar
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)] md:mt-3 md:text-base md:leading-7">
                  Seleccioná una opción para ver sólo las preguntas de esa vertical.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.55rem] border border-[var(--border)] bg-[rgba(5,10,19,0.76)] p-2 shadow-[var(--shadow-panel)] md:p-3">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,122,26,0.18),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(65,135,255,0.18),transparent_30%)]" />
            <div className="relative grid gap-2 lg:grid-cols-2">
              {faqChoices.map((choice, index) => {
                const Icon = choice.icon;
                const VisualIcon = choice.visualIcon;
                const isEnergy = choice.tone === "energy";

                return (
                  <Link
                    key={choice.href}
                    href={choice.href}
                    className={`group relative flex min-h-[226px] flex-col justify-between overflow-hidden rounded-[1.25rem] border px-4 py-4 transition duration-300 sm:min-h-[300px] md:px-5 md:py-5 lg:min-h-[390px] xl:min-h-[405px] ${
                      isEnergy
                        ? "border-[rgba(255,194,131,0.3)] bg-[linear-gradient(145deg,rgba(255,122,26,0.23),rgba(5,10,19,0.92)_52%)] hover:border-[rgba(255,194,131,0.54)] hover:bg-[linear-gradient(145deg,rgba(255,122,26,0.31),rgba(5,10,19,0.9)_54%)]"
                        : "border-[rgba(125,168,255,0.3)] bg-[linear-gradient(145deg,rgba(42,112,255,0.24),rgba(5,10,19,0.92)_52%)] hover:border-[rgba(125,168,255,0.56)] hover:bg-[linear-gradient(145deg,rgba(42,112,255,0.32),rgba(5,10,19,0.9)_54%)]"
                    }`}
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 opacity-90 transition duration-300 group-hover:opacity-100 ${
                        isEnergy
                          ? "bg-[radial-gradient(circle_at_24%_18%,rgba(255,194,131,0.18),transparent_31%),radial-gradient(circle_at_90%_96%,rgba(255,122,26,0.2),transparent_33%)]"
                          : "bg-[radial-gradient(circle_at_24%_18%,rgba(125,168,255,0.2),transparent_31%),radial-gradient(circle_at_90%_96%,rgba(42,112,255,0.22),transparent_33%)]"
                      }`}
                    />

                    <div className="relative z-10 grid gap-3 sm:gap-4 lg:gap-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Reveal delay={index * 0.06}>
                            <span
                              className={`inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                                isEnergy ? "text-[var(--accent-soft)]" : "text-[#b7d1ff]"
                              }`}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  isEnergy
                                    ? "bg-[var(--accent)] shadow-[0_0_14px_rgba(255,122,26,0.5)]"
                                    : "bg-[var(--accent-cool)] shadow-[0_0_14px_rgba(125,168,255,0.5)]"
                                }`}
                              />
                              {choice.label}
                            </span>
                          </Reveal>
                          <Reveal delay={0.08 + index * 0.06}>
                            <h2 className="mt-2 text-[1.9rem] font-semibold leading-[0.95] text-white sm:mt-3 sm:text-[2.55rem] lg:text-[3.65rem]">
                              {choice.title}
                            </h2>
                          </Reveal>
                        </div>

                        <span
                          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition duration-300 group-hover:translate-x-1 ${
                            isEnergy
                              ? "border-[rgba(255,194,131,0.32)] bg-[rgba(255,122,26,0.16)] text-[var(--accent-soft)]"
                              : "border-[rgba(125,168,255,0.34)] bg-[rgba(42,112,255,0.16)] text-[#b7d1ff]"
                          }`}
                        >
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>

                      <ChoiceGraphic tone={choice.tone} icon={VisualIcon} />

                      <Reveal delay={0.14 + index * 0.06}>
                        <p className="hidden max-w-xl text-[0.88rem] leading-6 text-white/78 sm:block lg:text-[0.95rem]">
                          {choice.description}
                        </p>
                      </Reveal>
                    </div>

                    <div className="relative z-10 mt-3 flex items-center justify-between gap-4 sm:mt-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                          isEnergy
                            ? "border-[rgba(255,194,131,0.28)] bg-[rgba(255,122,26,0.14)] text-[var(--accent-soft)]"
                            : "border-[rgba(125,168,255,0.3)] bg-[rgba(42,112,255,0.14)] text-[#b7d1ff]"
                        }`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        Seleccionar
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/58">
                        {choice.count}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-4 hidden lg:block">
            <EnergyFlow className="opacity-55" />
          </div>
        </div>
      </Section>
    </TubesBackground>
  );
}
