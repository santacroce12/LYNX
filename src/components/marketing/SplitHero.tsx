import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/layout/Section";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/motion/Reveal";
import EnergyFlow from "@/components/ui/EnergyFlow";
import { site } from "@/content/site";

type HomeCard = (typeof site.homeCards)[number];

const operationalFrames = [
  {
    kicker: "Diagnóstico",
    description:
      "Relevamos operación, sistemas y restricciones antes de intervenir.",
  },
  {
    kicker: "Implementación",
    description:
      "Ejecutamos integración, puesta en marcha y pruebas con criterio operativo.",
  },
  {
    kicker: "Continuidad",
    description:
      "Damos soporte y evolución para que la solución se sostenga en el tiempo.",
  },
];

function HomeRouteCard({
  card,
  index,
}: {
  card: HomeCard;
  index: number;
}) {
  const isEnergy = card.tone === "energy";

  return (
    <Reveal delay={0.14 + index * 0.05}>
      <Link
        href={card.href}
        aria-label={`Ir a ${card.title}`}
        className={`panel-shell group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.5rem] p-3 transition duration-300 ease-out-expo hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] active:translate-y-0 md:p-4 ${
          isEnergy
            ? "hover:border-[rgba(255,194,131,0.34)] hover:shadow-[0_24px_70px_rgba(3,8,20,0.48),0_0_0_1px_rgba(255,194,131,0.08)]"
            : "hover:border-[rgba(125,168,255,0.32)] hover:shadow-[0_24px_70px_rgba(3,8,20,0.48),0_0_0_1px_rgba(125,168,255,0.08)]"
        }`}
      >
        <span
          className={`panel-decoration pointer-events-none absolute inset-x-8 top-0 h-px opacity-0 transition duration-300 group-hover:opacity-100 ${
            isEnergy
              ? "bg-gradient-to-r from-transparent via-[rgba(255,194,131,0.34)] to-transparent"
              : "bg-gradient-to-r from-transparent via-[rgba(125,168,255,0.34)] to-transparent"
          }`}
        />

        <div
          className={`relative overflow-hidden rounded-[1.1rem] border border-white/6 transition duration-300 ${
            isEnergy
              ? "group-hover:border-[rgba(255,194,131,0.22)]"
              : "group-hover:border-[rgba(125,168,255,0.24)]"
          }`}
        >
          <Image
            src={card.image}
            alt={card.title}
            width={900}
            height={520}
            priority={index === 0}
            className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[250px] xl:h-[270px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.02)_0%,rgba(4,8,16,0.12)_34%,rgba(4,8,16,0.86)_100%)]" />
          <span
            className={`absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border bg-black/35 text-[var(--text-strong)] shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-md transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
              isEnergy
                ? "border-[rgba(255,194,131,0.24)]"
                : "border-[rgba(125,168,255,0.24)]"
            }`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span
                className={`section-kicker ${
                  isEnergy ? "text-[var(--accent-soft)]" : "text-[var(--accent-cool)]"
                }`}
              >
                {card.label}
              </span>
              <h2 className="mt-2 text-[1.75rem] font-semibold leading-[0.96] text-[var(--text-strong)] md:text-[2rem]">
                {card.title}
              </h2>
            </div>
            <span className="pt-1 text-[10px] uppercase tracking-normal text-[var(--muted-soft)] md:tracking-[0.18em]">
              0{index + 1}
            </span>
          </div>
          <p className="mt-2 text-[1rem] font-medium leading-6 text-[var(--text-secondary)]">
            {card.headline}
          </p>
          <p className="mt-3 flex-1 text-sm leading-7 text-[var(--muted)]">
            {card.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {card.highlights.map((item) => (
              <span
                key={item}
                className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-normal md:tracking-[0.16em] ${
                  isEnergy
                    ? "border-[rgba(255,194,131,0.16)] bg-[rgba(255,122,26,0.08)] text-[var(--accent-soft)]"
                    : "border-[rgba(125,168,255,0.16)] bg-[rgba(125,168,255,0.08)] text-[var(--accent-cool)]"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export default function SplitHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-accent opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(620px_circle_at_84%_20%,rgba(255,194,131,0.11),transparent_62%)] opacity-70"
        aria-hidden="true"
      />

      <Section className="pt-0 pb-6 md:pt-4 md:pb-8">
        <div className="panel-shell overflow-hidden rounded-[1.7rem] p-4 md:p-5 lg:p-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] xl:items-start">
            <div className="min-w-0">
              <Reveal>
                <Badge>{site.homeHero.badge}</Badge>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="mt-4 max-w-4xl text-[2.3rem] font-semibold leading-[0.95] text-[var(--text-strong)] md:max-w-none md:text-[3.6rem] lg:text-[4rem] xl:text-[4.35rem]">
                  {site.homeHero.title}
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-4 max-w-3xl text-[0.97rem] leading-7 text-[var(--text-secondary)] md:text-[1.05rem] md:leading-8">
                  {site.homeHero.description}
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {site.homeHero.signals.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1rem] border border-[var(--border)] bg-white/[0.03] px-4 py-4"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-normal text-[var(--muted-soft)] md:tracking-[0.18em]">
                        {item.label}
                      </p>
                      <p className="mt-2 text-[0.94rem] font-medium leading-5 text-[var(--text-secondary)]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.16}>
              <div className="rounded-[1.4rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.02)_100%)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:px-5">
                <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                  {operationalFrames.map((item) => (
                    <div
                      key={item.kicker}
                      className="rounded-[1rem] border border-white/8 bg-[rgba(6,10,20,0.46)] px-4 py-4"
                    >
                      <p className="section-kicker">{item.kicker}</p>
                      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.22}>
            <div className="mt-6">
              <EnergyFlow className="opacity-75" />
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            {site.homeCards.map((card, index) => (
              <HomeRouteCard key={card.href} card={card} index={index} />
            ))}
          </div>
        </div>
      </Section>
    </section>
  );
}
