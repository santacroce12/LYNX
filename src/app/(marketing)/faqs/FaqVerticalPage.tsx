import Link from "next/link";
import Section from "@/components/layout/Section";
import CTA from "@/components/marketing/CTA";
import Reveal from "@/components/motion/Reveal";
import EnergyFlow from "@/components/ui/EnergyFlow";
import TubesBackground from "@/components/ui/neon-flow";
import { ArrowLeft, type LucideIcon } from "lucide-react";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqVerticalPageProps = {
  label: string;
  title: string;
  description: string;
  items: FaqItem[];
  icon: LucideIcon;
  tone: "energy" | "tech";
};

function toJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function buildFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export default function FaqVerticalPage({
  label,
  title,
  description,
  items,
  icon: Icon,
  tone,
}: FaqVerticalPageProps) {
  const isEnergy = tone === "energy";
  const faqSchema = buildFaqSchema(items);

  return (
    <TubesBackground
      className="isolate min-h-0"
      canvasClassName="pointer-events-none opacity-[0.38]"
      fixedCanvas
      intensity="low"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema) }}
      />

      <Section className="pt-2 md:pt-5">
        <div className="mb-6">
          <Link
            href="/faqs"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] transition hover:border-[rgba(255,194,131,0.24)] hover:text-[var(--text-strong)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Volver a FAQs
          </Link>
        </div>

        <div
          className={`relative overflow-hidden rounded-[2rem] border p-3 shadow-[var(--shadow-panel)] md:p-4 ${
            isEnergy
              ? "border-[rgba(255,194,131,0.2)] bg-[rgba(255,122,26,0.045)]"
              : "border-[rgba(125,168,255,0.2)] bg-[rgba(125,168,255,0.045)]"
          }`}
        >
          <div
            className={`pointer-events-none absolute inset-0 ${
              isEnergy
                ? "bg-[radial-gradient(circle_at_18%_18%,rgba(255,122,26,0.15),transparent_30%)]"
                : "bg-[radial-gradient(circle_at_78%_18%,rgba(125,168,255,0.14),transparent_30%)]"
            }`}
          />
          <div className="relative overflow-hidden rounded-[1.55rem] border border-white/8 bg-[rgba(4,9,18,0.72)] px-5 py-8 md:px-8 md:py-10">
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <Reveal>
                  <span
                    className={`section-kicker ${
                      isEnergy ? "text-[var(--accent-soft)]" : "text-[var(--accent-cool)]"
                    }`}
                  >
                    {label}
                  </span>
                </Reveal>
                <Reveal delay={0.06}>
                  <h1 className="mt-5 max-w-4xl text-[2.25rem] font-semibold leading-[0.98] text-white md:text-[4.2rem]">
                    {title}
                  </h1>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-5 max-w-2xl text-[0.95rem] leading-7 text-white/76 md:text-[1.05rem] md:leading-8">
                    {description}
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.16}>
                <span
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-[1.35rem] border ${
                    isEnergy
                      ? "border-[rgba(255,194,131,0.24)] bg-[rgba(255,122,26,0.12)] text-[var(--accent-soft)]"
                      : "border-[rgba(125,168,255,0.25)] bg-[rgba(125,168,255,0.1)] text-[var(--accent-cool)]"
                  }`}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-3">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.03}>
              <article className="panel-shell overflow-hidden rounded-[1.35rem] p-4 md:p-5">
                <h2 className="text-left text-[0.95rem] font-semibold leading-6 text-[var(--text-strong)] md:text-base">
                  {item.question}
                </h2>
                <div
                  className={`mt-4 h-px bg-gradient-to-r ${
                    isEnergy
                      ? "from-[var(--accent)]/22"
                      : "from-[var(--accent-cool)]/22"
                  } via-white/8 to-transparent`}
                />
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {item.answer}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8">
          <EnergyFlow
            className="opacity-75"
            variant={isEnergy ? "energy" : "tech"}
          />
        </div>
      </Section>

      <CTA
        title="¿Necesitás una respuesta más específica?"
        text="Contanos el contexto y orientamos el próximo paso técnico."
        buttonLabel="Ir a contacto"
        href="/contacto"
      />
    </TubesBackground>
  );
}
