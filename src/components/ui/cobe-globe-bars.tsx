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
    id: "santiago",
    location: [-33.4489, -70.6693],
    label: "Chile",
    detail: "Santiago",
    value: 96,
    offset: { x: -34, y: -10 },
  },
  {
    id: "mendoza",
    location: [-32.8895, -68.8458],
    label: "Argentina",
    detail: "Mendoza",
    value: 88,
    offset: { x: 34, y: 8 },
  },
];

const INITIAL_PHI = -0.35;
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
        size: marker.id === "santiago" ? 0.032 : 0.028,
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
    const shouldAutoRotate = Math.abs(speed) > 0.00001;

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
        diffuse: 1.25,
        mapSamples: 22000,
        mapBrightness: 7.6,
        mapBaseBrightness: 0.015,
        baseColor: [0.96, 0.91, 0.84],
        markerColor: [1, 0.48, 0.1],
        glowColor: [1, 0.36, 0.06],
        markerElevation: 0.025,
        markers: cobeMarkers as never,
        opacity: 0.96,
      });

      const updateGlobe = () => {
        if (!globe) return;
        if (shouldAutoRotate && !isPausedRef.current) phi += speed;

        globe.update({
          phi: INITIAL_PHI + phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: INITIAL_THETA + thetaOffsetRef.current + dragOffset.current.theta,
        });
      };

      const animate = () => {
        updateGlobe();

        if (shouldAutoRotate) {
          animationId = window.requestAnimationFrame(animate);
        }
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
            className="pointer-events-none z-20 min-w-[3.9rem] rounded-[0.6rem] border border-[rgba(255,194,131,0.28)] bg-[rgba(5,10,20,0.86)] px-1.5 py-1.5 text-center shadow-[0_10px_26px_rgba(0,0,0,0.28),0_0_18px_rgba(255,122,26,0.1)] backdrop-blur-md transition-[opacity,filter] duration-500 sm:min-w-[4.65rem] sm:rounded-[0.65rem] sm:px-2"
            style={labelStyle}
          >
            <span className="block text-[0.42rem] font-semibold uppercase leading-none tracking-[0.16em] text-[var(--accent-soft)] sm:text-[0.48rem] sm:tracking-[0.18em]">
              {marker.label}
            </span>
            <span className="mt-1 block text-[0.5rem] font-medium leading-none text-[var(--text-secondary)] sm:text-[0.58rem]">
              {marker.detail}
            </span>
            <span className="mt-1.5 block h-[3px] overflow-hidden rounded-full bg-white/10">
              <span className="block h-full w-[var(--value)] rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-soft))]" />
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default GlobeBars;
