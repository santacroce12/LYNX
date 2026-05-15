import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  title: string;
  items: FAQItem[];
};

function toJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function buildFaqSchema(items: FAQItem[]) {
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

export default function FAQ({ title, items }: FAQProps) {
  const faqSchema = buildFaqSchema(items);

  return (
    <Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <span className="section-kicker">FAQ</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="section-heading mt-4">{title}</h2>
        </Reveal>

        <div className="mt-6 space-y-3 md:mt-8 md:space-y-4">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.04}>
              <details className="panel-shell group overflow-hidden rounded-[1.8rem] p-4 md:p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[0.95rem] font-semibold leading-6 text-[var(--text-strong)] md:gap-6 md:text-base">
                  <span>{item.question}</span>
                  <span className="ml-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg text-[var(--accent-soft)] transition-transform duration-300 group-open:rotate-45 md:ml-4 md:h-10 md:w-10">
                    +
                  </span>
                </summary>
                <div className="mt-4 h-px bg-gradient-to-r from-[var(--accent)]/18 via-white/8 to-transparent" />
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
