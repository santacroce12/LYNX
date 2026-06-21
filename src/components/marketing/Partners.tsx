import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { Logos3, type Logo } from "@/components/ui/logos3";

const logoTreatmentByName: Record<string, string> = {
  "Systems With Intelligence": "!h-[3.25rem] md:!h-[3.75rem]",
  N3uron: "!h-11 md:!h-12",
  Cisco:
    "brightness-[3] saturate-[1.25] drop-shadow-[0_0_12px_rgba(49,154,222,0.16)]",
  SISCO: "!h-11 brightness-125 md:!h-12",
};

export default function Partners() {
  const { partners } = site;
  const logos: Logo[] = partners.items.map((partner) => {
    const id = partner.name.toLowerCase().replace(/\s+/g, "-");

    return {
      id,
      description: partner.name,
      image: partner.image,
      href: `/partners#${id}`,
      className: logoTreatmentByName[partner.name],
    };
  });

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
        <Reveal delay={0.1} className="space-y-5">
          <p className="hidden section-copy sm:block">{partners.subtitle}</p>
          <Link
            href="/partners"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-strong)] transition-colors hover:text-[var(--accent-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cool)]"
          >
            Conocer el aporte de cada partner
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <div className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(135deg,rgba(30,20,73,0.82),rgba(12,6,35,0.9))] px-2 py-1 shadow-[0_24px_80px_rgba(5,2,18,0.28)] md:mt-7 md:px-4">
          <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent-soft),var(--accent-cool),transparent)] opacity-60" />
          <Logos3 logos={logos} className="relative" />
        </div>
      </Reveal>
    </Section>
  );
}
