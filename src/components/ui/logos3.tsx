"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "@/lib/utils";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Logo {
  id: string;
  description: string;
  image: string;
  href?: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos: Logo[];
  className?: string;
}

export function Logos3({ heading, logos, className }: Logos3Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [isInView, setIsInView] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const autoScroll = useMemo(
    () =>
      AutoScroll({
        direction: "forward",
        playOnInit: true,
        speed: 0.64,
        breakpoints: {
          "(max-width: 639px)": { speed: 1.15 },
        },
        startDelay: 0,
        stopOnFocusIn: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "120px 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const autoScrollApi = api?.plugins().autoScroll;
    if (!autoScrollApi) return;

    if (isInView && isDocumentVisible) {
      autoScrollApi.play();
    } else {
      autoScrollApi.stop();
    }
  }, [api, isInView, isDocumentVisible]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {heading ? (
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold text-[var(--text-strong)] md:text-2xl">
            {heading}
          </h3>
        </div>
      ) : null}

      <div className="partners-logo-track relative overflow-hidden bg-transparent py-3 md:py-4">
        <div className="partners-logo-glow pointer-events-none absolute inset-y-0 left-[-22%] w-[36%] bg-[linear-gradient(90deg,transparent,rgba(170,166,246,0.2),rgba(247,208,163,0.14),transparent)] blur-2xl" />
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(170,166,246,0.16),rgba(247,208,163,0.14),transparent)]" />
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
            loop: true,
            skipSnaps: true,
          }}
          plugins={[autoScroll]}
          setApi={setApi}
          className="relative [mask-image:linear-gradient(to_right,transparent_0%,black_7%,black_93%,transparent_100%)]"
          aria-label="Aliados tecnologicos"
        >
          <CarouselContent className="ml-0">
            {logos.map((logo) => {
              const logoContent = (
                <span className="group/logo flex h-[76px] w-full items-center justify-center transition duration-300 md:h-[94px] md:px-1">
                  <img
                    src={logo.image}
                    alt={logo.description}
                    className={cn(
                      "h-12 w-full max-w-[12rem] object-contain opacity-[0.96] transition duration-300 group-hover/logo:-translate-y-0.5 group-hover/logo:scale-[1.04] group-hover/logo:opacity-100 md:h-14 md:max-w-[15rem]",
                      logo.className,
                    )}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </span>
              );

              return (
                <CarouselItem
                  key={logo.id}
                  className="basis-[44%] pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  {logo.href ? (
                    <a
                      href={logo.href}
                      target={logo.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        logo.href.startsWith("http")
                          ? "noreferrer"
                          : undefined
                      }
                      aria-label={logo.description}
                      className="block outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
                    >
                      {logoContent}
                    </a>
                  ) : (
                    logoContent
                  )}
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
