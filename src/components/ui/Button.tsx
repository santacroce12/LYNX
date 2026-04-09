import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const sizeClasses = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-[15px]",
};

const variantClasses = {
  primary:
    "border border-[rgba(255,194,131,0.26)] bg-[linear-gradient(135deg,#ffd3a6_0%,var(--accent-soft)_34%,var(--accent)_100%)] text-[#0a1120] shadow-[0_18px_40px_rgba(255,122,26,0.22)] hover:-translate-y-0.5 hover:shadow-[0_24px_52px_rgba(255,122,26,0.3)]",
  outline:
    "border border-[var(--border-strong)] bg-[rgba(255,255,255,0.03)] text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:-translate-y-0.5 hover:border-[rgba(255,194,131,0.42)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--text-strong)]",
  ghost:
    "text-[var(--text)] hover:-translate-y-0.5 hover:text-[var(--accent-soft)]",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.2em] transition duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-60 " +
    sizeClasses[size] +
    " " +
    variantClasses[variant] +
    (className ? ` ${className}` : "");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
