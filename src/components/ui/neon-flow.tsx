"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type TubesBackgroundProps = {
  children?: ReactNode;
  className?: string;
  canvasClassName?: string;
  enablePointerInteraction?: boolean;
  fixedCanvas?: boolean;
  intensity?: "low" | "medium";
};

const flowLines = [
  { top: "18%", rotate: "-3deg", shift: "3vw", duration: "18s", delay: "0s", width: "124vw" },
  { top: "33%", rotate: "2deg", shift: "-2vw", duration: "22s", delay: "-6s", width: "118vw" },
  { top: "52%", rotate: "-5deg", shift: "4vw", duration: "24s", delay: "-12s", width: "130vw" },
  { top: "70%", rotate: "3deg", shift: "-3vw", duration: "20s", delay: "-4s", width: "116vw" },
];

type FlowStyle = CSSProperties & {
  "--flow-top": string;
  "--flow-rotate": string;
  "--flow-shift": string;
  "--flow-duration": string;
  "--flow-delay": string;
  "--flow-width": string;
  "--flow-alpha": string;
};

export function TubesBackground({
  children,
  className,
  canvasClassName,
  fixedCanvas = false,
  intensity = "low",
}: TubesBackgroundProps) {
  const alpha = intensity === "medium" ? "0.78" : "0.54";

  return (
    <div className={cn("relative h-full min-h-[360px] w-full overflow-hidden", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "lynx-flow-layer pointer-events-none",
          fixedCanvas ? "fixed inset-0" : "absolute inset-0",
          canvasClassName,
        )}
      >
        <span className="lynx-flow-wash" />
        {flowLines.map((line, index) => (
          <span
            key={`${line.top}-${line.rotate}`}
            className="lynx-flow-line"
            style={
              {
                "--flow-top": line.top,
                "--flow-rotate": line.rotate,
                "--flow-shift": line.shift,
                "--flow-duration": line.duration,
                "--flow-delay": line.delay,
                "--flow-width": line.width,
                "--flow-alpha": String(Number(alpha) - index * 0.055),
              } as FlowStyle
            }
          />
        ))}
      </div>
      {children ? <div className="relative z-10 h-full w-full">{children}</div> : null}
    </div>
  );
}

export default TubesBackground;
