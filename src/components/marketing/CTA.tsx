import FooterContent from "@/components/layout/FooterContent";
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
    <section className="relative mt-10 md:mt-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_14%_18%,rgba(255,122,26,0.1),transparent_24%),radial-gradient(circle_at_86%_10%,rgba(125,168,255,0.1),transparent_22%)]" />

      <div className="relative overflow-hidden border-y border-white/8 bg-[linear-gradient(180deg,rgba(10,17,31,0.96)_0%,rgba(7,13,24,0.96)_100%)]">
        <div className="panel-decoration pointer-events-none absolute inset-0 panel-grid opacity-15" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mx-auto w-full max-w-[1320px] px-5 py-8 sm:px-6 md:px-8 md:py-10">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center xl:gap-14">
            <div className="max-w-[700px] space-y-3">
              <Reveal>
                <h2 className="section-heading max-w-3xl">{title}</h2>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="max-w-[640px] text-base leading-8 text-[var(--text)]/76">
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
      </div>
    </section>
  );
}
