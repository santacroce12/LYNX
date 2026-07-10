"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Copy, X } from "lucide-react";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { recursos } from "@/content/recursos";
import type { RecursoCaso, RecursoDesign } from "@/content/recursos";

type CasesResponse = {
  success?: boolean;
  cases?: RecursoCaso[];
};

const fallbackResourceImages = [
  "/images/recursos/Nihuil.optimized.webp",
  "/images/recursos/villahipodromo.optimized.webp",
  "/images/recursos/antenaespacioprofundo.optimized.webp",
  "/images/recursos/hero-recursos-lynx.webp",
];

type ResourceImageProps = {
  src?: string;
  alt: string;
  sizes: string;
  className: string;
};

function getFallbackResourceImage(seed: string) {
  const hash = seed.split("").reduce((total, char) => {
    return (total * 31 + char.charCodeAt(0)) >>> 0;
  }, 7);

  return fallbackResourceImages[hash % fallbackResourceImages.length];
}

function ResourceImage({ src, alt, sizes, className }: ResourceImageProps) {
  const fallbackSrc = useMemo(() => getFallbackResourceImage(alt), [alt]);
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
  }, [fallbackSrc, src]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}

type NormalizedDesign = Required<RecursoDesign>;

const defaultDesign: NormalizedDesign = {
  card: "compact",
  accent: "orange",
  image: "cover",
  detail: "cards",
};

const cardStyles: Record<
  NormalizedDesign["card"],
  {
    article: string;
    media: string;
    body: string;
    title: string;
    summary: string;
  }
> = {
  compact: {
    article: "min-h-[25rem]",
    media: "m-3 mb-0 aspect-[16/9] rounded-[0.9rem]",
    body: "px-4 pb-4 pt-4",
    title: "text-base leading-[1.08] md:text-[1.08rem]",
    summary: "text-[13px] leading-6",
  },
  visual: {
    article: "min-h-[31rem]",
    media: "m-0 aspect-square rounded-none",
    body: "px-5 pb-5 pt-4 md:px-5 md:pb-5",
    title: "text-[1.18rem] leading-[1.08] md:text-xl md:leading-[1.02]",
    summary: "text-sm leading-6",
  },
  technical: {
    article: "min-h-[27rem] border-l-4",
    media: "m-3 mb-0 aspect-[16/10] rounded-[0.75rem]",
    body: "px-4 pb-4 pt-4",
    title: "text-[1.05rem] leading-[1.1] md:text-lg",
    summary: "text-[13px] leading-6",
  },
};

const accentStyles: Record<
  NormalizedDesign["accent"],
  {
    hoverBorder: string;
    technicalBorder: string;
    topLine: string;
    overlay: string;
    tag: string;
    title: string;
    cta: string;
    line: string;
    detailTitle: string;
    bullet: string;
  }
