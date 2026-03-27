"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import logo4k from "../../../Logo_4k.jpg";

const INTRO_DURATION_MS = 2200;
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
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,22,0.96)_0%,rgba(8,12,22,0.72)_45%,rgba(8,12,22,0.96)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,12,22,0.88)_0%,rgba(8,12,22,0.32)_50%,rgba(8,12,22,0.88)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.18),transparent_32%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(249,115,22,0.14),transparent_24%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(251,146,60,0.12),transparent_24%)]" />

          <motion.div
            className="absolute inset-y-0 left-0 w-[18vw] min-w-16 bg-gradient-to-r from-[var(--accent)]/35 via-[var(--accent)]/12 to-transparent blur-2xl"
            initial={{ x: "-110%", opacity: 0 }}
            animate={{
              x: reduceMotion ? "-15%" : ["-110%", "-8%", "-24%"],
              opacity: reduceMotion ? 0.24 : [0, 0.4, 0.18],
            }}
            transition={{ duration: reduceMotion ? 0.6 : 1.8, ease: "easeOut" }}
          />

          <motion.div
            className="absolute inset-y-0 right-0 w-[14vw] min-w-14 bg-gradient-to-l from-white/10 via-white/4 to-transparent blur-2xl"
            initial={{ x: "110%", opacity: 0 }}
            animate={{
              x: reduceMotion ? "8%" : ["110%", "8%", "18%"],
              opacity: reduceMotion ? 0.12 : [0, 0.18, 0.08],
            }}
            transition={{ duration: reduceMotion ? 0.6 : 1.8, ease: "easeOut" }}
          />

          <motion.div
            className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--accent)]/55 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: 1,
              opacity: reduceMotion ? 0.5 : [0, 0.78, 0.34],
            }}
            transition={{
              duration: reduceMotion ? 0.4 : 0.95,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          <div className="relative flex h-full items-center justify-center px-6">
            <motion.div
              className="relative flex flex-col items-center"
              initial={{
                opacity: 0,
                scale: 0.94,
                filter: reduceMotion ? "blur(0px)" : "blur(14px)",
              }}
              animate={{
                opacity: 1,
                scale: reduceMotion ? 1 : [0.94, 1.015, 1],
                filter: reduceMotion
                  ? "blur(0px)"
                  : ["blur(14px)", "blur(5px)", "blur(0px)"],
              }}
              exit={{
                opacity: 0,
                scale: reduceMotion ? 1 : 1.02,
                filter: reduceMotion ? "blur(0px)" : "blur(8px)",
              }}
              transition={{
                duration: reduceMotion ? 0.45 : 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center"
                initial={{ opacity: 0, scale: 0.88, filter: "blur(28px)" }}
                animate={{
                  opacity: reduceMotion ? 0.18 : [0, 0.38, 0.1],
                  scale: reduceMotion ? 1 : [0.88, 1.06, 1],
                  filter: reduceMotion
                    ? "blur(16px)"
                    : ["blur(28px)", "blur(12px)", "blur(18px)"],
                }}
                transition={{
                  duration: reduceMotion ? 0.55 : 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Image
                  src={logo4k}
                  alt=""
                  width={720}
                  height={216}
                  priority
                  aria-hidden="true"
                  className="h-auto w-[220px] md:w-[300px]"
                />
              </motion.div>

              <motion.div
                className="absolute -inset-14 rounded-full bg-[var(--accent)]/10 blur-3xl"
                animate={{
                  opacity: reduceMotion ? 0.35 : [0.16, 0.55, 0.22],
                  scale: reduceMotion ? 1 : [0.9, 1.08, 0.98],
                }}
                transition={{
                  duration: reduceMotion ? 0.6 : 1.2,
                  ease: "easeOut",
                }}
              />

              <motion.div
                initial={{
                  opacity: 0,
                  clipPath: "inset(0 48% 0 48%)",
                }}
                animate={{
                  opacity: 1,
                  clipPath: reduceMotion
                    ? "inset(0 0% 0 0%)"
                    : ["inset(0 48% 0 48%)", "inset(0 18% 0 18%)", "inset(0 0% 0 0%)"],
                }}
                transition={{
                  duration: reduceMotion ? 0.45 : 1.02,
                  delay: reduceMotion ? 0.04 : 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Image
                  src={logo4k}
                  alt="LYNX"
                  width={720}
                  height={216}
                  priority
                  className="relative h-auto w-[155px] drop-shadow-[0_0_18px_rgba(255,255,255,0.14)] drop-shadow-[0_0_36px_rgba(249,115,22,0.12)] md:w-[220px]"
                />
              </motion.div>

              <motion.div
                className="mt-5 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: reduceMotion ? 96 : [0, 145, 108],
                  opacity: 1,
                }}
                transition={{
                  duration: reduceMotion ? 0.4 : 0.8,
                  delay: reduceMotion ? 0.05 : 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
