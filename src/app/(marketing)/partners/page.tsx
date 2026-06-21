import CTA from "@/components/marketing/CTA";
import Reveal from "@/components/motion/Reveal";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import TubesBackground from "@/components/ui/neon-flow";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Partners",
  description:
    "El ecosistema tecnológico que LYNX integra para proteger, conectar, monitorear y operar infraestructura crítica.",
  path: "/partners",
});

const partnerAccents = [
  "#ef8239",
  "#aaa6f6",
  "#f7d0a3",
  "#8d84ee",
  "#d6d2ff",
  "#319ade",
  "#ef8239",
];

function partnerId(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default function PartnersPage() {
  const items: FocusRailItem[] = site.partners.items.map((partner, index) => ({
    id: partnerId(partner.name),
    title: partner.name,
    description: partner.description,
    imageSrc:
      "focusImage" in partner && typeof partner.focusImage === "string"
        ? partner.focusImage
        : partner.image,
    imageFit:
      "focusImageFit" in partner && partner.focusImageFit === "cover"
        ? "cover"
        : "contain",
    href: partner.href,
    meta: partner.role,
    contribution: partner.contribution,
    capabilities: partner.capabilities,
    accent: partnerAccents[index],
  }));

  return (
    <TubesBackground
      className="isolate min-h-0"
      canvasClassName="pointer-events-none opacity-[0.42]"
      fixedCanvas
      intensity="low"
    >
      <section id="partners" aria-labelledby="partners-title" className="relative scroll-mt-20">
        <h1 id="partners-title" className="sr-only">
          Partners tecnológicos de LYNX
        </h1>
        <Reveal>
          <FocusRail items={items} loop autoPlay={false} />
        </Reveal>
      </section>

      <CTA
        className="!mt-0"
        title="La tecnología es una parte. La integración hace la diferencia."
        text="Contanos qué activos, sistemas o datos necesitás conectar y diseñamos la arquitectura con el partner adecuado."
        buttonLabel="Hablar con LYNX"
        href="/contacto"
      />
    </TubesBackground>
  );
}
