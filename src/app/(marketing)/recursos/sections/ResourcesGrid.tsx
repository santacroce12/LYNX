"use client";

import { Suspense, useEffect, useMemo } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import Reveal from "@/components/motion/Reveal";
import { recursos } from "@/content/recursos";

function RecursosGridContent() {
  const reduceMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeId = searchParams.get("id");
  const activeCase = useMemo(
    () => recursos.cases.find((item) => item.id === activeId) ?? null,
    [activeId]
  );

  const openCase = (id: string) => {
    router.push(`${pathname}?id=${id}`, { scroll: false });
  };

  const closeCase = () => {
    router.push(pathname, { scroll: false });
  };

  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeId]);

  useEffect(() => {
    if (!activeId) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCase();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeId, pathname, router]); // eslint-disable-line react-hooks/exhaustive-deps

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
              onClick={() => openCase(item.id)}
              className="group h-full text-left focus:outline-none"
              aria-haspopup="dialog"
            >
              <Card className="h-full overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-44">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent" />
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
                    <h3 className="text-lg font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--muted)] line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
                    Leer caso completo &rarr;
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
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCase}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
              initial={reduceMotion ? false : { y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="relative h-48 flex-shrink-0 sm:h-64">
                <Image
                  src={activeCase.image}
                  alt={activeCase.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/20 to-transparent" />

                <button
                  type="button"
                  onClick={closeCase}
                  className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white backdrop-blur-md transition hover:bg-black/40"
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {activeCase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text)] drop-shadow-sm md:text-4xl">
                    {activeCase.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[var(--text)]/80 md:text-base">
                    {activeCase.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10">
                <div className="prose prose-neutral max-w-none dark:prose-invert">
                  <p className="text-lg leading-relaxed text-[var(--text)]/90">
                    {activeCase.description}
                  </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  {activeCase.details.map((detail) => (
                    <div
                      key={detail.title}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--bg)]/50 p-5"
                    >
                      <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
                        {detail.title}
                      </h4>
                      <ul className="space-y-2">
                        {detail.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-[var(--muted)]"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--text)]/30" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {activeCase.gallery && activeCase.gallery.length > 0 && (
                  <div className="mt-12">
                    <h4 className="mb-6 border-b border-[var(--border)] pb-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                      Galer?a del Proyecto
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {activeCase.gallery.map((img, idx) => (
                        <div
                          key={`${img}-${idx}`}
                          className="group relative aspect-video overflow-hidden rounded-xl border border-[var(--border)]"
                        >
                          <Image
                            src={img}
                            alt={`Galer?a ${activeCase.title} ${idx + 1}`}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Section>
  );
}

export default function RecursosGrid() {
  return (
    <Suspense fallback={<div className="min-h-[50vh]" />}>
      <RecursosGridContent />
    </Suspense>
  );
}
