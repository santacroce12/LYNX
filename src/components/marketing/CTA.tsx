import FooterContent from "@/components/layout/FooterContent";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";

type CTAProps = {
  title: string;
  text: string;
  buttonLabel: string;
  href: string;
};

export default function CTA({ title, text, buttonLabel, href }: CTAProps) {
  return (
    <Section className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-10 h-72 bg-[radial-gradient(circle_at_14%_24%,rgba(255,122,26,0.1),transparent_26%),radial-gradient(circle_at_84%_10%,rgba(125,168,255,0.1),transparent_22%)]" />

      <div className="panel-shell overflow-hidden rounded-[2rem] px-5 py-6 md:px-8 md:py-8">
        <div className="panel-decoration pointer-events-none absolute inset-0 panel-grid opacity-20" />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center xl:gap-10">
          <div className="max-w-2xl space-y-3">
            <Reveal>
              <h2 className="section-heading max-w-3xl">{title}</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="max-w-2xl text-base leading-8 text-[var(--text)]/76">
                {text}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="flex items-center xl:border-l xl:border-white/8 xl:pl-10">
              <Button
                href={href}
                size="lg"
                className="w-full justify-center sm:w-auto sm:min-w-[188px]"
              >
                {buttonLabel}
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 border-t border-white/8 pt-8 md:mt-10 md:pt-10">
          <FooterContent />
        </div>
      </div>
    </Section>
  );
}
