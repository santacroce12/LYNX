"use client";

import { m } from "framer-motion";
import {
  Cpu,
  Database,
  Network,
  Server,
  Zap,
  type LucideIcon,
} from "lucide-react";

type SignalVariant = "tech" | "energy";

type TechSignalProps = {
  variant?: SignalVariant;
};

const techNodes: Array<{
  left: string;
  top: string;
  delay: number;
  Icon: LucideIcon;
}> = [
  { left: "18%", top: "28%", delay: 0, Icon: Cpu },
  { left: "44%", top: "24%", delay: 0.35, Icon: Server },
  { left: "70%", top: "34%", delay: 0.7, Icon: Database },
  { left: "30%", top: "62%", delay: 1.05, Icon: Network },
  { left: "58%", top: "68%", delay: 1.4, Icon: Cpu },
];

const energyNodes: Array<{
  left: string;
  top: string;
  delay: number;
  Icon: LucideIcon;
}> = [
  { left: "16%", top: "62%", delay: 0, Icon: Zap },
  { left: "44%", top: "56%", delay: 0.45, Icon: Zap },
  { left: "72%", top: "46%", delay: 0.9, Icon: Zap },
];

const techPaths = [
  "M68 96 H168 C198 96 198 70 228 70 H302",
  "M168 96 V198 H292 C324 198 324 228 354 228 H444",
  "M224 70 V150 H360 C396 150 396 118 432 118 H486",
  "M108 238 H190 C226 238 226 198 262 198",
  "M324 198 V262 H428",
];

const energyPaths = [
  "M30 228 C110 228, 126 228, 164 228 S260 198, 298 198 S392 162, 488 162",
  "M68 252 C146 252, 182 238, 230 222 S344 192, 456 188",
  "M54 192 C132 178, 196 194, 250 178 S374 132, 506 138",
];

