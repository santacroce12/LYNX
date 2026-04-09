"use client";

import { m } from "framer-motion";
import { Check, UserRound } from "lucide-react";

const nodes = [
  {
    className: "left-[14%] top-[63%]",
    size: "h-14 w-14",
    delay: 0,
  },
  {
    className: "left-[34%] top-[35%]",
    size: "h-16 w-16",
    delay: 0.3,
  },
  {
    className: "left-[58%] top-[56%]",
    size: "h-[4.4rem] w-[4.4rem]",
    delay: 0.55,
    featured: true,
  },
  {
    className: "right-[10%] top-[28%]",
    size: "h-14 w-14",
    delay: 0.85,
  },
];

const pulses = [
  {
    className: "left-[15%] top-[60%]",
    x: [0, 96, 180, 252],
    y: [0, -56, -18, -120],
    delay: 0.1,
  },
  {
    className: "left-[36%] top-[36%]",
    x: [0, 86, 160],
    y: [0, 40, 132],
    delay: 1.1,
  },
];

export default function SuccessNetwork() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[3%] top-1/2 hidden aspect-[520/340] w-[42%] max-w-[520px] -translate-y-1/2 overflow-hidden md:block"
    >
      <div className="absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_70%_34%,rgba(255,122,26,0.12),transparent_26%),radial-gradient(circle_at_28%_72%,rgba(255,194,131,0.08),transparent_20%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 [mask-image:radial-gradient(circle_at_center,#000_56%,transparent_96%)]" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_64%_46%,rgba(255,122,26,0.08),transparent_44%)] blur-3xl" />

      <svg
        viewBox="0 0 520 340"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="success-network-line"
            x1="0%"
            x2="100%"
            y1="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(255,122,26,0.08)" />
            <stop offset="40%" stopColor="rgba(255,122,26,0.58)" />
            <stop offset="100%" stopColor="rgba(255,194,131,0.14)" />
          </linearGradient>
        </defs>

        <path
          d="M88 214 C134 176, 142 148, 180 124 S 260 122, 300 170 S 378 178, 430 100"
          fill="none"
          stroke="url(#success-network-line)"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.92"
        />
        <path
          d="M180 124 C214 138, 248 178, 300 170"
          fill="none"
          stroke="rgba(255,122,26,0.22)"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M88 214 C138 222, 232 252, 300 170"
          fill="none"
          stroke="rgba(255,122,26,0.16)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        <circle cx="88" cy="214" r="3.5" fill="rgba(255,122,26,0.9)" />
        <circle cx="180" cy="124" r="3.5" fill="rgba(255,122,26,0.82)" />
        <circle cx="300" cy="170" r="4.2" fill="rgba(255,194,131,0.92)" />
        <circle cx="430" cy="100" r="3.5" fill="rgba(255,122,26,0.85)" />
      </svg>

      {pulses.map((pulse) => (
        <m.div
          key={pulse.className}
          className={`absolute h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_20px_rgba(255,122,26,0.55)] ${pulse.className}`}
          animate={{
            x: pulse.x,
            y: pulse.y,
            opacity: [0, 1, 1, 0],
            scale: [0.72, 1, 1, 0.82],
          }}
          transition={{
            duration: 3.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: pulse.delay,
          }}
        />
      ))}

      {nodes.map((node) => (
        <m.div
          key={node.className}
          className={`absolute -translate-x-1/2 -translate-y-1/2 ${node.className}`}
          animate={{
            y: [0, -4, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 3.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: node.delay,
          }}
        >
          <div className="relative">
            <m.div
              className={`rounded-full border border-[rgba(255,194,131,0.22)] bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(15,23,42,0.68))] shadow-[0_20px_50px_rgba(2,6,23,0.34)] ${node.size}`}
              animate={{
                borderColor: node.featured
                  ? [
                      "rgba(255,194,131,0.2)",
                      "rgba(255,122,26,0.48)",
                      "rgba(255,194,131,0.2)",
                    ]
                  : [
                      "rgba(255,194,131,0.16)",
                      "rgba(255,122,26,0.28)",
                      "rgba(255,194,131,0.16)",
                    ],
              }}
              transition={{
                duration: 2.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: node.delay,
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <UserRound className="h-6 w-6 text-white/78" />
            </div>

            <m.div
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-[rgba(255,194,131,0.22)] bg-[linear-gradient(180deg,rgba(255,122,26,0.92),rgba(255,122,26,0.72))] shadow-[0_0_16px_rgba(255,122,26,0.34)]"
              animate={{
                scale: [0.92, 1.08, 1],
                opacity: [0.8, 1, 0.88],
              }}
              transition={{
                duration: 2.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: node.delay + 0.2,
              }}
            >
              <Check className="h-3.5 w-3.5 text-[#08111d]" />
            </m.div>
          </div>
        </m.div>
      ))}

      <m.div
        className="absolute bottom-[22%] right-[8%] h-[2px] w-28 rounded-full bg-gradient-to-r from-transparent via-[var(--accent)]/90 to-transparent"
        animate={{
          opacity: [0, 1, 0],
          x: [-26, 0, 18],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
    </div>
  );
}
