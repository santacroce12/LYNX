import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[linear-gradient(180deg,rgba(20,31,50,0.96)_0%,rgba(10,18,31,0.96)_100%)] px-3 py-1.5 text-[9px] font-semibold uppercase leading-[1.25] tracking-normal text-[var(--text-secondary)] shadow-[0_14px_32px_rgba(4,10,24,0.34)] md:px-4 md:py-2 md:text-[10px] md:tracking-[0.3em] ${
        className ?? ""
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(239,130,57,0.55)]" />
      {children}
    </span>
  );
}
