"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { tecnologia } from "@/content/tecnologia";
import {
  Truck,
  ClipboardCheck,
  Code,
  Layers,
  LifeBuoy,
  Network,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  truck: Truck,
  "clipboard-check": ClipboardCheck,
  code: Code,
  layers: Layers,
  network: Network,
  "life-buoy": LifeBuoy,
};

const serviceActions = [
  "Diseñar",
  "Integrar",
  "Implementar",
  "Operar",
  "Mantener",
  "Evolucionar",
];

const serviceNodePositions = [
  { left: "13%", top: "38%" },
  { left: "31%", top: "16%" },
  { left: "56%", top: "30%" },
  { left: "31%", top: "72%" },
  { left: "55%", top: "84%" },
  { left: "84%", top: "42%" },
];

const serviceFlowPath =
  "M86 118 C150 32 268 42 344 102 C423 164 317 226 220 238 C358 315 548 294 620 176";

export default function TecnologiaServices() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const activeService = tecnologia.services[activeServiceIndex];
  const ActiveIcon = activeService
    ? icons[activeService.icon as string] || Layers
    : Layers;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveServiceIndex(
        (current) => (current + 1) % tecnologia.services.length,
      );
    }, 3600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <Section id="servicios">
      <div className="relative mx-auto mb-7 max-w-3xl text-left md:mb-8 md:text-center">
        <Reveal>
          <span className="section-kicker">Servicios</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="section-heading mx-auto mt-4 max-w-2xl">
            {tecnologia.sections.servicesTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="section-copy mx-auto mt-4">
            {tecnologia.sections.servicesSubtitle}
          </p>
        </Reveal>
      </div>

      <Reveal>
        <div className="panel-shell mb-4 overflow-hidden rounded-[1.55rem] p-2.5">
          <div className="relative min-h-[260px] overflow-hidden rounded-[1.15rem] border border-white/8 px-4 py-4 md:min-h-[300px] md:px-6 md:py-6 lg:min-h-[320px]">
            <Image
              src="/images/tecnologia/generated/integracion-servicios.optimized.webp"
              alt="Arquitectura de integración tecnológica con soporte operativo"
              fill
              sizes="(min-width: 1280px) 1120px, 100vw"
              className="object-cover object-center opacity-[0.78]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,16,0.92)_0%,rgba(4,8,16,0.72)_42%,rgba(4,8,16,0.38)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.08)_0%,rgba(4,8,16,0.2)_44%,rgba(4,8,16,0.74)_100%)]" />

            <div className="relative z-10 flex min-h-[208px] max-w-2xl flex-col justify-end md:min-h-[252px] lg:min-h-[268px]">
              <span className="section-kicker text-[var(--accent-cool)]">
                Punta a punta
              </span>
              <h3 className="mt-4 max-w-xl text-[1.35rem] font-semibold leading-[1.08] text-[var(--text-strong)] md:text-[1.85rem] md:leading-[1]">
                Arquitectura de integración tecnológica con soporte operativo.
              </h3>
              <div className="mt-5 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-3">
                {[
                  "Diseñar",
                  "Integrar",
                  "Implementar",
                  "Operar",
                  "Mantener",
                  "Evolucionar",
                ].map((item, actionIndex) => (
                  <span
                    key={item}
                    className={`min-h-9 min-w-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-normal text-white/78 backdrop-blur-md md:tracking-[0.18em] ${
                      actionIndex > 2 ? "hidden sm:inline-flex" : "inline-flex"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(239,130,57,0.6)]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="panel-shell relative overflow-hidden rounded-[1.45rem] p-4 md:p-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(239,130,57,0.12),transparent_28%),radial-gradient(circle_at_84%_20%,rgba(89,89,201,0.1),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_54%)]" />
          <div className="pointer-events-none absolute inset-x-6 top-1/2 h-px bg-gradient-to-r from-transparent via-[rgba(89,89,201,0.2)] to-transparent" />

          <div className="relative grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(330px,0.68fr)] lg:items-stretch">
            <div className="relative min-h-[350px] overflow-hidden rounded-[1.15rem] border border-white/8 bg-[rgba(13,6,37,0.58)] p-3.5 md:min-h-[430px] md:p-5">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(89,89,201,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(89,89,201,0.045)_1px,transparent_1px)] bg-[size:56px_56px] opacity-45 [mask-image:radial-gradient(circle_at_50%_44%,#000_12%,transparent_76%)]" />

              <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="section-kicker text-[var(--accent-soft)]">
                    Flujo de servicio
                  </p>
                  <h3 className="mt-3 text-[1.3rem] font-semibold leading-[1.05] text-[var(--text-strong)] md:text-[1.75rem]">
                    De la consulta al soporte continuo.
                  </h3>
                </div>
                <span className="rounded-full border border-[rgba(89,89,201,0.18)] bg-[rgba(89,89,201,0.08)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-cool)]">
                  0{activeServiceIndex + 1} / 06
                </span>
              </div>

              <div className="relative z-10 mt-4 md:hidden">
                <div className="absolute bottom-4 left-[1.1rem] top-4 w-px bg-[rgba(89,89,201,0.18)]" />
                {tecnologia.services.map((service, index) => {
                  const Icon = icons[service.icon as string] || Layers;
                  const isActive = activeServiceIndex === index;

                  return (
                    <button
                      key={service.title}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveServiceIndex(index)}
                      className={`group relative mb-2 flex w-full items-center gap-3 rounded-[0.95rem] px-2 py-2 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${
                        isActive
                          ? "bg-[rgba(239,130,57,0.11)]"
                          : "bg-transparent hover:bg-[rgba(89,89,201,0.04)]"
                      }`}
                    >
                      <span
                        className={`relative z-10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                          isActive
                            ? "border-[rgba(247,208,163,0.44)] bg-[var(--accent)] text-[var(--bg)] shadow-[0_0_24px_rgba(239,130,57,0.28)]"
                            : "border-[rgba(89,89,201,0.2)] bg-[rgba(13,6,37,0.9)] text-[var(--accent-cool)]"
                        }`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                          0{index + 1}
                        </span>
                        <span
                          className={`mt-1 block text-[0.94rem] font-semibold leading-[1.08] transition duration-300 ${
                            isActive
                              ? "text-[var(--text-strong)]"
                              : "text-[var(--text-secondary)]"
                          }`}
                        >
                          {service.title}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="relative z-10 mt-7 hidden h-[320px] md:block">
                <svg
                  viewBox="0 0 720 320"
                  className="absolute inset-0 h-full w-full overflow-visible"
                  aria-hidden="true"
                >
                  <path
                    d={serviceFlowPath}
                    fill="none"
                    stroke="rgba(89,89,201,0.18)"
                    strokeWidth="1.4"
                  />
                  <path
                    d={serviceFlowPath}
                    fill="none"
                    stroke="url(#service-flow-gradient)"
                    strokeDasharray="56 220"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                  <circle r="4.5" fill="var(--accent)" filter="url(#service-flow-glow)">
                    <animateMotion
                      dur="3.6s"
                      path={serviceFlowPath}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="2.5" fill="rgba(245,243,255,0.92)">
                    <animateMotion
                      begin="0.18s"
                      dur="3.6s"
                      path={serviceFlowPath}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <defs>
                    <linearGradient id="service-flow-gradient" x1="0" x2="1">
                      <stop offset="0%" stopColor="rgba(239,130,57,0.05)" />
                      <stop offset="52%" stopColor="rgba(239,130,57,0.9)" />
                      <stop offset="100%" stopColor="rgba(89,89,201,0.65)" />
                    </linearGradient>
                    <filter
                      id="service-flow-glow"
                      x="-220%"
                      y="-220%"
                      width="540%"
                      height="540%"
                    >
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </svg>

                {tecnologia.services.map((service, index) => {
                  const Icon = icons[service.icon as string] || Layers;
                  const isActive = activeServiceIndex === index;
                  const position = serviceNodePositions[index];
                  
                  const labelPosition =
                    index === 0
                      ? "bottom"
                    : index === 1
                      ? "top"
                      : index === 2
                      ? "top"
                    : index === 3
                      ? "bottom"
                      : index === 4
                      ? "top"
                      : index === 5
                      ? "top"
                      : "bottom";

                  let labelClasses =
                    "absolute z-10 w-[9.7rem] text-[0.82rem] font-semibold leading-[1.08] transition duration-300 ";
                  if (labelPosition === "bottom") {
                    labelClasses += "left-1/2 -translate-x-1/2 top-full mt-[1.15rem] text-center";
                  } else if (labelPosition === "top") {
                    labelClasses += "left-1/2 -translate-x-1/2 bottom-full mb-[1.15rem] text-center";
                  } else if (labelPosition === "left") {
                    labelClasses += "right-full -translate-y-1/2 top-1/2 mr-[1.15rem] text-right";
                  }

                  return (
                    <button
                      key={service.title}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveServiceIndex(index)}
                      className="group absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
                      style={position}
                    >
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-full border transition duration-300 ${
                          isActive
                            ? "scale-110 border-[rgba(247,208,163,0.58)] bg-[var(--accent)] text-[var(--bg)] shadow-[0_0_0_8px_rgba(239,130,57,0.08),0_0_34px_rgba(239,130,57,0.32)]"
                            : "border-[rgba(182,205,238,0.2)] bg-[rgba(13,6,37,0.92)] text-[var(--accent-cool)] shadow-[0_16px_34px_rgba(0,0,0,0.24)] group-hover:border-[rgba(89,89,201,0.42)] group-hover:text-[var(--text-strong)]"
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className={labelClasses}>
                        <span
                          className={`inline-flex max-w-full rounded-[0.95rem] border px-2.5 py-1.5 shadow-[0_10px_22px_rgba(2,6,23,0.22)] backdrop-blur-sm ${
                            isActive
                              ? "border-[rgba(247,208,163,0.14)] bg-[rgba(13,6,37,0.94)] text-[var(--text-strong)]"
                              : "border-white/[0.06] bg-[rgba(13,6,37,0.92)] text-[rgba(182,205,238,0.72)]"
                          }`}
                        >
                          {service.title}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <aside className="relative hidden overflow-hidden rounded-[1.15rem] border border-[rgba(247,208,163,0.14)] bg-[rgba(13,6,37,0.76)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:block">
              <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[rgba(239,130,57,0.16)] blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-[rgba(89,89,201,0.14)] blur-3xl" />

              <div className="relative z-10 flex h-full min-h-[260px] flex-col md:min-h-[320px]">
                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-[0.9rem] border border-[rgba(247,208,163,0.24)] bg-[rgba(239,130,57,0.12)] text-[var(--accent-soft)] md:h-12 md:w-12 md:rounded-[1rem]">
                    <ActiveIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted-soft)]">
                    Servicio activo
                  </span>
                </div>

                <div className="mt-5 md:mt-8">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--accent-soft)]">
                    Etapa 0{activeServiceIndex + 1}
                  </p>
                  <h3 className="mt-3 text-[1.28rem] font-semibold leading-[1.04] text-[var(--text-strong)] md:text-[2rem]">
                    {activeService?.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-6 text-[var(--text-secondary)] md:mt-4 md:text-[0.98rem] md:leading-7">
                    {activeService?.description}
                  </p>
                </div>

                <div className="mt-auto pt-5 md:pt-7">
                  <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    <span>Avance del ciclo</span>
                    <span>
                      {Math.round(
                        ((activeServiceIndex + 1) / tecnologia.services.length) * 100,
                      )}
                      %
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-cool))] transition-all duration-700 ease-out"
                      style={{
                        width: `${((activeServiceIndex + 1) / tecnologia.services.length) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {serviceActions
                      .slice(0, activeServiceIndex + 1)
                      .map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]"
                        >
                          {item}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
