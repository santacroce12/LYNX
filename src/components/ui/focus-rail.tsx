"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageFit?: "contain" | "cover";
  href: string;
  meta: string;
  contribution: string;
  capabilities: string[];
  accent?: string;
};

type FocusRailProps = {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
};

const BASE_SPRING = {
  type: "spring",
  stiffness: 280,
  damping: 32,
  mass: 1,
} as const;

const TAP_SPRING = {
  type: "spring",
  stiffness: 420,
  damping: 24,
  mass: 0.9,
} as const;

function wrapIndex(value: number, count: number) {
  return ((value % count) + count) % count;
}

function itemImageClass(imageFit: FocusRailItem["imageFit"]) {
  return imageFit === "cover" ? "object-cover" : "object-contain";
}

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 6000,
  className,
}: FocusRailProps) {
  const [activeIndex, setActiveIndex] = React.useState(() =>
    items.length ? wrapIndex(initialIndex, items.length) : 0,
  );
  const [isHovering, setIsHovering] = React.useState(false);
  const lastWheelTime = React.useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const count = items.length;

  const selectIndex = React.useCallback(
    (nextIndex: number) => {
      if (!count) return;
      setActiveIndex(loop ? wrapIndex(nextIndex, count) : Math.max(0, Math.min(count - 1, nextIndex)));
    },
    [count, loop],
  );

  const handlePrev = React.useCallback(() => {
    selectIndex(activeIndex - 1);
  }, [activeIndex, selectIndex]);

  const handleNext = React.useCallback(() => {
    selectIndex(activeIndex + 1);
  }, [activeIndex, selectIndex]);

  React.useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const indexFromHash = items.findIndex((item) => item.id === id);
    if (indexFromHash >= 0) setActiveIndex(indexFromHash);
  }, [items]);

  React.useEffect(() => {
    if (!autoPlay || isHovering || prefersReducedMotion || count < 2) return;

    const timer = window.setInterval(handleNext, interval);
    return () => window.clearInterval(timer);
  }, [autoPlay, count, handleNext, interval, isHovering, prefersReducedMotion]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handlePrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      handleNext();
    }
  };

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const isHorizontalGesture = Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
    if (!isHorizontalGesture) return;

    const now = Date.now();
    if (now - lastWheelTime.current < 420) return;

    const delta = event.shiftKey ? event.deltaY : event.deltaX;
    if (Math.abs(delta) < 18) return;

    delta > 0 ? handleNext() : handlePrev();
    lastWheelTime.current = now;
  };

  const onDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipePower = Math.abs(info.offset.x) * info.velocity.x;
    if (swipePower < -8000 || info.offset.x < -80) handleNext();
    if (swipePower > 8000 || info.offset.x > 80) handlePrev();
  };

  if (!count) return null;

  const activeItem = items[activeIndex];
  const visibleOffsets = [-2, -1, 0, 1, 2];
  const accent = activeItem.accent ?? "#aaa6f6";
  const instantTransition = { duration: 0 } as const;

  return (
    <div
      className={cn(
        "group relative isolate w-full overflow-hidden border-y border-white/10 bg-[rgba(7,3,22,0.7)] text-white outline-none select-none",
        className,
      )}
      style={{ "--rail-accent": accent } as React.CSSProperties}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
      tabIndex={0}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Partners tecnológicos de LYNX"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`ambient-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? instantTransition : { duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div className="absolute left-1/2 top-[38%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--rail-accent)] opacity-[0.14] blur-[130px]" />
            <div className="absolute inset-x-[12%] top-[-18%] h-[70%] opacity-[0.13] blur-3xl">
              <Image
                src={activeItem.imageSrc}
                alt=""
                fill
                sizes="100vw"
                className={cn(itemImageClass(activeItem.imageFit), "saturate-150")}
                unoptimized={activeItem.imageSrc.endsWith(".svg")}
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,3,22,0.1)_0%,rgba(7,3,22,0.62)_56%,rgba(7,3,22,0.98)_100%)]" />
          </motion.div>
        </AnimatePresence>
        <div className="panel-grid absolute inset-0 opacity-[0.08] [mask-image:linear-gradient(to_bottom,black,transparent_68%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1320px] flex-col px-4 pb-10 pt-6 sm:px-6 md:pb-12 md:pt-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-soft)]">
              Partners tecnológicos
            </p>
            <p className="mt-2 text-xs text-[var(--muted)]">
              Deslizá o usá las flechas para explorar
            </p>
          </div>
          <span className="font-display text-xs tracking-[0.18em] text-white/35">
            LYNX / ECOSISTEMA
          </span>
        </div>

        <div className="relative mt-3 h-[350px] md:-mt-16 md:h-[520px]">
          <motion.div
            className="absolute inset-0 flex cursor-grab items-center justify-center active:cursor-grabbing [perspective:1400px]"
            drag={prefersReducedMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            dragMomentum={false}
            onDragEnd={onDragEnd}
          >
            <AnimatePresence initial={false}>
              {visibleOffsets.map((offset) => {
                const itemIndex = wrapIndex(activeIndex + offset, count);
                const item = items[itemIndex];

                if (!loop && (activeIndex + offset < 0 || activeIndex + offset >= count)) return null;

                const isCenter = offset === 0;
                const distance = Math.abs(offset);
                const opacity = isCenter ? 1 : Math.max(0.12, 0.72 - distance * 0.28);

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    id={isCenter ? item.id : undefined}
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.78 }}
                    animate={{
                      x: `${offset * 108}%`,
                      z: -distance * 190,
                      scale: isCenter ? 1 : 0.86,
                      rotateY: offset * -17,
                      opacity,
                      filter: `blur(${isCenter ? 0 : distance * 5}px) brightness(${isCenter ? 1 : 0.56})`,
                    }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.76 }}
                    transition={prefersReducedMotion ? instantTransition : isCenter ? TAP_SPRING : BASE_SPRING}
                    style={{ transformStyle: "preserve-3d" }}
                    className={cn(
                      "absolute aspect-[3/4] w-[218px] overflow-hidden rounded-[1.55rem] border border-white/15 bg-[#f4f5f4] text-left shadow-[0_30px_90px_rgba(0,0,0,0.46)] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)] md:w-[320px] lg:w-[348px]",
                      isCenter ? "z-30 cursor-default" : "z-10 cursor-pointer hover:border-white/30",
                    )}
                    onClick={() => !isCenter && selectIndex(itemIndex)}
                    aria-label={isCenter ? `${item.title}, partner activo` : `Ver ${item.title}`}
                    aria-current={isCenter ? "true" : undefined}
                    tabIndex={isCenter ? -1 : 0}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(155deg,#ffffff_0%,#edf0f2_58%,#dfe3e7_100%)]" />
                    <div className="absolute inset-x-0 top-0 h-px bg-white" />
                    <div className="absolute left-5 top-5 z-10 flex items-center gap-2 md:left-6 md:top-6">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--rail-accent)] shadow-[0_0_12px_var(--rail-accent)]" />
                      <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[rgba(36,32,51,0.58)] md:text-[9px]">
                        Partner {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="absolute inset-x-5 top-1/2 h-28 -translate-y-1/2 overflow-hidden rounded-xl md:inset-x-8 md:h-36">
                      <Image
                        src={item.imageSrc}
                        alt={`Logo de ${item.title}`}
                        fill
                        sizes="(max-width: 767px) 190px, 290px"
                        className={itemImageClass(item.imageFit)}
                        unoptimized={item.imageSrc.endsWith(".svg")}
                        priority={isCenter}
                      />
                    </div>
                    <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 border-t border-[#161126]/10 pt-4 md:inset-x-6 md:bottom-6">
                      <span className="max-w-[75%] text-[8px] font-semibold uppercase leading-4 tracking-[0.17em] text-[rgba(36,32,51,0.62)] md:text-[9px]">
                        {item.meta}
                      </span>
                      <ArrowDownRight className="h-4 w-4 shrink-0 text-[rgba(36,32,51,0.46)]" />
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.22),transparent_30%,rgba(16,10,38,0.05))]" />
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <button
            type="button"
            onClick={handlePrev}
            disabled={!loop && activeIndex === 0}
            className="absolute left-0 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-black/65 text-white/72 backdrop-blur-md transition hover:border-white/20 hover:bg-black/85 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 md:left-1 lg:left-3"
            aria-label="Partner anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!loop && activeIndex === count - 1}
            className="absolute right-0 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-black/65 text-white/72 backdrop-blur-md transition hover:border-white/20 hover:bg-black/85 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 md:right-1 lg:right-3"
            aria-label="Siguiente partner"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl gap-7 border-t border-white/10 pt-7 md:gap-8 md:pt-9 lg:grid-cols-[1.05fr_0.95fr_auto] lg:items-start lg:gap-12">
          <div className="min-h-[154px]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`info-${activeItem.id}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={prefersReducedMotion ? instantTransition : { duration: 0.3, ease: "easeOut" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--rail-accent)]">
                  {activeItem.meta}
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.035em] text-[var(--text-strong)] md:text-4xl">
                  {activeItem.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)] md:text-base md:leading-8">
                  {activeItem.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="min-h-[154px] border-l border-[rgba(247,208,163,0.3)] pl-5 md:pl-6" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`contribution-${activeItem.id}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={prefersReducedMotion ? instantTransition : { duration: 0.28, ease: "easeOut" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-soft)]">
                  Aporte a LYNX
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--text)]/84">
                  {activeItem.contribution}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeItem.capabilities.map((capability) => (
                    <span
                      key={capability}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 lg:flex-col lg:items-stretch">
            <div className="flex items-center rounded-full border border-white/10 bg-black/25 p-1 backdrop-blur-md">
              <button
                type="button"
                onClick={handlePrev}
                className="rounded-full p-2.5 text-white/55 transition hover:bg-white/8 hover:text-white active:scale-95"
                aria-label="Partner anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="min-w-[58px] text-center font-display text-[10px] tracking-[0.16em] text-white/42">
                {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="rounded-full p-2.5 text-white/55 transition hover:bg-white/8 hover:text-white active:scale-95"
                aria-label="Siguiente partner"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <a
              href={activeItem.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--text-strong)] px-5 py-3 text-xs font-semibold text-[#0d0820] transition hover:bg-white hover:shadow-[0_0_28px_rgba(255,255,255,0.16)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)]"
            >
              Sitio oficial
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
