import CTA from "@/components/marketing/CTA";
import FAQ from "@/components/marketing/FAQ";
import FeaturedProjects from "@/components/marketing/FeaturedProjects";
import ImpactStats from "@/components/marketing/ImpactStats";
import ProcessSteps from "@/components/marketing/ProcessSteps";
import { energia } from "@/content/energia";
import { buildMetadata } from "@/lib/seo";
import EnergiaHero from "./sections/Hero";
import EnergiaGallery from "./sections/Gallery";
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
    <>
      <EnergiaHero />
      <ImpactStats
        stats={energia.stats}
        badges={energia.standards}
        badgeTitle="Normativas & Protocolos Industriales"
        title="Ingeniería Certificada"
      />
      <EnergiaGallery />
      <EnergiaServices />
      <ProcessSteps
        steps={energia.process}
        title="Ciclo de Proyecto Certificado"
        subtitle="Garantizamos cumplimiento normativo desde el dise?o hasta la energizaci?n."
      />
      <EnergiaUseCases />
      <FAQ title={energia.sections.faqTitle} items={energia.faqs} />
      <FeaturedProjects filterCategory="Energía" />
      <div className="mx-auto w-full max-w-6xl px-6">
        <EnergyFlow className="mb-12 opacity-80" />
      </div>
      <CTA
        title={energia.cta.title}
        text={energia.cta.text}
        buttonLabel={energia.cta.buttonLabel}
        href="/contacto"
      />
    </>
  );
}
