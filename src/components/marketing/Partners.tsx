import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { Logos3, type Logo } from "@/components/ui/logos3";

const logoTreatmentByName: Record<string, string> = {
  "Systems With Intelligence": "!h-[3.25rem] md:!h-[3.75rem]",
  N3uron: "!h-11 md:!h-12",
  Cisco:
    "brightness-[3] saturate-[1.25] drop-shadow-[0_0_12px_rgba(49,154,222,0.16)]",
  Sisco: "!h-11 brightness-125 md:!h-12",
};

export default function Partners() {
  const { partners } = site;
  const logos: Logo[] = partners.items.map((partner) => ({
    id: partner.name.toLowerCase().replace(/\s+/g, "-"),
    description: partner.name,
    image: partner.image,
    className: logoTreatmentByName[partner.name],
  }));

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
          <p className="hidden section-copy sm:block">{partners.subtitle}</p>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <Logos3 logos={logos} className="mt-6 md:mt-7" />
      </Reveal>
    </Section>
  );
}
