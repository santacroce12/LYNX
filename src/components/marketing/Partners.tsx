import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { Logos3, type Logo } from "@/components/ui/logos3";

const logoSizeByName: Record<string, string> = {
  SEL: "!max-h-14 !max-w-[10rem] md:!max-h-16 md:!max-w-[11rem]",
  Survalent: "!max-h-9 !max-w-[12.5rem] md:!max-h-10 md:!max-w-[14rem]",
  "Systems With Intelligence":
    "!max-h-[4.6rem] !max-w-[6.5rem] md:!max-h-[5rem] md:!max-w-[7rem]",
  N3uron: "!max-h-14 !max-w-[11rem] md:!max-h-16 md:!max-w-[12rem]",
  Lexa: "!max-h-11 !max-w-[9rem] md:!max-h-12 md:!max-w-[10rem]",
  Cisco: "!max-h-11 !max-w-[9rem] md:!max-h-12 md:!max-w-[10rem]",
  Sisco: "!max-h-14 !max-w-[12rem] md:!max-h-[4.5rem] md:!max-w-[14rem]",
};

export default function Partners() {
  const { partners } = site;
  const logos: Logo[] = partners.items.map((partner) => ({
    id: partner.name.toLowerCase().replace(/\s+/g, "-"),
    description: partner.name,
    image: partner.image,
    className: logoSizeByName[partner.name],
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