> = {
  orange: {
    hoverBorder: "group-hover:border-[rgba(247,208,163,0.24)]",
    technicalBorder: "border-l-[rgba(247,208,163,0.58)]",
    topLine: "bg-[linear-gradient(90deg,transparent,rgba(247,208,163,0.34),rgba(170,166,246,0.22),transparent)]",
    overlay: "bg-[radial-gradient(circle_at_50%_0%,rgba(247,208,163,0.16),transparent_46%),linear-gradient(180deg,rgba(5,8,18,0)_0%,rgba(5,8,18,0.88)_100%)]",
    tag: "group-hover:border-[rgba(247,208,163,0.18)]",
    title: "group-hover:text-[#f7d0a3]",
    cta: "text-[#f7d0a3]",
    line: "bg-[linear-gradient(90deg,#5959c9,rgba(247,208,163,0.76))]",
    detailTitle: "text-[#f7d0a3]",
    bullet: "bg-[#ef8239]/65",
  },
  violet: {
    hoverBorder: "group-hover:border-[rgba(170,166,246,0.34)]",
    technicalBorder: "border-l-[rgba(170,166,246,0.68)]",
    topLine: "bg-[linear-gradient(90deg,transparent,rgba(170,166,246,0.42),rgba(247,208,163,0.18),transparent)]",
    overlay: "bg-[radial-gradient(circle_at_50%_0%,rgba(170,166,246,0.18),transparent_46%),linear-gradient(180deg,rgba(5,8,18,0)_0%,rgba(5,8,18,0.88)_100%)]",
    tag: "group-hover:border-[rgba(170,166,246,0.24)]",
    title: "group-hover:text-[#aaa6f6]",
    cta: "text-[#aaa6f6]",
    line: "bg-[linear-gradient(90deg,#5959c9,rgba(170,166,246,0.82))]",
    detailTitle: "text-[#aaa6f6]",
    bullet: "bg-[#aaa6f6]/70",
  },
  blue: {
    hoverBorder: "group-hover:border-[rgba(56,189,248,0.32)]",
    technicalBorder: "border-l-[rgba(56,189,248,0.68)]",
    topLine: "bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.42),rgba(170,166,246,0.16),transparent)]",
    overlay: "bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.16),transparent_46%),linear-gradient(180deg,rgba(5,8,18,0)_0%,rgba(5,8,18,0.88)_100%)]",
    tag: "group-hover:border-[rgba(56,189,248,0.24)]",
    title: "group-hover:text-[#7dd3fc]",
    cta: "text-[#7dd3fc]",
    line: "bg-[linear-gradient(90deg,#5959c9,rgba(56,189,248,0.84))]",
    detailTitle: "text-[#7dd3fc]",
    bullet: "bg-[#38bdf8]/70",
  },
  green: {
    hoverBorder: "group-hover:border-[rgba(51,209,122,0.32)]",
    technicalBorder: "border-l-[rgba(51,209,122,0.68)]",
    topLine: "bg-[linear-gradient(90deg,transparent,rgba(51,209,122,0.42),rgba(247,208,163,0.16),transparent)]",
    overlay: "bg-[radial-gradient(circle_at_50%_0%,rgba(51,209,122,0.16),transparent_46%),linear-gradient(180deg,rgba(5,8,18,0)_0%,rgba(5,8,18,0.88)_100%)]",
    tag: "group-hover:border-[rgba(51,209,122,0.24)]",
    title: "group-hover:text-[#8af0b5]",
    cta: "text-[#8af0b5]",
    line: "bg-[linear-gradient(90deg,#5959c9,rgba(51,209,122,0.84))]",
    detailTitle: "text-[#8af0b5]",
    bullet: "bg-[#33d17a]/70",
  },
};

function normalizeDesign(design?: RecursoDesign): NormalizedDesign {
  const allowed = {
    card: ["compact", "visual", "technical"],
    accent: ["orange", "violet", "blue", "green"],
    image: ["cover", "contain"],
    detail: ["cards", "list"],
  } as const;

  const card = design?.card ?? defaultDesign.card;
  const accent = design?.accent ?? defaultDesign.accent;
  const image = design?.image ?? defaultDesign.image;
  const detail = design?.detail ?? defaultDesign.detail;

  return {
    card: allowed.card.includes(card) ? card : defaultDesign.card,
    accent: allowed.accent.includes(accent) ? accent : defaultDesign.accent,
    image: allowed.image.includes(image) ? image : defaultDesign.image,
    detail: allowed.detail.includes(detail) ? detail : defaultDesign.detail,
  };
}

