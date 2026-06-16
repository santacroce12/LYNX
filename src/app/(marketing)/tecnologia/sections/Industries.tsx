import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { tecnologia } from "@/content/tecnologia";

export default function TecnologiaIndustries() {
  return (
    <Section id="industrias" className="relative overflow-hidden pt-6 md:pt-10">
      <div className="mb-7 max-w-4xl text-left md:mx-auto md:mb-10 md:text-center">
        <Reveal>
          <h2 className="section-heading mt-4">
            {tecnologia.industries.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="section-copy mt-4 md:mx-auto">
            {tecnologia.industries.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-4 hidden max-w-3xl text-sm leading-7 text-[var(--muted)] sm:block md:mx-auto md:text-[15px]">
            {tecnologia.industries.support}
          </p>
        </Reveal>
      </div>

      <div className="scrollbar-hide mx-auto grid max-w-5xl auto-cols-[84%] grid-flow-col gap-3 overflow-x-auto snap-x snap-mandatory pb-2 pr-4 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:pr-0 xl:grid-cols-3">
        {tecnologia.industries.items.map((industry, index) => (
          <Reveal key={industry.title} delay={index * 0.04} className="snap-start">
            <article className="panel-shell group h-full rounded-[1.1rem] p-1 transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(89,89,201,0.18)] md:rounded-[1.25rem] md:p-1.5">
              <div className="flex h-full flex-col overflow-hidden rounded-[1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(10,17,32,0.72)_0%,rgba(8,14,28,0.96)_100%)] shadow-[0_16px_42px_rgba(2,6,23,0.14)]">
                <div className="relative aspect-[16/6.8] overflow-hidden border-b border-white/8 bg-[linear-gradient(180deg,rgba(5,12,24,0.55)_0%,rgba(5,12,24,0.12)_100%)] md:aspect-[16/7.5]">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,15,0)_0%,rgba(3,7,15,0.2)_60%,rgba(3,7,15,0.46)_100%)]" />
                </div>

                <div className="flex flex-1 flex-col p-3 md:p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[0.98rem] font-semibold leading-[1.06] text-[var(--text-strong)] md:text-[1.08rem]">
                        {industry.title}
                      </h3>
                      <p className="mt-1 text-[12px] leading-5 text-[var(--accent-soft)] md:mt-1.5 md:text-[13px]">
                        {industry.description}
                      </p>
                    </div>
                    <span className="pt-1 text-[10px] font-semibold uppercase tracking-normal text-[var(--muted-soft)] md:tracking-[0.24em]">
                      0{index + 1}
                    </span>
                  </div>

                  <ul className="mt-2.5 space-y-1.5 md:mt-3.5 md:space-y-2">
                    {industry.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bullet}
                        className={`items-start gap-2 text-[12px] leading-5 text-[var(--text)]/78 md:text-[13px] ${
                          bulletIndex > 1 ? "hidden sm:flex" : "flex"
                        }`}
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#64d9a7]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 md:mt-3.5">
                    <Button
                      href={industry.href}
                      variant="outline"
                      size="sm"
                      className="w-full justify-between rounded-[0.8rem] px-3.5 py-2.5 text-[10px] hover:border-[rgba(100,217,167,0.4)] hover:text-[var(--text-strong)] md:tracking-[0.16em]"
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
