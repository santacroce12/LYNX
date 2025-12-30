import CTA from "@/components/marketing/CTA";
import FAQ from "@/components/marketing/FAQ";
import FeaturedProjects from "@/components/marketing/FeaturedProjects";
import EnergyFlow from "@/components/ui/EnergyFlow";
import { tecnologia } from "@/content/tecnologia";
import { buildMetadata } from "@/lib/seo";
import TecnologiaHero from "./sections/Hero";
import TecnologiaServices from "./sections/Services";
import TecnologiaUseCases from "./sections/UseCases";

export const metadata = buildMetadata({
  title: tecnologia.meta.title,
  description: tecnologia.meta.description,
  path: "/tecnologia",
});

export default function TecnologiaPage() {
  return (
    <>
      <TecnologiaHero />
      <TecnologiaServices />
      <TecnologiaUseCases />
      <FAQ title={tecnologia.sections.faqTitle} items={tecnologia.faqs} />
      <FeaturedProjects filterCategory="Tecnología" />
      <div className="mx-auto w-full max-w-6xl px-6">
        <EnergyFlow className="mb-12 opacity-80" />
      </div>
      <CTA
        title={tecnologia.cta.title}
        text={tecnologia.cta.text}
        buttonLabel={tecnologia.cta.buttonLabel}
        href="/contacto"
      />
    </>
  );
}
