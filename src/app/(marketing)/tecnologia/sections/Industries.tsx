import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { tecnologia } from "@/content/tecnologia";

export default function TecnologiaIndustries() {
  return (
    <Section id="industrias" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_50%_0%,rgba(60,191,140,0.12),transparent_28%),radial-gradient(circle_at_18%_18%,rgba(125,168,255,0.12),transparent_24%)]" />

      <div className="mx-auto mb-8 max-w-4xl text-center md:mb-10">
        <Reveal>
          <h2 className="section-heading mt-4">
            {tecnologia.industries.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="section-copy mx-auto mt-4">
            {tecnologia.industries.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)] md:text-[15px]">
            {tecnologia.industries.support}
          </p>
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tecnologia.industries.items.map((industry, index) => (
          <Reveal key={industry.title} delay={index * 0.04}>
            <article className="panel-shell group h-full rounded-[1.55rem] p-2.5 transition duration-300 hover:-translate-y-1 hover:border-[rgba(125,168,255,0.18)]">
              <div className="flex h-full flex-col overflow-hidden rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(10,17,32,0.72)_0%,rgba(8,14,28,0.96)_100%)] shadow-[0_20px_60px_rgba(2,6,23,0.16)]">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/8 bg-[linear-gradient(180deg,rgba(5,12,24,0.55)_0%,rgba(5,12,24,0.12)_100%)]">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,15,0)_0%,rgba(3,7,15,0.2)_60%,rgba(3,7,15,0.46)_100%)]" />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[1.18rem] font-semibold leading-[1.08] text-[var(--text-strong)]">
                        {industry.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--accent-soft)]">
                        {industry.description}
                      </p>
                    </div>
                    <span className="pt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--muted-soft)]">
                      0{index + 1}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {industry.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm leading-6 text-[var(--text)]/78"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#64d9a7]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Button
                      href={industry.href}
                      variant="outline"
                      size="sm"
                      className="w-full justify-between rounded-[0.95rem] px-4 py-3 text-[10px] tracking-[0.18em] hover:border-[rgba(100,217,167,0.4)] hover:text-[var(--text-strong)]"
                    >
                      <span>{industry.buttonLabel}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
