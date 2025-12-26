"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import Reveal from "@/components/motion/Reveal";
import { recursos } from "@/content/recursos";

export default function RecursosGrid() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeCase = useMemo(
    () => recursos.cases.find((item) => item.id === activeId) ?? null,
    [activeId]
  );

  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";
    return undefined;
  }, [activeId]);

  useEffect(() => {
    if (!activeId) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeId]);

  return (
    <Section id="recursos">
      <div className="mb-10 max-w-2xl">
        <Reveal>
          <h2 className="text-3xl font-semibold md:text-4xl">
            {recursos.sections.casesTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 text-sm text-[var(--muted)] md:text-base">
            {recursos.sections.casesSubtitle}
          </p>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {recursos.cases.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.05}>
            <button
              type="button"
              onClick={() => setActiveId(item.id)}
              className="group h-full text-left"
              aria-haspopup="dialog"
            >
              <Card className="h-full overflow-hidden p-0">
                <div className="relative h-44">
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
                    {item.tags.map((tag) => (
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
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {activeCase ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-6 py-10"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="absolute inset-0 cursor-default bg-[var(--bg)]/80 backdrop-blur-sm"
              aria-label="Cerrar"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={recursos.sections.detailTitle}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
              initial={reduceMotion ? false : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative h-56">
                <Image
                  src={activeCase.image}
                  alt={activeCase.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/85 via-[var(--bg)]/10 to-transparent" />
                <div className="absolute right-4 top-4">
                  <button
                    type="button"
                    onClick={() => setActiveId(null)}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)]/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)] transition hover:text-[var(--text)]"
                  >
                    Cerrar
                  </button>
                </div>
                <div className="absolute bottom-5 left-6 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {activeCase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-semibold text-[var(--text)]">
                    {activeCase.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)]">
                    {activeCase.subtitle}
                  </p>
                </div>
              </div>

              <div className="max-h-[65vh] overflow-y-auto px-6 py-6">
                <p className="text-sm text-[var(--muted)] md:text-base">
                  {activeCase.description}
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {activeCase.details.map((detail) => (
                    <Card key={detail.title} className="h-full">
                      <h4 className="text-sm font-semibold text-[var(--text)]">
                        {detail.title}
                      </h4>
                      <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                        {detail.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>

                <div className="mt-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                    {recursos.sections.galleryTitle}
                  </p>
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    {activeCase.gallery.map((image) => (
                      <div
                        key={image}
                        className="relative h-32 overflow-hidden rounded-2xl border border-[var(--border)]"
                      >
                        <Image
                          src={image}
                          alt={activeCase.title}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
