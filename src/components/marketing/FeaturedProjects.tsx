"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import Reveal from "@/components/motion/Reveal";
import { recursos } from "@/content/recursos";
import type { RecursoCaso } from "@/content/recursos";

type CasesResponse = {
  success?: boolean;
  cases?: RecursoCaso[];
};

type FeaturedProjectsProps = {
  filterCategory: "Energía" | "Tecnología";
};

function FeaturedProjectImage({ item }: { item: RecursoCaso }) {
  const fallback =
    item.category === "Tecnología"
      ? "/images/tecnologia/generated/caso-operaciones-conectadas.optimized.webp"
      : "/images/recursos/hero-recursos-lynx.webp";
  const [currentSrc, setCurrentSrc] = useState(item.image || fallback);

  useEffect(() => {
    setCurrentSrc(item.image || fallback);
  }, [fallback, item.image]);

  return (
    <Image
      src={currentSrc}
      alt={item.title}
      fill
      sizes="(min-width: 768px) 33vw, 100vw"
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      onError={() => {
        if (currentSrc !== fallback) {
          setCurrentSrc(fallback);
        }
      }}
    />
  );
}

export default function FeaturedProjects({
  filterCategory,
}: FeaturedProjectsProps) {
  const [items, setItems] = useState<RecursoCaso[]>(() =>
    recursos.cases
      .filter((item) => item.category === filterCategory)
      .slice(0, 3),
  );

  useEffect(() => {
    let cancelled = false;

    async function loadFeaturedCases() {
      try {
        const response = await fetch("/api/cases.php", {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) return;

        const data = (await response.json()) as CasesResponse;
        if (!cancelled && data.success && Array.isArray(data.cases)) {
          setItems(
            data.cases
              .filter(
                (item) =>
                  item.category === filterCategory && item.featured === true,
              )
              .slice(0, 3),
          );
        }
      } catch {
        // Keep the bundled projects visible when the PHP API is unavailable.
      }
    }

    loadFeaturedCases();
    return () => {
      cancelled = true;
    };
  }, [filterCategory]);

  if (items.length === 0) {
    return null;
  }

  return (
    <Section>
      <div className="mb-7 max-w-2xl md:mb-8">
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
                <Card className="flex h-[31rem] flex-col overflow-hidden p-0 transition duration-300 ease-out-expo group-hover:border-[rgba(247,208,163,0.28)] group-hover:shadow-glow">
                <div className="relative h-44 flex-shrink-0">
                  <FeaturedProjectImage item={item} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/82 via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col px-4 py-5 md:px-5">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-[10px] font-semibold uppercase tracking-normal text-[var(--muted)] md:tracking-[0.22em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex-1">
                    <h3 className="text-[1.15rem] font-semibold leading-[1.05] text-[var(--text-strong)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 line-clamp-4 text-sm leading-7 text-[var(--muted)]">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-3">
                    <span className="h-px w-10 bg-[var(--accent)]/60" />
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] text-[var(--accent-soft)] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-[rgba(247,208,163,0.34)] group-hover:bg-white/[0.08]">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
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
