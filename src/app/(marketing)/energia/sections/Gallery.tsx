import Image from "next/image";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { energia } from "@/content/energia";

const images = [
  {
    src: "/images/energia/energia-subestacion.jpg",
    alt: "Subestación eléctrica",
  },
  {
    src: "/images/energia/energia-ingeniero.jpg",
    alt: "Ingeniero en campo",
  },
  {
    src: "/images/energia/1.jpg",
    alt: "Proyecto energía 1",
  },
  {
    src: "/images/energia/6.jpg",
    alt: "Proyecto energía 2",
  },
  {
    src: "/images/energia/9.jpg",
    alt: "Proyecto energía 3",
  },
  {
    src: "/images/energia/slide-2.jpg",
    alt: "Proyecto energía 4",
  },
];

export default function EnergiaGallery() {
  return (
    <Section id="galeria">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-3xl font-semibold md:text-4xl">
          {energia.sections.galleryTitle}
        </h2>
        <p className="mt-3 text-sm text-[var(--muted)] md:text-base">
          {energia.sections.gallerySubtitle}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {images.map((image, index) => (
          <Reveal key={image.src} delay={index * 0.04}>
            <div className="group relative h-48 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 md:h-56">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/70 via-transparent to-transparent" />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
