import Link from "next/link";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import EnergyFlow from "@/components/ui/EnergyFlow";
import TubesBackground from "@/components/ui/neon-flow";
import { buildMetadata } from "@/lib/seo";
import {
  ArrowRight,
  Bolt,
  CheckCircle2,
  Cpu,
  FileQuestion,
  Gauge,
  Network,
  ShieldCheck,
  Wrench,
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
    topics: ["SCADA, PMU y CEN", "Protocolos OT", "Commissioning"],
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
    topics: ["Integración OT/IT", "Hardware y datos", "Equipos técnicos"],
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
  const nodeIcons = isEnergy ? [Gauge, ShieldCheck] : [Cpu, Wrench];

  return (
    <div
      className={`relative h-[104px] overflow-hidden rounded-[1rem] border ${
        isEnergy
          ? "border-[rgba(255,194,131,0.26)] bg-[linear-gradient(135deg,rgba(255,122,26,0.2),rgba(255,122,26,0.035)_58%,rgba(8,13,23,0.78))]"
          : "border-[rgba(125,168,255,0.28)] bg-[linear-gradient(135deg,rgba(42,112,255,0.2),rgba(125,168,255,0.035)_58%,rgba(8,13,23,0.78))]"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          isEnergy
            ? "bg-[radial-gradient(circle_at_20%_34%,rgba(255,194,131,0.22),transparent_31%),radial-gradient(circle_at_80%_62%,rgba(255,122,26,0.13),transparent_28%)]"
            : "bg-[radial-gradient(circle_at_20%_34%,rgba(125,168,255,0.2),transparent_31%),radial-gradient(circle_at_80%_62%,rgba(80,170,255,0.13),transparent_28%)]"
        }`}
      />
      <div className="panel-decoration pointer-events-none absolute inset-0 panel-grid opacity-25" />

      <div className="absolute left-4 top-4 flex items-center gap-3">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-[0.9rem] border ${
            isEnergy
              ? "border-[rgba(255,194,131,0.42)] bg-[rgba(255,122,26,0.18)] text-[var(--accent-soft)] shadow-[0_0_28px_rgba(255,122,26,0.2)]"
              : "border-[rgba(125,168,255,0.42)] bg-[rgba(42,112,255,0.18)] text-[#b7d1ff] shadow-[0_0_28px_rgba(125,168,255,0.18)]"
          }`}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="grid gap-1.5">
          {["Consulta", "Respuesta", "Acción"].map((item, index) => (
            <span
              key={item}
              className={`flex h-5 items-center gap-2 rounded-full border bg-[rgba(4,9,18,0.52)] px-2 text-[9px] font-semibold uppercase tracking-[0.12em] ${
                isEnergy
                  ? "border-[rgba(255,194,131,0.18)] text-[rgba(255,220,181,0.72)]"
                  : "border-[rgba(125,168,255,0.18)] text-[rgba(190,214,255,0.76)]"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isEnergy ? "bg-[var(--accent)]" : "bg-[var(--accent-cool)]"
                }`}
              />
              {index + 1}. {item}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 h-px bg-white/10">
        <span
          className={`absolute left-0 top-1/2 h-[3px] w-[62%] -translate-y-1/2 rounded-full ${
            isEnergy
              ? "bg-[linear-gradient(90deg,var(--accent),var(--accent-soft),transparent)] shadow-[0_0_18px_rgba(255,122,26,0.28)]"
              : "bg-[linear-gradient(90deg,var(--accent-cool),#b7d1ff,transparent)] shadow-[0_0_18px_rgba(125,168,255,0.24)]"
          }`}
        />
      </div>

      <div className="absolute bottom-6 right-4 flex gap-2">
        {nodeIcons.map((NodeIcon, index) => (
          <span
            key={index}
            className={`flex h-8 w-8 items-center justify-center rounded-full border bg-[rgba(4,9,18,0.78)] ${
              isEnergy
                ? "border-[rgba(255,194,131,0.34)] text-[var(--accent-soft)]"
                : "border-[rgba(125,168,255,0.34)] text-[#b7d1ff]"
            }`}
          >
            <NodeIcon className="h-3.5 w-3.5" aria-hidden="true" />
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
      <Section className="py-8 md:py-10 lg:py-10">
        <div className="w-full">
          <div className="mb-5 grid gap-5 lg:grid-cols-[minmax(0,0.88fr)_minmax(280px,0.36fr)] lg:items-end">
            <div className="max-w-3xl">
              <Reveal>
                <span className="section-kicker">Preguntas frecuentes</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="mt-3 max-w-4xl text-[2rem] font-semibold leading-[1] text-white md:mt-4 md:text-[2.7rem]">
                  Elegí la vertical que querés consultar
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)] md:text-base md:leading-7">
                  Encontrá respuestas por área de trabajo, con foco en implementación, operación y soporte.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.16}>
              <div className="panel-shell rounded-[1.2rem] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.85rem] border border-[rgba(255,194,131,0.2)] bg-[rgba(255,122,26,0.09)] text-[var(--accent-soft)]">
                    <FileQuestion className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted-soft)]">
                      Centro de ayuda
                    </p>
                    <p className="mt-2 text-[1.25rem] font-semibold leading-none text-[var(--text-strong)]">
                      17 respuestas
                    </p>
                    <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">
                      Energía y tecnología separadas para consultar más rápido.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-x-4 -top-8 h-72 rounded-full bg-[radial-gradient(circle_at_24%_16%,rgba(255,122,26,0.12),transparent_32%),radial-gradient(circle_at_78%_20%,rgba(65,135,255,0.12),transparent_34%)] blur-2xl" />
            <div className="relative grid gap-4 lg:grid-cols-2">
              {faqChoices.map((choice, index) => {
                const Icon = choice.icon;
                const VisualIcon = choice.visualIcon;
                const isEnergy = choice.tone === "energy";

                return (
                  <Link
                    key={choice.href}
                    href={choice.href}
                    className={`group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[1.35rem] border px-4 py-4 shadow-[0_18px_52px_rgba(2,6,23,0.18)] transition duration-300 hover:-translate-y-0.5 md:p-4 lg:min-h-[320px] ${
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

                    <div className="relative z-10 grid gap-3 sm:gap-4">
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
                            <h2 className="mt-2 text-[1.9rem] font-semibold leading-[0.95] text-white sm:mt-3 sm:text-[2.35rem] lg:text-[2.65rem]">
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

                      <Reveal delay={0.18 + index * 0.06}>
                        <ul className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                          {choice.topics.map((topic) => (
                            <li
                              key={topic}
                              className="flex items-center gap-2 rounded-[0.75rem] border border-white/8 bg-white/[0.035] px-2.5 py-2 text-[11px] font-semibold leading-tight text-white/72"
                            >
                              <CheckCircle2
                                className={`h-3.5 w-3.5 shrink-0 ${
                                  isEnergy
                                    ? "text-[var(--accent-soft)]"
                                    : "text-[#b7d1ff]"
                                }`}
                                aria-hidden="true"
                              />
                              {topic}
                            </li>
                          ))}
                        </ul>
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
