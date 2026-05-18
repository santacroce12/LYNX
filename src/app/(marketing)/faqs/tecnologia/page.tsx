import { Cpu } from "lucide-react";
import FaqVerticalPage from "../FaqVerticalPage";
import { tecnologia } from "@/content/tecnologia";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQs – Tecnología",
  description:
    "Preguntas frecuentes de LYNX sobre integración tecnológica, OT/IT, IoT industrial, datos, hardware y equipos técnicos.",
  path: "/faqs/tecnologia",
});

export default function TechFaqPage() {
  return (
    <FaqVerticalPage
      label="FAQs – Tecnología"
      title="Preguntas frecuentes de tecnología"
      description="Integración OT/IT, IoT industrial, arquitectura de datos, transformación digital y soporte técnico."
      items={tecnologia.faqs}
      icon={Cpu}
      tone="tech"
    />
  );
}
