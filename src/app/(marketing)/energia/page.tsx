import CTA from "@/components/marketing/CTA";
import FeaturedProjects from "@/components/marketing/FeaturedProjects";
import ImpactStats from "@/components/marketing/ImpactStats";
import TubesBackground from "@/components/ui/neon-flow";
import { energia } from "@/content/energia";
import { buildMetadata } from "@/lib/seo";
import EnergiaHero from "./sections/Hero";
import EnergiaGallery from "./sections/Gallery";
import EnergiaProcess from "./sections/Process";
import EnergiaServices from "./sections/Services";
import EnergiaUseCases from "./sections/UseCases";
import EnergyFlow from "@/components/ui/EnergyFlow";

export const metadata = buildMetadata({
  title: energia.meta.title,
  description: energia.meta.description,
  path: "/energia",
});

export default function EnergiaPage() {
  return (
    <TubesBackground
      className="isolate min-h-0"
      canvasClassName="pointer-events-none opacity-[0.36]"
      fixedCanvas
      intensity="low"
    >
      <EnergiaHero />
      <ImpactStats
        stats={energia.stats}
        badges={energia.standards}
        badgeTitle="Normativas & Protocolos Industriales"
        title="Ingeniería Certificada"
      />
      <EnergiaGallery />
      <EnergiaServices />
      <EnergiaProcess />
      <EnergiaUseCases />
      <FeaturedProjects filterCategory="Energía" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <EnergyFlow className="mb-12 opacity-80" />
      </div>
      <CTA
        title={energia.cta.title}
        text={energia.cta.text}
        buttonLabel={energia.cta.buttonLabel}
        href="/contacto"
      />
    </TubesBackground>
  );
}
