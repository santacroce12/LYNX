import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

export default function Section({ children, id, className }: SectionProps) {
  return (
    <section id={id} className={`relative py-16 md:py-24 ${className ?? ""}`}>
      <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
    </section>
  );
}
