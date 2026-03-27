"use client";

import { m } from "framer-motion";
import { Zap } from "lucide-react";

const NODES = [
  { left: "16%", top: "67%", delay: 0 },
  { left: "44%", top: "58%", delay: 0.45 },
  { left: "72%", top: "48%", delay: 0.9 },
];

export default function TechSignal() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[4%] top-1/2 hidden aspect-[520/340] w-[40%] max-w-[500px] -translate-y-1/2 overflow-hidden md:block"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_48%,rgba(249,115,22,0.14),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_34%,rgba(251,146,60,0.1),transparent_22%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(249,115,22,0.04),transparent)]" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_60%_50%,rgba(249,115,22,0.05),transparent_52%)] blur-2xl" />

      <svg
        viewBox="0 0 520 340"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="tech-signal-line" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(249,115,22,0)" />
            <stop offset="18%" stopColor="rgba(249,115,22,0.55)" />
            <stop offset="56%" stopColor="rgba(251,146,60,0.9)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0)" />
          </linearGradient>
        </defs>

        <path
          d="M30 228 C110 228, 126 228, 164 228 S 260 198, 298 198 S 392 162, 488 162"
          fill="none"
          stroke="url(#tech-signal-line)"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        <path
          d="M30 228 C110 228, 126 228, 164 228 S 260 198, 298 198 S 392 162, 488 162"
          fill="none"
          stroke="rgba(249,115,22,0.12)"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>

      <m.div
        className="absolute left-[10%] top-[67%] h-[4px] w-24 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent blur-[1px]"
        animate={{ x: ["0%", "255%", "255%"], opacity: [0, 1, 0] }}
        transition={{
          duration: 2.6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          repeatDelay: 0.2,
        }}
      />

      <m.div
        className="absolute left-[32%] top-[58%] h-[4px] w-20 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-[var(--accent-soft)] to-transparent blur-[1px]"
        animate={{ x: ["0%", "205%", "205%"], opacity: [0, 1, 0] }}
        transition={{
          duration: 2.2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.55,
          repeatDelay: 0.35,
        }}
      />

      {NODES.map((node) => (
        <div
          key={node.left}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: node.left, top: node.top }}
        >
          <m.div
            className="absolute left-1/2 top-1/2 h-[3px] w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-[var(--accent)]/90 to-transparent blur-[1px]"
            animate={{ scaleX: [0.35, 1.1, 1.3], opacity: [0, 0.65, 0] }}
            transition={{
              duration: 2.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
              delay: node.delay,
            }}
          />
          <m.div
            className="absolute left-1/2 top-1/2 h-[2px] w-12 -translate-x-1/2 -translate-y-1/2 rotate-[28deg] rounded-full bg-gradient-to-r from-transparent via-[var(--accent-soft)]/75 to-transparent"
            animate={{ scaleX: [0.4, 1, 1.2], opacity: [0, 0.45, 0] }}
            transition={{
              duration: 2.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
              delay: node.delay + 0.25,
            }}
          />

          <m.div
            className="relative z-10 flex h-8 w-8 items-center justify-center"
            animate={{
              scale: [1, 1.06, 1],
              rotate: [0, 6, 0],
              opacity: [0.82, 1, 0.82],
            }}
            transition={{
              duration: 1.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: node.delay,
            }}
          >
            <Zap className="h-4 w-4 text-[var(--accent)] drop-shadow-[0_0_12px_rgba(249,115,22,0.55)]" />
          </m.div>
        </div>
      ))}
    </div>
  );
}
