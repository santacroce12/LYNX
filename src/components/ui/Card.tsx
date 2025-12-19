import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 p-6 shadow-sm transition duration-300 ease-out-expo ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
