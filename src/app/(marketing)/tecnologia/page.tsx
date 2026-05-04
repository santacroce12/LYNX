import CTA from "@/components/marketing/CTA";
import FAQ from "@/components/marketing/FAQ";
import FeaturedProjects from "@/components/marketing/FeaturedProjects";
import { tecnologia } from "@/content/tecnologia";
import { buildMetadata } from "@/lib/seo";
import TecnologiaHero from "./sections/Hero";
import TecnologiaIndustries from "./sections/Industries";
import TecnologiaProcess from "./sections/Process";
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
      <TecnologiaIndustries />
      <TecnologiaServices />
      <TecnologiaProcess />
      <TecnologiaUseCases />
      <FAQ title={tecnologia.sections.faqTitle} items={tecnologia.faqs} />
      <FeaturedProjects filterCategory="Tecnología" />
      <CTA
        title={tecnologia.cta.title}
        text={tecnologia.cta.text}
        buttonLabel={tecnologia.cta.buttonLabel}
        href="/contacto"
      />
    </>
  );
}
