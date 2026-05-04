import Image from "next/image";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";

export default function Partners() {
  const { partners } = site;
  const items = [...partners.items, ...partners.items];

  return (
    <Section id="partners" className="pt-4">
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div className="space-y-4">
          <Reveal>
            <span className="section-kicker">Partners</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="section-heading">{partners.title}</h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="section-copy">{partners.subtitle}</p>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <div className="group relative mt-6 overflow-hidden rounded-[1.45rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(9,17,31,0.92)_0%,rgba(7,12,22,0.98)_100%)] px-2.5 py-3 md:mt-7 md:rounded-[1.9rem] md:px-4 md:py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/82 to-transparent md:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--bg)] via-[var(--bg)]/82 to-transparent md:w-20" />

          <div className="flex w-max items-center gap-4 motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
            {items.map((partner, index) => (
              <a
                key={`${partner.name}-${index}`}
                href={partner.href}
                target={partner.href.startsWith("http") ? "_blank" : undefined}
                rel={partner.href.startsWith("http") ? "noreferrer" : undefined}
                className="group/logo flex h-[76px] w-[132px] shrink-0 items-center justify-center rounded-[1.05rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_100%)] px-4 transition duration-300 hover:border-[rgba(255,194,131,0.22)] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.13)_0%,rgba(255,255,255,0.05)_100%)] md:h-[88px] md:w-[152px] md:rounded-[1.35rem] md:px-5"
                aria-label={partner.name}
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={180}
                  height={80}
                  priority={index < 4}
                  className="max-h-10 w-full object-contain brightness-110 contrast-125 grayscale saturate-0 opacity-72 transition duration-300 group-hover/logo:scale-[1.02] group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:saturate-100"
                />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
