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
        <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
        <div className="mt-8 space-y-4">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.04}>
              <details className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
                  <span>{item.question}</span>
                  <span className="ml-4 text-lg text-[var(--accent)] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[var(--muted)]">
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
