import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[linear-gradient(180deg,rgba(20,31,50,0.96)_0%,rgba(10,18,31,0.96)_100%)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--text-secondary)] shadow-[0_14px_32px_rgba(4,10,24,0.34)] ${
        className ?? ""
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(255,122,26,0.55)]" />
      {children}
    </span>
  );
}
