import { buildMetadata } from "@/lib/seo";
import { recursos } from "@/content/recursos";
import CTA from "@/components/marketing/CTA";
import RecursosHero from "./sections/Hero";
import RecursosGrid from "./sections/ResourcesGrid";

export const metadata = buildMetadata({
  title: recursos.meta.title,
  description: recursos.meta.description,
  path: "/recursos",
});

export default function RecursosPage() {
  return (
    <>
      <RecursosHero />
      <RecursosGrid />
      <CTA
        title="¿Querés ver más detalles?"
        text="Contanos tu desafío y armamos un caso a medida para tu operación."
        buttonLabel="Hablar con LYNX"
        href="/contacto"
      />
    </>
  );
}
