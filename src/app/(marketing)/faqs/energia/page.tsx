import { Bolt } from "lucide-react";
import FaqVerticalPage from "../FaqVerticalPage";
import { energia } from "@/content/energia";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQs – Energía",
  description:
    "Preguntas frecuentes de LYNX sobre automatización, monitoreo eléctrico, SCADA, CEN, PMU, protocolos OT y commissioning.",
  path: "/faqs/energia",
});

export default function EnergyFaqPage() {
  return (
    <FaqVerticalPage
      label="FAQs – Energía"
      title="Preguntas frecuentes de energía"
      description="Automatización eléctrica, monitoreo, cumplimiento técnico, protocolos industriales y servicios en terreno."
      items={energia.faqs}
      icon={Bolt}
      tone="energy"
    />
  );
}
