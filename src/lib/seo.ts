import type { Metadata } from "next";
import { site } from "@/content/site";

type MetadataArgs = {
  title: string;
  description: string;
  path?: string;
};

const BASE_URL = "https://lynx.com";

export function buildMetadata({
  title,
  description,
  path = "/",
}: MetadataArgs): Metadata {
  const url = new URL(path, BASE_URL);
  const fullTitle = `${title} | ${site.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
