import CTA from "@/components/marketing/CTA";
import FAQ from "@/components/marketing/FAQ";
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
      <EnergiaGallery />
      <EnergiaServices />
      <EnergiaUseCases />
      <FAQ title={energia.sections.faqTitle} items={energia.faqs} />
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