export default function TechSignal({ variant = "energy" }: TechSignalProps) {
  const isTech = variant === "tech";
  const nodes = isTech ? techNodes : energyNodes;
  const paths = isTech ? techPaths : energyPaths;
  const particles = isTech
    ? [
        { left: "12%", top: "18%", x: 84, y: 18, delay: 0 },
        { left: "34%", top: "16%", x: 72, y: 54, delay: 0.75 },
        { left: "76%", top: "24%", x: -68, y: 42, delay: 1.35 },
        { left: "20%", top: "78%", x: 110, y: -38, delay: 1.9 },
        { left: "66%", top: "76%", x: -86, y: -26, delay: 2.4 },
      ]
    : [
        { left: "10%", top: "54%", x: 152, y: -16, delay: 0 },
        { left: "38%", top: "58%", x: 126, y: -38, delay: 0.9 },
        { left: "64%", top: "47%", x: 112, y: -18, delay: 1.6 },
      ];
  const gradientId = isTech ? "signal-gradient-tech" : "signal-gradient-energy";
  const glowId = isTech ? "signal-glow-tech" : "signal-glow-energy";
  const primary = isTech ? "rgba(125,168,255,0.86)" : "rgba(255,194,131,0.66)";
  const secondary = isTech ? "rgba(94,234,212,0.54)" : "rgba(255,122,26,0.48)";
  const soft = isTech ? "rgba(125,168,255,0.10)" : "rgba(255,122,26,0.075)";
  const glow = isTech ? "rgba(94,234,212,0.16)" : "rgba(255,194,131,0.11)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[2%] top-1/2 hidden aspect-[620/390] w-[45%] max-w-[620px] -translate-y-1/2 overflow-hidden md:block"
    >
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 60% 48%, ${glow}, transparent 54%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 74% 34%, ${soft}, transparent 28%)`,
        }}
      />

      <svg
        viewBox="0 0 560 360"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="18%" stopColor={secondary} />
            <stop offset="56%" stopColor={primary} />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation={isTech ? "3.5" : "4.5"} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {isTech ? (
          <g opacity="0.18">
            {[90, 150, 210, 270].map((x) => (
              <path
                key={`v-${x}`}
                d={`M${x} 48 V304`}
                fill="none"
                stroke="rgba(182,205,238,0.36)"
                strokeWidth="1"
              />
            ))}
            {[72, 132, 192, 252].map((y) => (
              <path
                key={`h-${y}`}
                d={`M48 ${y} H512`}
                fill="none"
                stroke="rgba(182,205,238,0.28)"
                strokeWidth="1"
              />
            ))}
          </g>
        ) : null}

        {isTech ? (
          <g opacity="0.58">
            <circle
              cx="286"
              cy="178"
              r="72"
              fill="none"
              stroke="rgba(125,168,255,0.11)"
              strokeDasharray="10 18"
              strokeWidth="1.5"
            >
              <animateTransform
                attributeName="transform"
                dur="18s"
                from="0 286 178"
                repeatCount="indefinite"
                to="360 286 178"
                type="rotate"
              />
            </circle>
            <circle
              cx="286"
              cy="178"
              r="44"
              fill="rgba(8,14,24,0.18)"
              stroke="rgba(94,234,212,0.12)"
              strokeDasharray="18 12"
              strokeWidth="1"
            >
              <animateTransform
                attributeName="transform"
                dur="11s"
                from="360 286 178"
                repeatCount="indefinite"
                to="0 286 178"
                type="rotate"
              />
            </circle>
          </g>
        ) : (
          <g opacity="0.42">
            <path
              d="M40 166 C120 154, 178 164, 238 154 S366 112, 520 116"
              fill="none"
              stroke="rgba(255,194,131,0.16)"
              strokeLinecap="round"
              strokeWidth="10"
            />
            <path
              d="M34 286 C134 286, 176 254, 260 260 S392 230, 520 228"
              fill="none"
              stroke="rgba(255,122,26,0.11)"
              strokeLinecap="round"
              strokeWidth="8"
            />
          </g>
        )}

        {paths.map((path, index) => (
          <g key={path}>
            <path
              d={path}
              fill="none"
              stroke={isTech ? "rgba(125,168,255,0.12)" : "rgba(255,194,131,0.1)"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={isTech ? 8 : 7}
            />
            <m.path
              d={path}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={isTech ? 2 : 1.8}
              initial={false}
              animate={{
                pathLength: [0.22, 1, 1],
                opacity: [0.22, isTech ? 0.82 : 0.56, 0.24],
              }}
              transition={{
                duration: isTech ? 3.8 : 4.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            />
            <m.path
              d={path}
              fill="none"
              stroke={isTech ? "rgba(94,234,212,0.78)" : "rgba(255,194,131,0.74)"}
              strokeDasharray={isTech ? "10 34" : "16 42"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={isTech ? 3.2 : 3.6}
              filter={`url(#${glowId})`}
              animate={{
                opacity: [0.12, isTech ? 0.78 : 0.62, 0.16],
                strokeDashoffset: [0, isTech ? -132 : -168],
              }}
              transition={{
                duration: isTech ? 2.55 : 2.95,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: index * 0.34,
              }}
            />
            {[0, 1].map((packetIndex) => (
              <circle
                key={`${path}-${packetIndex}`}
                r={isTech ? 4 : 4.8}
                fill={isTech ? "rgba(94,234,212,0.92)" : "rgba(255,194,131,0.9)"}
                filter={`url(#${glowId})`}
              >
                <animateMotion
                  begin={`${index * 0.42 + packetIndex * 1.6}s`}
                  dur={isTech ? "3.2s" : "3.7s"}
                  path={path}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        ))}
      </svg>

      {nodes.map(({ left, top, delay, Icon }) => (
        <m.div
          key={`${left}-${top}`}
          className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[0.95rem] border bg-[rgba(8,14,24,0.5)] backdrop-blur-md"
          style={{
            left,
            top,
            borderColor: isTech
              ? "rgba(125,168,255,0.28)"
              : "rgba(255,194,131,0.18)",
            color: isTech ? "rgba(180,216,255,0.92)" : "rgba(255,194,131,0.72)",
            boxShadow: isTech
              ? "0 0 28px rgba(94,234,212,0.08)"
              : "0 0 24px rgba(255,122,26,0.08)",
          }}
          animate={{
            opacity: [0.72, 1, 0.72],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 2.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay,
          }}
        >
          <m.span
            className="absolute inset-0 rounded-[inherit] border"
            style={{
              borderColor: isTech
                ? "rgba(94,234,212,0.18)"
                : "rgba(255,194,131,0.14)",
            }}
            animate={{
              opacity: [0, 0.52, 0],
              scale: [1, 1.85, 2.15],
            }}
            transition={{
              duration: 2.7,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
              delay,
            }}
          />
          <m.span
            className="absolute inset-0 rounded-[inherit]"
            style={{
              background: `radial-gradient(circle, ${glow}, transparent 66%)`,
            }}
            animate={{ opacity: [0.15, 0.55, 0.15] }}
            transition={{
              duration: 3.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay,
            }}
          />
          <Icon className="relative h-[18px] w-[18px]" />
        </m.div>
      ))}

      {particles.map((particle, index) => (
        <m.span
          key={`${particle.left}-${particle.top}`}
          className={`absolute rounded-full ${
            isTech ? "h-1.5 w-1.5" : "h-2 w-2"
          }`}
          style={{
            left: particle.left,
            top: particle.top,
            background: isTech
              ? "rgba(94,234,212,0.9)"
              : "rgba(255,194,131,0.88)",
            boxShadow: isTech
              ? "0 0 18px rgba(94,234,212,0.48)"
              : "0 0 18px rgba(255,122,26,0.45)",
          }}
          animate={{
            x: [0, particle.x, particle.x * 1.12],
            y: [0, particle.y, particle.y * 0.7],
            opacity: [0, 0.95, 0],
            scale: [0.7, 1.2, 0.7],
          }}
          transition={{
            duration: isTech ? 3.1 : 3.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: particle.delay + index * 0.12,
          }}
        />
      ))}

      {isTech ? (
        <>
          <m.div
            className="absolute left-[12%] top-[47%] h-px w-[68%] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(94,234,212,0.58), rgba(125,168,255,0.42), transparent)",
            }}
            animate={{ x: ["-18%", "18%", "-18%"], opacity: [0, 0.72, 0] }}
            transition={{
              duration: 3.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <m.div
            className="absolute left-[18%] top-[14%] h-[72%] w-px rounded-full"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(125,168,255,0.24), transparent)",
            }}
            animate={{ x: ["0%", "260%", "0%"], opacity: [0, 0.45, 0] }}
            transition={{
              duration: 5.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </>
      ) : null}
    </div>
  );
}
