import CTA from "@/components/marketing/CTA";
import AboutSection from "@/components/marketing/AboutSection";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import Partners from "@/components/marketing/Partners";
import SplitHero from "@/components/marketing/SplitHero";
import Section from "@/components/layout/Section";
import EnergyFlow from "@/components/ui/EnergyFlow";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Inicio",
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <SplitHero />
      <AboutSection />
      <Partners />
      <Section id="que-hace">
        <FeatureGrid
          title={site.homeSection.title}
          subtitle={site.homeSection.subtitle}
          items={site.homeBullets}
          columns={3}
        />
        <div className="mt-8">
          <EnergyFlow className="opacity-80" />
        </div>
      </Section>
      <CTA
        title={site.homeCta.title}
        text={site.homeCta.text}
        buttonLabel={site.homeCta.buttonLabel}
        href={site.homeCta.href}
      />
    </>
  );
}
