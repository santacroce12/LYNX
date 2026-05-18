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
        speed: 0.52,
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

      <div className="relative overflow-hidden bg-[#02050b] py-3 md:py-4">
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
                <span className="group/logo flex h-[80px] w-full items-center justify-center px-6 transition duration-300 md:h-[94px] md:px-8">
                  <img
                    src={logo.image}
                    alt={logo.description}
                    className={cn(
                      "h-auto w-auto max-h-12 max-w-[10rem] object-contain brightness-110 contrast-125 opacity-90 transition duration-300 group-hover/logo:scale-[1.035] group-hover/logo:opacity-100 md:max-h-14 md:max-w-[11.5rem]",
                      logo.className,
                    )}
                    loading="lazy"
                    draggable={false}
                  />
                </span>
              );

              return (
                <CarouselItem
                  key={logo.id}
                  className="basis-[48%] pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
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
