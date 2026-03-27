"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const INTRO_DURATION_MS = 2400;
const REDUCED_DURATION_MS = 900;

export default function HomeBrandIntro() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timeout = window.setTimeout(
      () => setVisible(false),
      reduceMotion ? REDUCED_DURATION_MS : INTRO_DURATION_MS,
    );

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[120] overflow-hidden bg-[var(--bg)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: reduceMotion ? 0.2 : 0.55,
              ease: [0.7, 0, 0.2, 1],
            },
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.18),transparent_32%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(249,115,22,0.14),transparent_24%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(251,146,60,0.12),transparent_24%)]" />

          <motion.div
            className="absolute inset-y-0 left-0 w-[18vw] min-w-16 bg-gradient-to-r from-[var(--accent)]/35 via-[var(--accent)]/12 to-transparent blur-2xl"
            initial={{ x: "-110%", opacity: 0 }}
            animate={{
              x: reduceMotion ? "-15%" : ["-110%", "-10%", "-30%"],
              opacity: reduceMotion ? 0.28 : [0, 0.45, 0.24],
            }}
            transition={{ duration: reduceMotion ? 0.6 : 1.8, ease: "easeOut" }}
          />

          <motion.div
            className="absolute inset-y-0 right-0 w-[14vw] min-w-14 bg-gradient-to-l from-white/10 via-white/4 to-transparent blur-2xl"
            initial={{ x: "110%", opacity: 0 }}
            animate={{
              x: reduceMotion ? "8%" : ["110%", "8%", "18%"],
              opacity: reduceMotion ? 0.16 : [0, 0.22, 0.1],
            }}
            transition={{ duration: reduceMotion ? 0.6 : 1.8, ease: "easeOut" }}
          />

          <motion.div
            className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--accent)]/55 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: 1,
              opacity: reduceMotion ? 0.55 : [0, 0.85, 0.45],
            }}
            transition={{
              duration: reduceMotion ? 0.4 : 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          <div className="relative flex h-full items-center justify-center px-6">
            <motion.div
              className="relative flex flex-col items-center"
              initial={{
                opacity: 0,
                scale: 0.92,
                filter: reduceMotion ? "blur(0px)" : "blur(18px)",
              }}
              animate={{
                opacity: 1,
                scale: reduceMotion ? 1 : [0.92, 1.03, 1],
                filter: reduceMotion
                  ? "blur(0px)"
                  : ["blur(18px)", "blur(6px)", "blur(0px)"],
              }}
              exit={{
                opacity: 0,
                scale: reduceMotion ? 1 : 1.04,
                filter: reduceMotion ? "blur(0px)" : "blur(10px)",
              }}
              transition={{
                duration: reduceMotion ? 0.45 : 1.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className="absolute -inset-16 rounded-full bg-[var(--accent)]/12 blur-3xl"
                animate={{
                  opacity: reduceMotion ? 0.45 : [0.2, 0.8, 0.28],
                  scale: reduceMotion ? 1 : [0.86, 1.1, 0.98],
                }}
                transition={{
                  duration: reduceMotion ? 0.6 : 1.3,
                  ease: "easeOut",
                }}
              />

              <Image
                src="/images/brand/logo-azul.png"
                alt="LYNX"
                width={320}
                height={96}
                priority
                className="relative h-auto w-[200px] md:w-[280px]"
              />

              <motion.div
                className="mt-5 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: reduceMotion ? 130 : [0, 220, 150],
                  opacity: 1,
                }}
                transition={{
                  duration: reduceMotion ? 0.4 : 0.85,
                  delay: reduceMotion ? 0.05 : 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              <motion.p
                className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.45em] text-white/78 md:text-xs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0.35 : 0.55,
                  delay: reduceMotion ? 0.08 : 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Energía y Tecnología
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
