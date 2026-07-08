"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const INTRO_DURATION_MS = 2450;
const REDUCED_DURATION_MS = 650;

export default function HomeBrandIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const introWindow = window as typeof window & {
      __lynxIntroStartedAt?: number;
    };
    const startedAt = introWindow.__lynxIntroStartedAt ?? performance.now();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reduceMotion ? REDUCED_DURATION_MS : INTRO_DURATION_MS;
    const remaining = Math.max(0, duration - (performance.now() - startedAt));

    const timeout = window.setTimeout(() => setVisible(false), remaining);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "window.__lynxIntroStartedAt=window.__lynxIntroStartedAt||performance.now();",
        }}
      />
      {visible ? (
        <div
          data-lynx-intro="true"
          aria-hidden="true"
          className="lynx-intro-overlay pointer-events-auto fixed inset-0 z-[9999] overflow-hidden overscroll-contain bg-[var(--bg)]"
        >
          <div className="absolute inset-0 bg-[#1b143d]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,6,27,0.36)_0%,rgba(10,6,27,0)_50%,rgba(10,6,27,0.36)_100%)]" />
          <div
            className="lynx-intro-scan absolute inset-y-0 left-0 w-[18rem] max-w-[34vw]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(210,205,255,0.22)_0%,rgba(137,132,230,0.12)_18%,rgba(89,89,201,0.045)_48%,transparent_100%)]" />
            <div className="absolute left-0 top-0 h-full w-px bg-[rgba(224,220,255,0.42)]" />
            <div className="absolute left-[-0.22rem] top-0 h-full w-2 bg-[linear-gradient(90deg,transparent,rgba(190,186,252,0.18),transparent)] blur-[2px]" />
          </div>

          <div className="relative flex h-full items-center justify-center px-6">
            <div
              className="lynx-intro-logo-shell relative flex h-auto w-[178px] items-center justify-center md:w-[266px]"
            >
              <div
                className="lynx-intro-logo-mark relative aspect-[10/3] w-full"
              >
                <div
                  className="lynx-intro-blur-mask absolute inset-y-0 right-0 overflow-hidden"
                >
                  <Image
                    src="/images/brand/lynx-logo-negative.png"
                    alt="LYNX"
                    width={720}
                    height={216}
                    priority
                    className="absolute right-0 top-0 h-full w-[178px] max-w-none select-none opacity-[0.65] blur-[5px] md:w-[266px]"
                  />
                </div>

                <div
                  className="lynx-intro-sharp-mask absolute inset-y-0 left-0 overflow-hidden"
                >
                  <Image
                    src="/images/brand/lynx-logo-negative.png"
                    alt=""
                    aria-hidden="true"
                    width={720}
                    height={216}
                    priority
                    className="absolute left-0 top-0 h-full w-[178px] max-w-none select-none md:w-[266px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
