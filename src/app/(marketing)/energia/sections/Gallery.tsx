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
      <div className="mb-7 max-w-2xl">
        <h2 className="section-heading">{energia.sections.galleryTitle}</h2>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)] md:text-base">
          {energia.sections.gallerySubtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((image, index) => (
          <Reveal key={image.src} delay={index * 0.04}>
            <div className="panel-shell group relative overflow-hidden rounded-[1.5rem] p-2.5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.15rem] border border-white/8">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.08)_0%,rgba(4,8,16,0.14)_34%,rgba(4,8,16,0.68)_100%)]" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
