import { buildMetadata } from "@/lib/seo";
import { recursos } from "@/content/recursos";
import CTA from "@/components/marketing/CTA";
import TubesBackground from "@/components/ui/neon-flow";
import RecursosHero from "./sections/Hero";
import RecursosGrid from "./sections/ResourcesGrid";

export const metadata = buildMetadata({
  title: recursos.meta.title,
  description: recursos.meta.description,
  path: "/recursos",
});

export default function RecursosPage() {
  return (
    <TubesBackground
      className="isolate min-h-0"
      canvasClassName="pointer-events-none opacity-[0.34]"
      fixedCanvas
      intensity="low"
    >
      <RecursosHero />
      <RecursosGrid />
      <CTA
        title="¿Querés ver más detalles?"
        text="Contanos tu desafío y armamos un caso a medida para tu operación."
        buttonLabel="Hablar con LYNX"
        href="/contacto"
      />
    </TubesBackground>
  );
}
