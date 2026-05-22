"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  GitBranch,
  Link2,
  Rocket,
  Route,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type OrbitalTimelineIcon =
  | "clipboard"
  | "route"
  | "branch"
  | "settings"
  | "rocket"
  | "check";

export type OrbitalTimelineItem = {
  id: number;
  step: string;
  title: string;
  content: string;
  icon: OrbitalTimelineIcon;
  relatedIds?: number[];
};

type RadialOrbitalTimelineProps = {
  timelineData: OrbitalTimelineItem[];
  className?: string;
};

type OrbitalStyle = CSSProperties & {
  "--orbit-angle"?: string;
  "--orbit-angle-inverse"?: string;
  "--node-angle"?: string;
  "--node-angle-inverse"?: string;
  "--node-radius"?: string;
};

const iconsByKey: Record<OrbitalTimelineIcon, typeof ClipboardList> = {
  clipboard: ClipboardList,
  route: Route,
  branch: GitBranch,
  settings: Settings2,
  rocket: Rocket,
  check: CheckCircle2,
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360;
}

export default function RadialOrbitalTimeline({
  timelineData,
  className,
}: RadialOrbitalTimelineProps) {
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [isPointerPaused, setIsPointerPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const orbitRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const targetingTimerRef = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const activeItem = useMemo(
    () => timelineData.find((item) => item.id === activeNodeId) ?? null,
    [activeNodeId, timelineData],
  );

  const setOrbitAngle = (angle: number) => {
    const normalizedAngle = normalizeDegrees(angle);
    angleRef.current = normalizedAngle;
    orbitRef.current?.style.setProperty(
      "--orbit-angle",
      `${normalizedAngle}deg`,
    );
    orbitRef.current?.style.setProperty(
      "--orbit-angle-inverse",
      `${-normalizedAngle}deg`,
    );
  };

  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "160px 0px" },
    );

    observer.observe(orbit);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (
      activeNodeId !== null ||
      isPointerPaused ||
      prefersReducedMotion ||
      !isInView ||
      !isDocumentVisible ||
      timelineData.length === 0
    ) {
      return;
    }

    let frameId = 0;
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }

      const delta = timestamp - lastTimestamp;
      if (delta >= 28) {
        setOrbitAngle(angleRef.current + delta * 0.0048);
        lastTimestamp = timestamp;
      }
      frameId = window.requestAnimationFrame(animate);
    };

    orbitRef.current?.setAttribute("data-mode", "running");
    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [
    activeNodeId,
    isPointerPaused,
    prefersReducedMotion,
    isInView,
    isDocumentVisible,
    timelineData.length,
  ]);

  useEffect(() => {
    return () => {
      if (targetingTimerRef.current) {
        window.clearTimeout(targetingTimerRef.current);
      }
    };
  }, []);

  const clearActiveNode = () => {
    setActiveNodeId(null);
    setIsPointerPaused(false);
    orbitRef.current?.setAttribute("data-mode", "running");
  };

  const selectNode = (
    event: MouseEvent<HTMLElement>,
    nodeId: number,
    nodeIndex: number,
  ) => {
    event.stopPropagation();

    if (targetingTimerRef.current) {
      window.clearTimeout(targetingTimerRef.current);
    }

    const nodeAngle = (nodeIndex / timelineData.length) * 360;
    const targetAngle = normalizeDegrees(270 - nodeAngle);

    setActiveNodeId(nodeId);
    orbitRef.current?.setAttribute("data-mode", "targeting");

    window.requestAnimationFrame(() => {
      setOrbitAngle(targetAngle);
      targetingTimerRef.current = window.setTimeout(() => {
        orbitRef.current?.setAttribute("data-mode", "paused");
      }, 720);
    });
  };

  return (
    <div
      className={cn(
        "panel-shell relative mx-auto w-full max-w-[55rem] overflow-hidden rounded-[1.5rem]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(255,122,26,0.1),transparent_30%),linear-gradient(135deg,rgba(255,122,26,0.045),transparent_24%,rgba(125,168,255,0.035)_100%)]" />

      <div className="grid gap-3 p-4 md:hidden">
        <div className="mb-1">
          <p className="section-kicker text-[var(--accent-soft)]">
            Recorrido AS-IS / TO-BE
          </p>
          <h3 className="mt-3 text-[1.45rem] leading-[1.05] text-[var(--text-strong)]">
            Proceso tecnologico por etapas
          </h3>
        </div>

        {timelineData.map((item) => {
          const Icon = iconsByKey[item.icon];

          return (
            <article
              key={item.id}
              className="relative overflow-hidden rounded-[1.1rem] border border-[rgba(182,205,238,0.16)] bg-[rgba(6,12,22,0.62)] p-4"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.9rem] border border-[rgba(255,194,131,0.22)] bg-[rgba(255,122,26,0.1)] text-[var(--accent-soft)]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-soft)]">
                    {item.step}
                  </p>
                  <h4 className="mt-2 text-[1.02rem] leading-[1.1] text-[var(--text-strong)]">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {item.content}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="hidden p-3 md:block lg:p-4">
        <div
          ref={orbitRef}
          className="lynx-orbit panel-grid relative min-h-[535px] overflow-hidden rounded-[1.2rem] border border-[rgba(182,205,238,0.14)] bg-[radial-gradient(circle_at_50%_48%,rgba(255,122,26,0.07),transparent_22%),linear-gradient(180deg,rgba(5,10,18,0.7),rgba(5,10,18,0.95))]"
          data-mode="running"
          onClick={clearActiveNode}
          style={
            {
              "--orbit-angle": "0deg",
              "--orbit-angle-inverse": "0deg",
            } as OrbitalStyle
          }
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(125,168,255,0.07),transparent_24%),radial-gradient(circle_at_50%_50%,rgba(20,184,255,0.04),transparent_42%)]" />
          <div className="absolute left-1/2 top-1/2 h-[25.5rem] w-[25.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(182,205,238,0.18)] shadow-[0_0_0_1px_rgba(125,168,255,0.05)]" />

          <div className="absolute left-1/2 top-1/2 h-[8.75rem] w-[8.75rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(125,168,255,0.14)] bg-[radial-gradient(circle_at_50%_50%,rgba(7,12,24,0.18),rgba(7,12,24,0.96)_72%)]">
            <span className="absolute left-1/2 top-1/2 h-[6.25rem] w-[6.25rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(125,168,255,0.2)] bg-[radial-gradient(circle_at_50%_35%,rgba(222,236,255,0.92),rgba(113,151,255,0.9)_24%,rgba(58,119,255,0.75)_55%,rgba(18,196,255,0.55)_100%)] shadow-[0_0_34px_rgba(56,129,255,0.28)]" />
            <span className="absolute left-1/2 top-1/2 h-[2.15rem] w-[2.15rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.96),rgba(216,232,255,0.78)_56%,rgba(255,255,255,0)_100%)]" />
            <span className="absolute left-1/2 top-1/2 h-[10.5rem] w-[10.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(125,168,255,0.09)]" />
          </div>

          {timelineData.map((item, index) => {
            const nodeAngle = (index / timelineData.length) * 360;
            const isActive = item.id === activeNodeId;
            const isRelated = Boolean(activeItem?.relatedIds?.includes(item.id));
            const Icon = iconsByKey[item.icon];

            return (
              <div
                key={item.id}
                className="lynx-orbit-node absolute left-1/2 top-1/2 z-10 h-0 w-0"
                style={
                  {
                    "--node-angle": `${nodeAngle}deg`,
                    "--node-angle-inverse": `${-nodeAngle}deg`,
                    "--node-radius": "11.6rem",
                    zIndex: isActive ? 30 : 10,
                  } as OrbitalStyle
                }
              >
                <div className="relative flex w-[9.75rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                  <button
                    type="button"
                    className="group flex w-full flex-col items-center gap-2 outline-none"
                    aria-expanded={isActive}
                    onBlur={() => {
                      if (activeNodeId === null) {
                        setIsPointerPaused(false);
                      }
                    }}
                    onFocus={() => setIsPointerPaused(true)}
                    onClick={(event) => selectNode(event, item.id, index)}
                    onPointerEnter={() => setIsPointerPaused(true)}
                    onPointerLeave={() => {
                      if (activeNodeId === null) {
                        setIsPointerPaused(false);
                      }
                    }}
                  >
                    <span
                      className={cn(
                        "relative flex h-11 w-11 items-center justify-center rounded-full border bg-[rgba(7,13,24,0.95)] text-[var(--text-secondary)] shadow-[0_14px_30px_rgba(3,8,20,0.3)] transition-all duration-300",
                        isActive &&
                          "h-14 w-14 border-[rgba(125,168,255,0.72)] bg-[rgba(42,112,255,0.18)] text-[#dceaff] shadow-[0_0_26px_rgba(56,129,255,0.24)]",
                        !isActive &&
                          isRelated &&
                          "border-[rgba(125,168,255,0.42)] text-[var(--accent-cool)]",
                        !isActive &&
                          !isRelated &&
                          "border-[rgba(182,205,238,0.22)] group-hover:border-[rgba(125,168,255,0.38)] group-hover:text-[var(--accent-cool)]",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute -inset-2.5 rounded-full bg-[radial-gradient(circle,rgba(56,129,255,0.2),transparent_72%)] opacity-0 transition duration-300",
                          (isActive || isRelated) && "opacity-100",
                        )}
                      />
                      <Icon className="relative h-5 w-5" aria-hidden="true" />
                    </span>
                    <span
                      className={cn(
                        "flex min-h-[2.25rem] w-full items-start justify-center px-1 text-center text-[0.72rem] font-semibold leading-[1.1] text-[var(--muted)] transition duration-300",
                        isActive && "text-[var(--text-strong)]",
                      )}
                    >
                      {item.title}
                    </span>
                  </button>

                  {isActive ? (
                    <div
                      className="absolute left-1/2 top-[calc(100%+0.7rem)] w-[18rem] -translate-x-1/2 rounded-[0.9rem] border border-[rgba(125,168,255,0.24)] bg-[rgba(4,8,15,0.94)] p-3 text-left shadow-[0_18px_52px_rgba(0,0,0,0.38),0_0_28px_rgba(56,129,255,0.08)] backdrop-blur-xl"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-[rgba(125,168,255,0.42)]" />
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full border border-[rgba(125,168,255,0.28)] px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent-cool)]">
                          {item.step}
                        </span>
                        <span className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted-soft)]">
                          Etapa
                        </span>
                      </div>
                      <h4 className="mt-3 text-[0.98rem] leading-[1.08] text-[var(--text-strong)]">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                        {item.content}
                      </p>

                      {(item.relatedIds?.length ?? 0) > 0 ? (
                        <div className="mt-3 border-t border-[rgba(182,205,238,0.12)] pt-3">
                          <div className="mb-2 flex items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted-soft)]">
                            <Link2 className="h-3 w-3 text-[var(--accent-soft)]" />
                            Etapas conectadas
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds?.map((relatedId) => {
                              const relatedIndex = timelineData.findIndex(
                                (timelineItem) => timelineItem.id === relatedId,
                              );
                              const relatedItem = timelineData[relatedIndex];

                              if (!relatedItem) {
                                return null;
                              }

                              return (
                                <button
                                  key={relatedId}
                                  type="button"
                                  className="group inline-flex items-center gap-1.5 rounded-[0.55rem] border border-[rgba(182,205,238,0.14)] bg-[rgba(255,255,255,0.025)] px-2.5 py-1.5 text-[0.68rem] font-semibold text-[var(--text-secondary)] transition duration-300 hover:border-[rgba(125,168,255,0.32)] hover:text-[var(--text-strong)]"
                                  onClick={(event) =>
                                    selectNode(event, relatedId, relatedIndex)
                                  }
                                >
                                  {relatedItem.title}
                                  <ArrowRight className="h-3 w-3 text-[var(--accent-cool)] transition duration-300 group-hover:translate-x-0.5" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
