import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--muted)] ${
        className ?? ""
      }`}
    >
      {children}
    </span>
  );
}
