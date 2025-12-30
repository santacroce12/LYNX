import Image from "next/image";
import Link from "next/link";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import Reveal from "@/components/motion/Reveal";
import { recursos } from "@/content/recursos";

type FeaturedProjectsProps = {
  filterCategory: "Energía" | "Tecnología";
};

export default function FeaturedProjects({
  filterCategory,
}: FeaturedProjectsProps) {
  const items = recursos.cases
    .filter((item) => item.category === filterCategory)
    .slice(0, 3);

  if (items.length === 0) {
    return null;
  }

  return (
    <Section>
      <div className="mb-10 max-w-2xl">
        <Reveal>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Proyectos destacados de {filterCategory}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 text-sm text-[var(--muted)] md:text-base">
            Explorá casos reales y abrí el detalle completo en nuestra sección de
            recursos.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.05}>
            <Link
              href={`/recursos?id=${item.id}`}
              className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              aria-label={`Ver caso ${item.title}`}
            >
              <Card className="h-full overflow-hidden p-0 transition duration-300 ease-out-expo group-hover:-translate-y-1 group-hover:shadow-glow">
                <div className="relative h-40">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/70 via-transparent to-transparent" />
                </div>
                <div className="space-y-3 px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {item.summary}
                    </p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                    Ver detalle
                  </p>
                </div>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
