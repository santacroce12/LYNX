import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import TubesBackground from "@/components/ui/neon-flow";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight, Bolt, Cpu, type LucideIcon } from "lucide-react";

const faqChoices = [
  {
    href: "/faqs/energia",
    label: "Energía",
    title: "Energía",
    description: "Automatización eléctrica, SCADA, PMU y commissioning.",
    icon: Bolt,
    tone: "energy",
  },
  {
    href: "/faqs/tecnologia",
    label: "Tecnología",
    title: "Tecnología",
    description: "Integración OT/IT, datos, hardware y soporte técnico.",
    icon: Cpu,
    tone: "tech",
  },
] as const;

export const metadata = buildMetadata({
  title: "Preguntas frecuentes",
  description: "Elegí entre preguntas frecuentes de energía o tecnología de LYNX.",
  path: "/faqs",
});

function ChoiceCard({
  choice,
  index,
}: {
  choice: {
    href: string;
    label: string;
    title: string;
    description: string;
    icon: LucideIcon;
    tone: "energy" | "tech";
  };
  index: number;
}) {
  const Icon = choice.icon;
  const isEnergy = choice.tone === "energy";

  return (
    <Reveal delay={0.08 + index * 0.08}>
      <Link
        href={choice.href}
        className={`group relative flex min-h-[172px] overflow-hidden rounded-[1.35rem] border p-4 shadow-[0_18px_54px_rgba(7,3,24,0.24)] transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:min-h-[210px] sm:p-5 md:min-h-[260px] md:p-6 ${
          isEnergy
            ? "border-[rgba(247,208,163,0.28)] bg-[linear-gradient(145deg,rgba(239,130,57,0.2),rgba(13,6,37,0.92)_56%)] hover:border-[rgba(247,208,163,0.54)] focus-visible:ring-[var(--accent-warm)]"
            : "border-[rgba(170,166,246,0.3)] bg-[linear-gradient(145deg,rgba(89,89,201,0.28),rgba(13,6,37,0.92)_56%)] hover:border-[rgba(170,166,246,0.58)] focus-visible:ring-[var(--accent)]"
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-0 opacity-80 transition duration-300 group-hover:opacity-100 ${
            isEnergy
              ? "bg-[radial-gradient(circle_at_18%_18%,rgba(247,208,163,0.18),transparent_34%),radial-gradient(circle_at_92%_96%,rgba(239,130,57,0.18),transparent_34%)]"
              : "bg-[radial-gradient(circle_at_18%_18%,rgba(170,166,246,0.2),transparent_34%),radial-gradient(circle_at_92%_96%,rgba(89,89,201,0.22),transparent_34%)]"
          }`}
        />

        <div className="relative z-10 flex w-full flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <span
              className={`inline-flex h-12 w-12 items-center justify-center rounded-[1rem] border transition duration-300 group-hover:scale-105 md:h-14 md:w-14 ${
                isEnergy
                  ? "border-[rgba(247,208,163,0.32)] bg-[rgba(239,130,57,0.14)] text-[var(--accent-soft)]"
                  : "border-[rgba(170,166,246,0.34)] bg-[rgba(89,89,201,0.16)] text-[var(--accent-cool)]"
              }`}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>

            <span
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition duration-300 group-hover:translate-x-1 ${
                isEnergy
                  ? "border-[rgba(247,208,163,0.32)] text-[var(--accent-soft)]"
                  : "border-[rgba(170,166,246,0.34)] text-[var(--accent-cool)]"
              }`}
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>

          <div className="mt-6 md:mt-8">
            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
                isEnergy ? "text-[var(--accent-soft)]" : "text-[var(--accent-cool)]"
              }`}
            >
              {choice.label}
            </p>
            <h2 className="mt-2 text-[2rem] font-semibold leading-none text-white sm:text-[2.3rem] md:text-[3rem]">
              {choice.title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/68 md:text-base">
              {choice.description}
            </p>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export default function FAQChoicePage() {
  return (
    <TubesBackground
      className="isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden md:min-h-[calc(100svh-78px)]"
      canvasClassName="pointer-events-none opacity-[0.22]"
      fixedCanvas
      intensity="low"
    >
      <section className="w-full px-4 py-5 sm:px-6 md:py-8">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="section-kicker justify-center">Preguntas frecuentes</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 text-[2rem] font-semibold leading-[0.98] text-white sm:text-[2.4rem] md:text-[3.3rem]">
                Elegí una vertical
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--text-secondary)] md:text-base">
                Seleccioná el área que querés consultar.
              </p>
            </Reveal>
          </div>

          <div className="mx-auto mt-6 grid max-w-4xl gap-3 sm:mt-7 md:grid-cols-2 md:gap-5">
            {faqChoices.map((choice, index) => (
              <ChoiceCard key={choice.href} choice={choice} index={index} />
            ))}
          </div>
        </div>
      </section>
    </TubesBackground>
  );
}
