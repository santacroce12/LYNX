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
      <div className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/60 px-6 py-6">
        <div className="flex w-max items-center gap-10 motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
          {items.map((partner, index) => (
            <a
              key={`${partner.name}-${index}`}
              href={partner.href}
              target={partner.href.startsWith("http") ? "_blank" : undefined}
              rel={partner.href.startsWith("http") ? "noreferrer" : undefined}
              className="flex w-40 items-center justify-center md:w-48"
              aria-label={partner.name}
            >
              <Image
                src={partner.image}
                alt={partner.name}
                width={180}
                height={80}
                className="h-14 w-full object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
