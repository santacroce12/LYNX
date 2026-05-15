"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tube = {
  baseY: number;
  amplitude: number;
  width: number;
  speed: number;
  phase: number;
  alpha: number;
};

type Point = {
  x: number;
  y: number;
};

type TubesBackgroundProps = {
  children?: ReactNode;
  className?: string;
  canvasClassName?: string;
  enablePointerInteraction?: boolean;
  fixedCanvas?: boolean;
  intensity?: "low" | "medium";
};

const tubes: Tube[] = [
  { baseY: 0.2, amplitude: 34, width: 1.4, speed: 0.16, phase: 0.2, alpha: 0.22 },
  { baseY: 0.32, amplitude: 52, width: 1.8, speed: 0.12, phase: 1.8, alpha: 0.24 },
  { baseY: 0.48, amplitude: 46, width: 1.5, speed: 0.14, phase: 3.4, alpha: 0.2 },
  { baseY: 0.63, amplitude: 58, width: 1.9, speed: 0.1, phase: 2.6, alpha: 0.19 },
  { baseY: 0.78, amplitude: 42, width: 1.3, speed: 0.18, phase: 4.2, alpha: 0.17 },
];

function curvePoint(p0: Point, p1: Point, p2: Point, p3: Point, amount: number) {
  const inverse = 1 - amount;
  const inverse2 = inverse * inverse;
  const amount2 = amount * amount;

  return {
    x:
      inverse2 * inverse * p0.x +
      3 * inverse2 * amount * p1.x +
      3 * inverse * amount2 * p2.x +
      amount2 * amount * p3.x,
    y:
      inverse2 * inverse * p0.y +
      3 * inverse2 * amount * p1.y +
      3 * inverse * amount2 * p2.y +
      amount2 * amount * p3.y,
  };
}

function setCanvasSize(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
  const width = Math.max(1, Math.floor(rect.width * pixelRatio));
  const height = Math.max(1, Math.floor(rect.height * pixelRatio));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  return { width, height, pixelRatio };
}

export function TubesBackground({
  children,
  className,
  canvasClassName,
  enablePointerInteraction = false,
  fixedCanvas = false,
  intensity = "low",
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frame = 0;
    let stopped = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alphaScale = intensity === "medium" ? 1.15 : 0.78;
    const dotScale = intensity === "medium" ? 1 : 0.72;

    const draw = (time = 0) => {
      const { width, height, pixelRatio } = setCanvasSize(canvas);
      const pointer = pointerRef.current;
      pointer.x += (pointer.targetX - pointer.x) * 0.045;
      pointer.y += (pointer.targetY - pointer.y) * 0.045;

      const t = time * 0.001;
      context.clearRect(0, 0, width, height);
      context.save();
      context.scale(pixelRatio, pixelRatio);

      const viewWidth = width / pixelRatio;
      const viewHeight = height / pixelRatio;

      context.globalCompositeOperation = "screen";

      tubes.forEach((tube, index) => {
        const drift = Math.sin(t * tube.speed + tube.phase) * tube.amplitude;
        const pointerDrift = enablePointerInteraction ? pointer.y * 24 : 0;
        const p0 = { x: -viewWidth * 0.08, y: viewHeight * tube.baseY + drift * 0.18 };
        const p1 = {
          x: viewWidth * 0.24,
          y:
            viewHeight * tube.baseY +
            Math.sin(t * 0.62 + tube.phase) * tube.amplitude +
            pointerDrift,
        };
        const p2 = {
          x: viewWidth * 0.68,
          y:
            viewHeight * (tube.baseY + 0.08) +
            Math.cos(t * 0.5 + tube.phase) * tube.amplitude -
            pointerDrift,
        };
        const p3 = {
          x: viewWidth * 1.08,
          y: viewHeight * (tube.baseY - 0.02) + drift * 0.16,
        };

        const gradient = context.createLinearGradient(p0.x, p0.y, p3.x, p3.y);
        gradient.addColorStop(0, "rgba(255, 122, 26, 0)");
        gradient.addColorStop(0.24, `rgba(255, 122, 26, ${tube.alpha * alphaScale})`);
        gradient.addColorStop(0.52, `rgba(255, 194, 131, ${tube.alpha * alphaScale})`);
        gradient.addColorStop(0.82, `rgba(255, 122, 26, ${tube.alpha * 0.75 * alphaScale})`);
        gradient.addColorStop(1, "rgba(255, 122, 26, 0)");

        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        context.lineWidth = tube.width + 11;
        context.strokeStyle = `rgba(255, 122, 26, ${0.018 * alphaScale})`;
        context.shadowBlur = 28;
        context.shadowColor = "rgba(255, 122, 26, 0.12)";
        context.stroke();

        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        context.lineWidth = tube.width;
        context.strokeStyle = gradient;
        context.shadowBlur = 10;
        context.shadowColor = "rgba(255, 194, 131, 0.16)";
        context.stroke();

        for (let dot = 0; dot < 2; dot += 1) {
          const progress = (t * (0.045 + index * 0.004) + dot * 0.5 + tube.phase * 0.07) % 1;
          const position = curvePoint(p0, p1, p2, p3, progress);
          const dotAlpha = (0.17 + Math.sin(progress * Math.PI) * 0.26) * alphaScale;

          context.beginPath();
          context.arc(position.x, position.y, (1.35 + index * 0.12) * dotScale, 0, Math.PI * 2);
          context.fillStyle = `rgba(255, 194, 131, ${dotAlpha})`;
          context.shadowBlur = 16;
          context.shadowColor = "rgba(255, 122, 26, 0.34)";
          context.fill();
        }
      });

      context.restore();

      if (!stopped && !reduceMotion) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!enablePointerInteraction) return;
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.targetX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerRef.current.targetY = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const handleResize = () => draw(performance.now());
    const observer = new ResizeObserver(handleResize);
    observer.observe(canvas);
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    draw(performance.now());

    return () => {
      stopped = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [enablePointerInteraction, intensity]);

  return (
    <div className={cn("relative h-full min-h-[360px] w-full overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          fixedCanvas ? "fixed inset-0" : "absolute inset-0",
          "block h-full w-full",
          canvasClassName,
        )}
      />
      {children ? <div className="relative z-10 h-full w-full">{children}</div> : null}
    </div>
  );
}

export default TubesBackground;
