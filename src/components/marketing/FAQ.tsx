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

export default function FAQ({ title, items }: FAQProps) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <span className="section-kicker">FAQ</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="section-heading mt-4">{title}</h2>
        </Reveal>

        <div className="mt-8 space-y-4">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.04}>
              <details className="panel-shell group overflow-hidden rounded-[1.8rem] p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-semibold text-[var(--text-strong)]">
                  <span>{item.question}</span>
                  <span className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg text-[var(--accent-soft)] transition-transform duration-300 group-open:rotate-45">
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
