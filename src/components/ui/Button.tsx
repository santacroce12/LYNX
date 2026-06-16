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
  lg: "px-5 py-3 text-[13px] md:px-6 md:text-[15px]",
};

const variantClasses = {
  primary:
    "border border-[rgba(247,208,163,0.22)] bg-[linear-gradient(135deg,var(--accent)_0%,#7771de_58%,rgba(247,208,163,0.92)_160%)] text-white shadow-[0_18px_40px_rgba(89,89,201,0.24)] hover:-translate-y-0.5 hover:shadow-[0_24px_52px_rgba(89,89,201,0.32)]",
  outline:
    "border border-[var(--border-strong)] bg-[rgba(255,255,255,0.03)] text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:-translate-y-0.5 hover:border-[rgba(247,208,163,0.42)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--text-strong)]",
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
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-center font-semibold uppercase leading-none tracking-normal transition duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-60 md:tracking-[0.18em] " +
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
