import Image from "next/image";
import Link from "next/link";
import Section from "@/components/layout/Section";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";

export default function SplitHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-accent" aria-hidden="true" />
      <div className="absolute inset-0 bg-radial-accent-2" aria-hidden="true" />
      <Section className="pt-24 pb-20">
        <div className="relative z-10 max-w-3xl">
          <Reveal>
            <Badge>{site.homeHero.badge}</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              {site.name}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-[var(--muted)] md:text-xl">
              {site.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-3 text-sm text-[var(--muted)] md:text-base">
              {site.homeHero.description}
            </p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {site.homeCards.map((card, index) => (
            <Reveal key={card.href} delay={0.1 + index * 0.05}>
              <Link
                href={card.href}
                className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              >
                <Card className="relative h-full overflow-hidden border border-[var(--border)] bg-[var(--surface)]/60 p-6 transition duration-300 ease-out-expo group-hover:-translate-y-1 group-hover:scale-[1.01] group-hover:border-[var(--accent)] group-hover:shadow-glow">
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[var(--accent)]/20 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-80"
                    aria-hidden="true"
                  />
                  <Image
                    src={card.image}
                    alt=""
                    width={640}
                    height={360}
                    className="h-40 w-full rounded-xl border border-[var(--border)] object-cover"
                    priority={index === 0}
                  />
                  <div className="mt-6 space-y-4">
                    <Badge className="text-[var(--accent)]">{card.label}</Badge>
                    <h3 className="text-2xl font-semibold">{card.title}</h3>
                    <p className="text-sm text-[var(--muted)]">
                      {card.description}
                    </p>
                    <span className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--bg)] transition duration-300 ease-out-expo group-hover:bg-[var(--accent-soft)]">
                      {card.cta}
                    </span>
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </section>
  );
}
