import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

export default function Section({ children, id, className }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative py-10 md:py-12 ${className ?? ""}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">{children}</div>
    </section>
  );
}