function RecursosGridContent() {
  const reduceMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [cases, setCases] = useState<RecursoCaso[]>(recursos.cases);
  const [copied, setCopied] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const activeId = searchParams.get("id");
  const activeCase = useMemo(
    () => cases.find((item) => item.id === activeId) ?? null,
    [activeId, cases],
  );
  const activeDesign = useMemo(
    () => normalizeDesign(activeCase?.design),
    [activeCase],
  );
  const activeAccent = accentStyles[activeDesign.accent];
  const activeMedia = useMemo(() => {
    if (!activeCase) return [];

    return Array.from(
      new Set(
        [activeCase.image, ...(activeCase.gallery ?? [])].filter(Boolean),
      ),
    );
  }, [activeCase]);
  const currentMedia = activeMedia[activeMediaIndex] ?? activeCase?.image;

  const closeCase = () => {
    router.push(pathname, { scroll: false });
  };

  const copyCaseLink = async (caseId: string) => {
    const url = new URL(window.location.href);
    url.pathname = pathname;
    url.search = "";
    url.searchParams.set("id", caseId);

    await navigator.clipboard.writeText(url.toString());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  useEffect(() => {
    let cancelled = false;

    async function loadCases() {
      try {
        const response = await fetch("/api/cases.php", {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) return;

        const data = (await response.json()) as CasesResponse;
        if (!cancelled && data.success && Array.isArray(data.cases)) {
          setCases(data.cases);
        }
      } catch {
        // Keep the bundled cases as a safe fallback when the PHP API is unavailable.
      }
    }

    loadCases();

    return () => {
      cancelled = true;
    };
  }, []);

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
    setActiveMediaIndex(0);
    setCopied(false);
  }, [activeId]);

  useEffect(() => {
    if (!activeId) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCase();
      if (event.key === "ArrowLeft" && activeMedia.length > 1) {
        setActiveMediaIndex((index) =>
          index === 0 ? activeMedia.length - 1 : index - 1,
        );
      }
      if (event.key === "ArrowRight" && activeMedia.length > 1) {
        setActiveMediaIndex((index) => (index + 1) % activeMedia.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeId, activeMedia.length, pathname, router]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Section id="recursos" className="pt-4 pb-12 md:pt-10 md:pb-20">
      <div className="mb-7 max-w-2xl md:mb-10">
        <Reveal>
          <h2 className="section-heading">{recursos.sections.casesTitle}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)] md:text-base">
            {recursos.sections.casesSubtitle}
          </p>
        </Reveal>
      </div>

      {cases.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cases.map((item, index) => {
            const design = normalizeDesign(item.design);
            const card = cardStyles[design.card];
            const accent = accentStyles[design.accent];
            const imageClass =
              design.image === "contain"
                ? "z-10 object-contain p-3 transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.035]"
                : "z-0 scale-[1.012] object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.075]";

            return (
              <Reveal key={item.id} delay={index * 0.05}>
                <Link
                  href={`/recursos?id=${item.id}`}
                  scroll={false}
                  className="group block h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
                  aria-label={`Leer caso ${item.title}`}
                >
                  <article
                    className={[
                      "relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(24,15,60,0.92)_0%,rgba(10,5,29,0.98)_100%)] shadow-[0_24px_70px_rgba(3,2,18,0.26),inset_0_1px_0_rgba(255,255,255,0.045)] transition duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_30px_82px_rgba(3,2,18,0.36),0_0_0_1px_rgba(247,208,163,0.06),inset_0_1px_0_rgba(255,255,255,0.055)]",
                      card.article,
                      accent.hoverBorder,
                      design.card === "technical" ? accent.technicalBorder : "",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "pointer-events-none absolute inset-x-5 top-0 h-px opacity-70",
                        accent.topLine,
                      ].join(" ")}
                    />

                    {design.card === "visual" ? (
                      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span
                            className={[
                              "h-2 w-2 flex-shrink-0 rounded-full shadow-[0_0_14px_currentColor]",
                              accent.bullet,
                            ].join(" ")}
                          />
                          <span className="truncate text-[11px] font-semibold uppercase tracking-[0.16em] text-white/76">
                            {item.category || "Caso de éxito"}
                          </span>
                        </div>
                        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/42">
                          Lynx
                        </span>
                      </div>
                    ) : null}

                    <div
                      className={[
                        "relative shrink-0 overflow-hidden bg-[#050815] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07),0_18px_38px_rgba(0,0,0,0.22)]",
                        card.media,
                      ].join(" ")}
                    >
                      {design.image === "contain" ? (
                        <ResourceImage
                          src={item.image}
                          alt={`${item.title} fondo`}
                          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="z-0 scale-110 object-cover opacity-35 blur-xl"
                        />
                      ) : null}
                      <ResourceImage
                        src={item.image}
                        alt={item.title}
                        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className={imageClass}
                      />
                      <div className="pointer-events-none absolute -inset-px z-10 bg-[linear-gradient(180deg,rgba(5,8,18,0.02)_0%,rgba(5,8,18,0.1)_38%,rgba(5,8,18,0.78)_100%)]" />
                      <div
                        className={[
                          "pointer-events-none absolute -inset-px z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                          accent.overlay,
                        ].join(" ")}
                      />
                    </div>

                    <div className={["flex flex-1 flex-col", card.body].join(" ")}>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className={[
                              "rounded-full border border-white/[0.1] bg-white/[0.035] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-normal text-[var(--muted)] transition duration-300 group-hover:text-[var(--text)] md:tracking-[0.16em]",
                              accent.tag,
                            ].join(" ")}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex-1">
                        <h3
                          className={[
                            "font-semibold text-[var(--text)] transition-colors [overflow-wrap:anywhere]",
                            card.title,
                            accent.title,
                          ].join(" ")}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={[
                            "mt-3 text-[var(--text)]/72 [overflow-wrap:anywhere]",
                            card.summary,
                          ].join(" ")}
                        >
                          {item.summary}
                        </p>
                      </div>

                      <div
                          className={[
                            "mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-normal transition-colors duration-300 group-hover:brightness-125 md:tracking-[0.18em]",
                            accent.cta,
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "h-px w-8 flex-shrink-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100",
                            accent.line,
                          ].join(" ")}
                        />
                        Leer caso completo
                      </div>
                    </div>
                  </article>
                </Link>
              </Reveal>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[1.25rem] border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-5 py-8 text-sm leading-7 text-[var(--muted)]">
          No hay casos publicados por el momento.
        </div>
      )}

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
        {activeCase ? (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center px-3 py-4 sm:px-6 md:py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/78 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCase}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="resource-dialog-title"
              className="relative max-h-[94dvh] w-full max-w-6xl overflow-y-auto rounded-[1.1rem] border border-white/10 bg-[#09051b] shadow-[0_35px_120px_rgba(0,0,0,0.62)] md:grid md:h-[min(780px,90dvh)] md:max-h-none md:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] md:grid-rows-[auto_minmax(0,1fr)_auto] md:overflow-hidden md:rounded-[1.4rem]"
              initial={
                reduceMotion ? false : { y: 20, opacity: 0, scale: 0.96 }
              }
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
            >
              <button
                type="button"
                onClick={closeCase}
                className="absolute right-3 top-3 z-30 rounded-full border border-white/15 bg-[#09051b]/85 p-2.5 text-white shadow-lg backdrop-blur-md transition hover:border-white/30 hover:bg-[#120b2b] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:right-4 md:top-4"
              >
                <span className="sr-only">Cerrar</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="grid border-b border-white/[0.08] md:contents">
                <div className="relative h-[38dvh] min-h-[17rem] overflow-hidden bg-black sm:min-h-[22rem] md:col-start-1 md:row-span-3 md:h-auto md:min-h-0">
                  {activeDesign.image === "contain" ? (
                    <ResourceImage
                      src={currentMedia}
                      alt={`${activeCase.title} fondo`}
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="scale-110 object-cover opacity-40 blur-2xl"
                    />
                  ) : null}
                  <ResourceImage
                    key={currentMedia}
                    src={currentMedia}
                    alt={`${activeCase.title}, imagen ${activeMediaIndex + 1}`}
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className={
                      activeDesign.image === "contain"
                        ? "z-10 object-contain p-6 md:p-10"
                        : "object-cover"
                    }
                  />
                  <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(5,8,18,0.03)_0%,rgba(5,8,18,0.08)_48%,rgba(5,8,18,0.74)_100%)]" />
                  <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/78 md:bottom-7 md:left-7">
                    <span
                      className={[
                        "h-2 w-2 rounded-full shadow-[0_0_14px_currentColor]",
                        activeAccent.bullet,
                      ].join(" ")}
                    />
                    {activeCase.category || "Caso de éxito"}
                  </div>

                  {activeMedia.length > 1 ? (
                    <>
                      <div className="absolute left-5 top-5 z-20 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[11px] font-semibold text-white/85 backdrop-blur-md">
                        {activeMediaIndex + 1} / {activeMedia.length}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMediaIndex((index) =>
                            index === 0 ? activeMedia.length - 1 : index - 1,
                          )
                        }
                        className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/15 bg-black/45 p-2.5 text-white backdrop-blur-md transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:left-5"
                      >
                        <span className="sr-only">Imagen anterior</span>
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMediaIndex(
                            (index) => (index + 1) % activeMedia.length,
                          )
                        }
                        className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/15 bg-black/45 p-2.5 text-white backdrop-blur-md transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:right-5"
                      >
                        <span className="sr-only">Imagen siguiente</span>
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <div className="absolute bottom-5 right-5 z-30 flex max-w-[50%] flex-wrap justify-end gap-1.5 md:bottom-7 md:right-7">
                        {activeMedia.map((image, index) => (
                          <button
                            key={`${image}-${index}`}
                            type="button"
                            onClick={() => setActiveMediaIndex(index)}
                            className={[
                              "h-1.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
                              index === activeMediaIndex
                                ? "w-5 bg-white"
                                : "w-1.5 bg-white/40 hover:bg-white/70",
                            ].join(" ")}
                          >
                            <span className="sr-only">Ver imagen {index + 1}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>

                <div className="relative overflow-hidden border-b border-white/[0.08] px-5 py-6 sm:px-7 md:col-start-2 md:row-start-1 md:min-h-0 md:px-6 md:py-6">
                  <div
                    className={[
                      "pointer-events-none absolute inset-0 opacity-70",
                      activeAccent.overlay,
                    ].join(" ")}
                  />
                  <div className="relative z-10 pr-10">
                    <div className="mb-5 flex flex-wrap gap-2">
                      {activeCase.tags.map((tag) => (
                        <span
                          key={tag}
                          className={[
                            "rounded-full border border-white/[0.12] bg-white/[0.045] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80",
                            activeAccent.tag,
                          ].join(" ")}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3
                      id="resource-dialog-title"
                      className="text-[1.65rem] font-bold leading-[1.06] text-white [overflow-wrap:anywhere] sm:text-3xl md:text-[2rem]"
                    >
                      {activeCase.title}
                    </h3>
                    <p className="mt-4 text-sm font-medium leading-6 text-white/68 [overflow-wrap:anywhere] md:text-base md:leading-7">
                      {activeCase.subtitle}
                    </p>
                  </div>

                </div>
              </div>

              <div className="px-5 py-7 sm:px-7 md:col-start-2 md:row-start-2 md:min-h-0 md:overflow-y-auto md:px-6 md:py-6">
                <div>
                  <p className="text-base font-semibold leading-7 text-white [overflow-wrap:anywhere]">
                    {activeCase.summary}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--text)]/78 [overflow-wrap:anywhere]">
                    {activeCase.description}
                  </p>
                </div>

                {activeDesign.detail === "list" ? (
                  <div
                    className={
                      activeCase.details.length > 0
                        ? "mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]"
                        : "hidden"
                    }
                  >
                    {activeCase.details.map((detail) => (
                      <div
                        key={detail.title}
                        className="py-5"
                      >
                        <h4
                          className={[
                            "mb-3 text-sm font-bold uppercase tracking-normal md:tracking-wider",
                            activeAccent.detailTitle,
                          ].join(" ")}
                        >
                          {detail.title}
                        </h4>
                        <ul className="grid gap-2.5">
                          {detail.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-[var(--muted)]"
                            >
                              <span
                                className={[
                                  "mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full",
                                  activeAccent.bullet,
                                ].join(" ")}
                              />
                              <span className="[overflow-wrap:anywhere]">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className={
                      activeCase.details.length > 0
                        ? "mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]"
                        : "hidden"
                    }
                  >
                    {activeCase.details.map((detail) => (
                      <div
                        key={detail.title}
                        className="border-l-2 border-l-white/[0.12] py-5 pl-4"
                      >
                        <h4
                          className={[
                            "mb-3 text-sm font-bold uppercase tracking-normal md:tracking-wider",
                            activeAccent.detailTitle,
                          ].join(" ")}
                        >
                          {detail.title}
                        </h4>
                        <ul className="space-y-2">
                          {detail.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-[var(--muted)]"
                            >
                              <span
                                className={[
                                  "mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full",
                                  activeAccent.bullet,
                                ].join(" ")}
                              />
                              <span className="[overflow-wrap:anywhere]">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {activeMedia.length > 1 && (
                  <div className="mt-8">
                    <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                      Imágenes del caso
                    </h4>
                    <div className="grid grid-cols-4 gap-2.5">
                      {activeMedia.map((img, idx) => (
                        <button
                          key={`${img}-${idx}`}
                          type="button"
                          onClick={() => setActiveMediaIndex(idx)}
                          className={[
                            "group relative aspect-square overflow-hidden rounded-[0.65rem] border bg-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
                            idx === activeMediaIndex
                              ? "border-white/70 opacity-100"
                              : "border-white/10 opacity-55 hover:border-white/30 hover:opacity-100",
                          ].join(" ")}
                        >
                          <ResourceImage
                            src={img}
                            alt={`Ver imagen ${idx + 1} de ${activeCase.title}`}
                            sizes="100px"
                            className="object-cover transition duration-300 group-hover:scale-105"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/[0.08] bg-[#080515] px-5 py-4 sm:px-7 md:col-start-2 md:row-start-3 md:px-6">
                <button
                  type="button"
                  onClick={() => copyCaseLink(activeCase.id)}
                  className={[
                    "inline-flex min-h-10 items-center justify-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                    copied
                      ? "border-[#33d17a]/45 bg-[#33d17a]/10 text-[#8af0b5]"
                      : "border-white/15 bg-white/[0.07] text-white hover:border-white/25 hover:bg-white/[0.12]",
                  ].join(" ")}
                >
                  {copied ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  {copied ? "Copiado" : "Copiar link"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
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
