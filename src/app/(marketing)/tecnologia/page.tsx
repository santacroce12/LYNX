import CTA from "@/components/marketing/CTA";
import FeaturedProjects from "@/components/marketing/FeaturedProjects";
import TubesBackground from "@/components/ui/neon-flow";
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
    <TubesBackground
      className="isolate min-h-0"
      canvasClassName="pointer-events-none opacity-[0.36]"
      fixedCanvas
      intensity="low"
      showLines={false}
    >
      <TecnologiaHero />
      <TecnologiaIndustries />
      <TecnologiaServices />
      <TecnologiaProcess />
      <TecnologiaUseCases />
      <FeaturedProjects filterCategory="Tecnología" />
      <CTA
        title={tecnologia.cta.title}
        text={tecnologia.cta.text}
        buttonLabel={tecnologia.cta.buttonLabel}
        href="/contacto"
      />
    </TubesBackground>
  );
}
