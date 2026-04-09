"use client";

import { m } from "framer-motion";

const cards = [
  {
    className: "left-[4%] top-[18%] h-[92px] w-[162px]",
    delay: 0,
  },
  {
    className: "left-[28%] top-[42%] h-[118px] w-[196px]",
    delay: 0.18,
    featured: true,
  },
  {
    className: "right-[4%] top-[20%] h-[96px] w-[152px]",
    delay: 0.36,
  },
];

const pulses = [
  {
    className: "left-[26%] top-[30%]",
    x: [0, 72, 72, 118],
    y: [0, 0, 62, 62],
    delay: 0,
  },
  {
    className: "left-[57%] top-[53%]",
    x: [0, 70, 70, 120],
    y: [0, 0, -64, -64],
    delay: 0.65,
  },
];

export default function TechCircuit() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[4%] top-1/2 hidden aspect-[520/340] w-[42%] max-w-[520px] -translate-y-1/2 overflow-hidden md:block"
    >
      <div className="absolute inset-0 rounded-[28px] bg-[linear-gradient(180deg,rgba(15,23,42,0.14),rgba(15,23,42,0.02))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_36%,rgba(249,115,22,0.14),transparent_24%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_68%,rgba(251,146,60,0.08),transparent_18%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-35 [mask-image:radial-gradient(circle_at_center,#000_62%,transparent_100%)]" />

      <svg
        viewBox="0 0 520 340"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="tech-circuit-line"
            x1="0%"
            x2="100%"
            y1="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(249,115,22,0.08)" />
            <stop offset="40%" stopColor="rgba(249,115,22,0.58)" />
            <stop offset="100%" stopColor="rgba(251,146,60,0.12)" />
          </linearGradient>
        </defs>

        <path
          d="M136 98 H212 Q230 98 230 116 V176 H286"
          fill="none"
          stroke="url(#tech-circuit-line)"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.88"
        />
        <path
          d="M372 176 H412 Q432 176 432 156 V112 H446"
          fill="none"
          stroke="url(#tech-circuit-line)"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.88"
        />
        <path
          d="M230 176 V252 H340"
          fill="none"
          stroke="rgba(249,115,22,0.18)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx="136" cy="98" r="3.5" fill="rgba(249,115,22,0.9)" />
        <circle cx="286" cy="176" r="4" fill="rgba(249,115,22,0.9)" />
        <circle cx="446" cy="112" r="3.5" fill="rgba(251,146,60,0.88)" />
        <circle cx="340" cy="252" r="2.6" fill="rgba(249,115,22,0.65)" />
      </svg>

      {pulses.map((pulse) => (
        <m.div
          key={pulse.className}
          className={`absolute h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(249,115,22,0.55)] ${pulse.className}`}
          animate={{
            x: pulse.x,
            y: pulse.y,
            opacity: [0, 1, 1, 0],
            scale: [0.7, 1, 1, 0.8],
          }}
          transition={{
            duration: 3.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: pulse.delay,
          }}
        />
      ))}

      {cards.map((card, index) => (
        <m.div
          key={card.className}
          className={`absolute rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.58))] p-4 shadow-[0_20px_60px_rgba(2,6,23,0.35)] backdrop-blur-[2px] ${card.className}`}
          animate={{
            y: [0, -3, 0],
            borderColor: card.featured
              ? [
                  "rgba(251,146,60,0.18)",
                  "rgba(249,115,22,0.42)",
                  "rgba(251,146,60,0.18)",
                ]
              : [
                  "rgba(255,255,255,0.08)",
                  "rgba(249,115,22,0.24)",
                  "rgba(255,255,255,0.08)",
                ],
          }}
          transition={{
            duration: 3.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: card.delay,
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
              <span className="h-[1px] w-8 bg-white/10" />
            </div>
            <span className="h-[1px] w-6 bg-[var(--accent)]/28" />
          </div>

          <div className="space-y-2">
            <div className="h-2 rounded-full bg-white/10" />
            <div className="h-2 w-[72%] rounded-full bg-[var(--accent)]/18" />
            <div className="h-2 w-[58%] rounded-full bg-white/8" />
          </div>

          {card.featured ? (
            <m.div
              className="absolute inset-x-4 top-[44px] h-[2px] rounded-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
              animate={{
                x: ["-18%", "22%", "8%"],
                opacity: [0.22, 1, 0.3],
              }}
              transition={{
                duration: 2.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ) : null}
        </m.div>
      ))}

      <m.div
        className="absolute bottom-[22%] right-[12%] h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-[var(--accent)]/80 to-transparent"
        animate={{
          opacity: [0, 0.9, 0],
          x: [-18, 0, 14],
        }}
        transition={{
          duration: 2.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}
