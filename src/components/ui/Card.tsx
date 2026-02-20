import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`group relative cursor-pointer rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:bg-[var(--surface)] hover:shadow-xl hover:shadow-[var(--accent)]/5 active:scale-[0.98] active:bg-[var(--surface)]/50 active:shadow-sm ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
