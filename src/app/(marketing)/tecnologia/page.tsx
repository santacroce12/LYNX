import CTA from "@/components/marketing/CTA";
import FAQ from "@/components/marketing/FAQ";
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
      <CTA
        title={tecnologia.cta.title}
        text={tecnologia.cta.text}
        buttonLabel={tecnologia.cta.buttonLabel}
        href="/contacto"
      />
    </>
  );
}
