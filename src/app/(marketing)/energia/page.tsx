import CTA from "@/components/marketing/CTA";
import FAQ from "@/components/marketing/FAQ";
import { energia } from "@/content/energia";
import { buildMetadata } from "@/lib/seo";
import EnergiaHero from "./sections/Hero";
import EnergiaServices from "./sections/Services";
import EnergiaUseCases from "./sections/UseCases";

export const metadata = buildMetadata({
  title: energia.meta.title,
  description: energia.meta.description,
  path: "/energia",
});

export default function EnergiaPage() {
  return (
    <>
      <EnergiaHero />
      <EnergiaServices />
      <EnergiaUseCases />
      <FAQ title={energia.sections.faqTitle} items={energia.faqs} />
      <CTA
        title={energia.cta.title}
        text={energia.cta.text}
        buttonLabel={energia.cta.buttonLabel}
        href="/contacto"
      />
    </>
  );
}
