import type { Metadata } from "next";
import FirmaGenerator from "./FirmaGenerator";

export const metadata: Metadata = {
  title: "Generador de firma | LYNX",
  description: "Generador interno de firmas HTML para Outlook de LYNX.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FirmaPage() {
  return <FirmaGenerator />;
}
