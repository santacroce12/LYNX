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
      <div className="mb-8 max-w-2xl">
        <Reveal>
          <span className="section-kicker">Proyectos</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-heading mt-4">
            Proyectos destacados de {filterCategory}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="section-copy mt-4">
            Explorá casos reales y abrí el detalle completo en nuestra sección
            de recursos.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
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
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/82 via-transparent to-transparent" />
                </div>

                <div className="space-y-3 px-5 py-5">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-[1.15rem] font-semibold leading-[1.05] text-[var(--text-strong)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                      {item.summary}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[var(--accent-soft)]">
                    <span className="h-px w-8 bg-[var(--accent)]/60" />
                    Ver detalle
                  </div>
                </div>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
