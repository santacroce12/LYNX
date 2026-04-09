import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`panel-shell group relative cursor-pointer overflow-hidden rounded-[1.5rem] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(255,194,131,0.24)] active:scale-[0.985] ${
        className ?? ""
      }`}
    >
      <div className="panel-decoration pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
