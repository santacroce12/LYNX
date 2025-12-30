import Image from "next/image";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";

export default function Partners() {
  const { partners } = site;
  const items = [...partners.items, ...partners.items];

  return (
    <Section id="partners">
      <div className="mb-10 max-w-2xl">
        <Reveal>
          <h2 className="text-3xl font-semibold md:text-4xl">{partners.title}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 text-sm text-[var(--muted)] md:text-base">
            {partners.subtitle}
          </p>
        </Reveal>
      </div>
      <div className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/60 px-6 py-8">
        <div className="flex w-max items-center gap-8 motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
          {items.map((partner, index) => {
            const isEmphasized =
              partner.name === "SEL" ||
              partner.name === "N3uron" ||
              partner.name === "Systems With Intelligence";
            const logoSizeClass =
              partner.name === "Sisco"
                ? "h-16 scale-125"
                : partner.name === "Systems With Intelligence"
                  ? "h-16 scale-125"
                  : isEmphasized
                    ? "h-14 scale-115"
                    : "h-12";

            return (
              <a
                key={`${partner.name}-${index}`}
                href={partner.href}
                target={partner.href.startsWith("http") ? "_blank" : undefined}
                rel={partner.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex h-24 w-44 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)]/85 px-6 shadow-sm transition-colors hover:border-[var(--accent)]/40 md:w-48"
                aria-label={partner.name}
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={180}
                  height={80}
                  className={`w-full object-contain grayscale opacity-80 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 dark:brightness-110 dark:contrast-125 ${logoSizeClass}`}
                />
              </a>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
