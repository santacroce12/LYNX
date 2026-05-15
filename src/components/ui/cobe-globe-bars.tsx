"use client";

import { useCallback, useEffect, useMemo, useRef, type CSSProperties } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

type MarkerOffset = {
  x: number;
  y: number;
};

export type GlobeBarMarker = {
  id: string;
  location: [number, number];
  label: string;
  detail: string;
  value?: number;
  offset?: MarkerOffset;
};

type GlobeBarsProps = {
  markers?: GlobeBarMarker[];
  className?: string;
  speed?: number;
};

const defaultMarkers: GlobeBarMarker[] = [
  {
    id: "chile",
    location: [-33.4489, -70.6693],
    label: "Chile",
    detail: "Santiago",
    value: 96,
    offset: { x: -58, y: -12 },
  },
  {
    id: "argentina",
    location: [-32.8895, -68.8458],
    label: "Argentina",
    detail: "Mendoza",
    value: 88,
    offset: { x: 20, y: 20 },
  },
];

const INITIAL_PHI = 0.2;
const INITIAL_THETA = 0.12;

export function GlobeBars({
  markers = defaultMarkers,
  className,
  speed = 0.0016,
}: GlobeBarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const cobeMarkers = useMemo(
    () =>
      markers.map((marker) => ({
        location: marker.location,
        size: marker.id === "mendoza" ? 0.055 : 0.07,
        id: marker.id,
      })),
    [markers],
  );

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    pointerInteracting.current = { x: event.clientX, y: event.clientY };
    isPausedRef.current = true;
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }

    pointerInteracting.current = null;
    isPausedRef.current = false;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (pointerInteracting.current === null) return;

      dragOffset.current = {
        phi: (event.clientX - pointerInteracting.current.x) / 320,
        theta: (event.clientY - pointerInteracting.current.y) / 1100,
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId = 0;
    let phi = 0;
    let resizeObserver: ResizeObserver | undefined;
    let resizeTimeout = 0;

    const destroyGlobe = () => {
      if (animationId) window.cancelAnimationFrame(animationId);
      globe?.destroy();
      globe = null;
      canvas.style.opacity = "0";
    };

    const init = () => {
      const width = Math.floor(canvas.offsetWidth);
      if (!width) return;

      destroyGlobe();

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: INITIAL_PHI,
        theta: INITIAL_THETA,
        dark: 1,
        diffuse: 1.35,
        mapSamples: 18000,
        mapBrightness: 4.8,
        baseColor: [0.78, 0.82, 0.9],
        markerColor: [1, 0.48, 0.1],
        glowColor: [1, 0.42, 0.08],
        markerElevation: 0.035,
        markers: cobeMarkers as never,
        opacity: 0.96,
      });

      const animate = () => {
        if (!globe) return;
        if (!isPausedRef.current) phi += speed;

        globe.update({
          phi: INITIAL_PHI + phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: INITIAL_THETA + thetaOffsetRef.current + dragOffset.current.theta,
        });

        animationId = window.requestAnimationFrame(animate);
      };

      animate();
      window.setTimeout(() => {
        canvas.style.opacity = "1";
      }, 180);
    };

    resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(init, 140);
    });

    resizeObserver.observe(canvas);
    init();

    return () => {
      window.clearTimeout(resizeTimeout);
      resizeObserver?.disconnect();
      destroyGlobe();
    };
  }, [cobeMarkers, speed]);

  return (
    <div className={cn("relative aspect-square select-none overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,26,0.16),transparent_56%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-[8%] rounded-full border border-[rgba(255,194,131,0.12)] bg-[radial-gradient(circle_at_50%_48%,rgba(255,122,26,0.08),rgba(4,9,21,0.08)_45%,transparent_70%)]" />

      <canvas
        ref={canvasRef}
        aria-label="Cobertura LYNX en Chile y Argentina"
        onPointerDown={handlePointerDown}
        className="relative z-10 h-full w-full rounded-full opacity-0 transition-opacity duration-1000 ease-out"
        style={{ cursor: "grab", touchAction: "none" }}
      />

      {markers.map((marker) => {
        const value = marker.value ?? 80;
        const offsetX = marker.offset?.x ?? 0;
        const offsetY = marker.offset?.y ?? 0;
        const labelStyle = {
          position: "absolute",
          positionAnchor: `--cobe-${marker.id}`,
          bottom: "anchor(top)",
          left: "anchor(center)",
          translate: `calc(-50% + ${offsetX}px) ${offsetY}px`,
          opacity: `var(--cobe-visible-${marker.id}, 0)`,
          filter: `blur(calc((1 - var(--cobe-visible-${marker.id}, 0)) * 7px))`,
          "--value": `${value}%`,
        } as CSSProperties & Record<string, string>;

        return (
          <div
            key={marker.id}
            className="pointer-events-none z-20 hidden min-w-[5.8rem] rounded-[0.85rem] border border-[rgba(255,194,131,0.28)] bg-[rgba(5,10,20,0.82)] px-2.5 py-2 text-center shadow-[0_14px_36px_rgba(0,0,0,0.32),0_0_24px_rgba(255,122,26,0.1)] backdrop-blur-md transition-[opacity,filter] duration-500 sm:block"
            style={labelStyle}
          >
            <span className="block text-[0.58rem] font-semibold uppercase leading-none tracking-[0.22em] text-[var(--accent-soft)]">
              {marker.label}
            </span>
            <span className="mt-1.5 block text-[0.68rem] font-medium leading-none text-[var(--text-secondary)]">
              {marker.detail}
            </span>
            <span className="mt-2 block h-1 overflow-hidden rounded-full bg-white/10">
              <span className="block h-full w-[var(--value)] rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-soft))]" />
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default GlobeBars;
