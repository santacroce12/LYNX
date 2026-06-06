import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/motion/Reveal";
import EnergyFlow from "@/components/ui/EnergyFlow";
import { site } from "@/content/site";

type HomeCard = (typeof site.homeCards)[number];

function HomeRouteCard({
  card,
  index,
}: {
  card: HomeCard;
  index: number;
}) {
  const isEnergy = card.tone === "energy";

  return (
    <Reveal delay={0.2 + index * 0.06}>
      <Link
        href={card.href}
        aria-label={`Ir a ${card.title}`}
        className={`group relative block overflow-hidden rounded-[1.05rem] border p-2.5 transition duration-300 hover:-translate-y-1 md:rounded-[1.45rem] md:p-5 ${
          isEnergy
            ? "border-[rgba(255,194,131,0.16)] bg-[linear-gradient(135deg,rgba(255,122,26,0.12),rgba(7,12,22,0.94)_46%,rgba(7,12,22,0.98)_100%)] hover:border-[rgba(255,194,131,0.32)]"
            : "border-[rgba(125,168,255,0.18)] bg-[linear-gradient(135deg,rgba(125,168,255,0.14),rgba(7,12,22,0.94)_46%,rgba(7,12,22,0.98)_100%)] hover:border-[rgba(125,168,255,0.34)]"
        }`}
      >
        <div className="grid grid-cols-[76px_minmax(0,1fr)_32px] items-center gap-3 md:grid-cols-[minmax(0,1fr)_228px] md:gap-4">
          <div className="order-2 min-w-0 md:order-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className={`section-kicker hidden md:inline-flex ${
                    isEnergy ? "text-[var(--accent-soft)]" : "text-[var(--accent-cool)]"
                  }`}
                >
                  {card.label}
                </span>
                <h2 className="text-[1.18rem] font-semibold leading-[1] text-[var(--text-strong)] md:mt-2 md:text-[1.82rem] md:leading-[0.98]">
                  {card.title}
                </h2>
              </div>
              <span className="hidden pt-1 text-[10px] uppercase tracking-normal text-[var(--muted-soft)] md:block md:tracking-[0.18em]">
                0{index + 1}
              </span>
            </div>

            <p className="mt-1.5 text-[0.82rem] font-medium leading-5 text-[var(--text-secondary)] md:mt-3 md:text-[0.98rem] md:leading-6">
              {card.headline}
            </p>
            <p className="mt-2 hidden text-sm leading-7 text-[var(--muted)] md:block">
              {card.description}
            </p>

            <div className="mt-4 hidden flex-wrap gap-2 md:flex">
              {card.highlights.map((item, chipIndex) => (
                <span
                  key={item}
                  className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-normal md:tracking-[0.16em] ${
                    isEnergy
                      ? "border-[rgba(255,194,131,0.16)] bg-[rgba(255,122,26,0.08)] text-[var(--accent-soft)]"
                      : "border-[rgba(125,168,255,0.16)] bg-[rgba(125,168,255,0.08)] text-[var(--accent-cool)]"
                  } ${chipIndex > 1 ? "hidden md:inline-flex" : ""}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative order-1 h-[76px] overflow-hidden rounded-[0.85rem] border border-white/8 md:order-2 md:h-[188px] md:rounded-[1.1rem]">
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(min-width: 768px) 228px, 76px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.06)_0%,rgba(5,10,18,0.18)_38%,rgba(5,10,18,0.84)_100%)]" />
            <span
              className={`absolute right-3 top-3 hidden h-10 w-10 items-center justify-center rounded-full border bg-black/35 text-[var(--text-strong)] shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-md transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:inline-flex ${
                isEnergy
                  ? "border-[rgba(255,194,131,0.24)]"
                  : "border-[rgba(125,168,255,0.24)]"
              }`}
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
          <span
            className={`order-3 inline-flex h-8 w-8 items-center justify-center rounded-full border bg-black/25 text-[var(--text-strong)] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:hidden ${
              isEnergy
                ? "border-[rgba(255,194,131,0.22)]"
                : "border-[rgba(125,168,255,0.24)]"
            }`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function SplitHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/8">
      <Image
        src="/images/tecnologia/tecnologia-abstracto.optimized.webp"
        alt="Infraestructura digital de LYNX"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover opacity-[0.18]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,9,18,0.82)_0%,rgba(5,9,18,0.9)_56%,rgba(4,9,18,0.96)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_18%,rgba(255,122,26,0.16),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(125,168,255,0.14),transparent_22%),radial-gradient(circle_at_52%_100%,rgba(255,122,26,0.08),transparent_28%)]" />
      <div className="pointer-events-none absolute -left-[12%] top-[8%] h-[30rem] w-[30rem] rounded-full border border-[rgba(125,168,255,0.1)] opacity-40 blur-[1px]" />
      <div className="pointer-events-none absolute -left-[8%] top-[2%] h-[24rem] w-[24rem] rotate-[18deg] rounded-full border border-[rgba(255,122,26,0.12)] opacity-55 blur-[1px]" />
      <div className="pointer-events-none absolute left-[18%] top-[12%] h-[32rem] w-[32rem] rotate-[28deg] rounded-full border border-[rgba(125,168,255,0.1)] opacity-35 blur-[1px]" />

      <div className="mx-auto flex w-full max-w-[1320px] flex-col px-4 pb-7 pt-8 sm:px-6 sm:py-10 md:min-h-[740px] md:px-8 md:py-14">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-center">
          <div className="relative z-10 min-w-0">
            <Reveal>
              <Badge>{site.homeHero.badge}</Badge>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-4 max-w-3xl text-[2.15rem] font-semibold leading-[0.94] text-white [text-shadow:0_10px_28px_rgba(0,0,0,0.28)] sm:mt-5 sm:text-[2.45rem] md:text-[4.2rem] md:leading-[0.9] xl:text-[4.6rem]">
                {site.homeHero.title}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-7 text-white/82 sm:mt-5 sm:text-[1.02rem] sm:leading-8 md:text-[1.1rem] md:leading-8">
                <span className="sm:hidden">
                  Integramos infraestructura, automatización y software para operar con visibilidad y control.
                </span>
                <span className="hidden sm:inline">{site.homeHero.description}</span>
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:grid-cols-3 md:gap-3">
                {site.homeHero.signals.map((item, signalIndex) => (
                  <div
                    key={item.label}
                    className={`rounded-[0.95rem] border border-white/10 bg-[rgba(255,255,255,0.03)] px-3 py-2.5 backdrop-blur-md md:rounded-[1rem] md:px-4 md:py-4 ${
                      signalIndex === 2 ? "hidden sm:block" : ""
                    }`}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-normal text-[var(--muted-soft)] md:tracking-[0.18em]">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-[0.86rem] font-medium leading-5 text-[var(--text-secondary)] md:mt-2 md:text-[0.95rem]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="relative min-h-[204px] md:min-h-[450px]">
              <div className="absolute left-[5%] top-[15%] hidden w-[31%] overflow-hidden rounded-[1.35rem] border border-[rgba(255,194,131,0.18)] bg-[rgba(5,9,18,0.68)] p-2 shadow-[0_30px_80px_rgba(2,6,23,0.34)] backdrop-blur-md md:block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem]">
                  <Image
                    src="/images/energia/electrico.optimized.webp"
                    alt="Infraestructura energética"
                    fill
                    sizes="(min-width: 1024px) 18vw, 32vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,20,0.08)_0%,rgba(6,10,20,0.18)_44%,rgba(6,10,20,0.72)_100%)]" />
                </div>
              </div>

              <div className="absolute right-0 top-0 w-full overflow-hidden rounded-[1.45rem] border border-[rgba(125,168,255,0.18)] bg-[rgba(6,10,20,0.66)] p-2.5 shadow-[0_34px_100px_rgba(2,6,23,0.42)] backdrop-blur-md md:w-[76%] md:rounded-[1.85rem] md:p-3">
                <div className="relative aspect-[16/8.8] overflow-hidden rounded-[1.35rem] md:aspect-[16/10]">
                  <Image
                    src="/images/tecnologia/tecnologico.optimized.webp"
                    alt="Centro de control tecnológico"
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,20,0.02)_0%,rgba(6,10,20,0.12)_32%,rgba(6,10,20,0.62)_100%)]" />
                </div>
              </div>

              <div className="absolute bottom-0 right-[8%] hidden w-[64%] overflow-hidden rounded-[1.6rem] border border-white/12 bg-[rgba(6,10,20,0.78)] p-2.5 shadow-[0_30px_90px_rgba(2,6,23,0.4)] backdrop-blur-md md:block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[1.1rem]">
                  <Image
                    src="/images/tecnologia/generated/caso-tableros-gestion.optimized.webp"
                    alt="Tableros y monitoreo operativo"
                    fill
                    sizes="(min-width: 1024px) 36vw, 88vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,20,0.02)_0%,rgba(6,10,20,0.14)_38%,rgba(6,10,20,0.76)_100%)]" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.22}>
          <div className="mt-7 hidden md:block">
            <EnergyFlow className="opacity-70" />
          </div>
        </Reveal>

        <div className="mt-5 md:mt-6">
          <Reveal delay={0.24}>
            <div className="mb-3 flex items-center justify-between gap-4 md:mb-4">
              <div>
                <span className="section-kicker">Elegí una vertical</span>
                <p className="mt-2 hidden max-w-2xl text-sm leading-7 text-[var(--muted)] md:block md:text-[0.98rem]">
                  Dos caminos claros para entrar a LYNX: energía para infraestructura crítica y tecnología para integración operativa.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-2">
            {site.homeCards.map((card, index) => (
              <HomeRouteCard key={card.href} card={card} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
