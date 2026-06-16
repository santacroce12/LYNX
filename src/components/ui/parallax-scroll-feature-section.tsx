"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  BarChart3,
  MapPinned,
  Network,
  RadioTower,
  RefreshCcw,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type ParallaxFeatureTone = "energy" | "technology";

type ParallaxFeatureItem = {
  title: string;
  description: string;
  image: string;
  alt?: string;
  kicker: string;
  icon?: string;
  reverse?: boolean;
};

type ParallaxScrollFeatureSectionProps = {
  items: ParallaxFeatureItem[];
  tone?: ParallaxFeatureTone;
  className?: string;
  imageAspectClassName?: string;
};

const icons: Record<string, LucideIcon> = {
  bolt: Zap,
  chart: BarChart3,
  map: MapPinned,
  network: Network,
  radio: RadioTower,
  refresh: RefreshCcw,
  workflow: Workflow,
};

const toneStyles = {
  energy: {
    accentText: "text-[var(--accent-soft)]",
    iconWrap:
      "border-[rgba(255,194,131,0.22)] bg-[rgba(255,122,26,0.08)] text-[var(--accent-soft)]",
    imageGlow:
      "shadow-[0_18px_54px_rgba(255,122,26,0.14),0_0_0_1px_rgba(255,194,131,0.07)]",
    imageOverlay:
      "bg-[linear-gradient(180deg,rgba(4,8,16,0.02)_0%,rgba(4,8,16,0.16)_36%,rgba(4,8,16,0.72)_100%)]",
    surfaceWash:
      "bg-[radial-gradient(circle_at_18%_18%,rgba(255,122,26,0.14),transparent_34%),radial-gradient(circle_at_84%_76%,rgba(255,194,131,0.08),transparent_28%)]",
  },
  technology: {
    accentText: "text-[var(--accent-cool)]",
    iconWrap:
      "border-[rgba(125,168,255,0.22)] bg-[rgba(125,168,255,0.08)] text-[var(--accent-cool)]",
    imageGlow:
      "shadow-[0_18px_54px_rgba(125,168,255,0.12),0_0_0_1px_rgba(125,168,255,0.08)]",
    imageOverlay:
      "bg-[linear-gradient(180deg,rgba(4,8,16,0.02)_0%,rgba(4,8,16,0.14)_34%,rgba(4,8,16,0.64)_100%)]",
    surfaceWash:
      "bg-[radial-gradient(circle_at_18%_18%,rgba(125,168,255,0.14),transparent_34%),radial-gradient(circle_at_84%_76%,rgba(125,168,255,0.08),transparent_28%)]",
  },
} as const;

function ParallaxFeatureItem({
  item,
  index,
  tone,
  imageAspectClassName,
}: {
  item: ParallaxFeatureItem;
  index: number;
  tone: ParallaxFeatureTone;
  imageAspectClassName: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "center 52%"],
  });

  const imageDirection = item.reverse ? 1 : -1;
  const textDirection = imageDirection * -1;
  const textX = useTransform(
    scrollYProgress,
    [0, 0.74],
    [reduceMotion ? 0 : 54 * textDirection, 0],
  );
  const imageX = useTransform(
    scrollYProgress,
    [0, 0.74],
    [reduceMotion ? 0 : 84 * imageDirection, 0],
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.75],
    [reduceMotion ? 1 : 0.96, 1],
  );
  const imageOpacity = useTransform(scrollYProgress, [0, 0.32], [0.38, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [0.45, 1]);
  const clipStart = item.reverse
    ? "inset(0 0 0 16% round 1.15rem)"
    : "inset(0 16% 0 0 round 1.15rem)";
  const imageClip = useTransform(
    scrollYProgress,
    [0, 0.76],
    [reduceMotion ? "inset(0 0 0 0 round 1.15rem)" : clipStart, "inset(0 0 0 0 round 1.15rem)"],
  );

  const Icon = item.icon ? icons[item.icon] : null;
  const toneStyle = toneStyles[tone];

  return (
    <div
      ref={ref}
      className="relative flex min-h-[33rem] items-center py-4 md:min-h-[38rem] md:py-6 lg:min-h-[74vh] lg:py-0 xl:min-h-[80vh]"
    >
      <div
        className={cn(
          "grid w-full gap-4 lg:grid-cols-[minmax(0,1.02fr)_minmax(340px,0.98fr)] lg:items-center lg:gap-10 xl:gap-14",
          item.reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <motion.div
          style={{ x: imageX, scale: imageScale }}
          className="w-full"
        >
          <div
            className={cn(
              "panel-shell overflow-hidden rounded-[1.7rem] p-2.5",
              toneStyle.imageGlow,
            )}
          >
            <motion.div
              style={{ opacity: imageOpacity, clipPath: imageClip }}
              className={cn(
                "relative overflow-hidden rounded-[1.15rem] border border-white/8",
                imageAspectClassName,
              )}
            >
              <Image
                src={item.image}
                alt={item.alt ?? item.title}
                fill
                loading={index < 2 ? "eager" : "lazy"}
                priority={index < 2}
                sizes="(min-width: 1280px) 720px, (min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className={cn("absolute inset-0", toneStyle.imageOverlay)} />
              <div className={cn("absolute inset-0 opacity-80", toneStyle.surfaceWash)} />
            </motion.div>
          </div>
        </motion.div>

        <motion.article
          style={{ x: textX, opacity: textOpacity }}
          className="panel-shell relative overflow-hidden rounded-[1.7rem] px-4 py-5 md:px-6 md:py-6 lg:px-7 lg:py-7"
        >
          <div className="pointer-events-none absolute inset-0 panel-grid opacity-[0.08]" />
          <div className="relative flex min-h-[16rem] flex-col justify-center md:min-h-[18rem] lg:min-h-[20rem]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                {Icon ? (
                  <span
                    className={cn(
                      "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.95rem] border",
                      toneStyle.iconWrap,
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                ) : null}
                <span className={cn("section-kicker", toneStyle.accentText)}>
                  {item.kicker}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted-soft)]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="max-w-lg text-[1.28rem] font-semibold leading-[1.04] text-[var(--text-strong)] md:text-[1.9rem] lg:text-[2.1rem]">
              {item.title}
            </h3>
            <p className="mt-4 max-w-xl text-[0.97rem] leading-7 text-[var(--muted)] md:text-[1.02rem] md:leading-8 lg:max-w-[33rem]">
              {item.description}
            </p>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

export function ParallaxScrollFeatureSection({
  items,
  tone = "technology",
  className,
  imageAspectClassName = "aspect-[4/3] md:aspect-[16/10]",
}: ParallaxScrollFeatureSectionProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {items.map((item, index) => (
        <ParallaxFeatureItem
          key={`${item.title}-${index}`}
          item={item}
          index={index}
          tone={tone}
          imageAspectClassName={imageAspectClassName}
        />
      ))}
    </div>
  );
}

export default ParallaxScrollFeatureSection;
