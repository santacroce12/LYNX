import Section from "@/components/layout/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";

type CTAProps = {
  title: string;
  text: string;
  buttonLabel: string;
  href: string;
};

export default function CTA({ title, text, buttonLabel, href }: CTAProps) {
  return (
    <Section className="relative">
      <div
        className="pointer-events-none absolute inset-0 bg-radial-accent opacity-80"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/70 px-8 py-12">
        <Reveal>
          <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 max-w-2xl text-sm text-[var(--muted)] md:text-base">
            {text}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-6">
            <Button href={href}>{buttonLabel}</Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
