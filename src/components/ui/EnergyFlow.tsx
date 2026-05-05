type EnergyFlowProps = {
  className?: string;
  variant?: "energy" | "tech";
};

export default function EnergyFlow({ className, variant = "energy" }: EnergyFlowProps) {
  const isTech = variant === "tech";
  const baseLine = isTech
    ? "linear-gradient(90deg,rgba(125,168,255,0.05),rgba(94,234,212,0.24),rgba(125,168,255,0.2),rgba(125,168,255,0.05))"
    : "linear-gradient(90deg,rgba(255,122,26,0.06),rgba(255,194,131,0.28),rgba(125,168,255,0.16),rgba(255,122,26,0.06))";
  const primary = isTech ? "rgba(125,168,255,0.82)" : "var(--accent)";
  const secondary = isTech ? "rgba(94,234,212,0.72)" : "var(--accent-soft)";
  const shadow = isTech ? "0 0 12px rgba(94,234,212,0.45)" : "0 0 12px var(--accent)";

  return (
    <div className={`relative h-8 w-full overflow-hidden ${className ?? ""}`}>
      <div
        className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2"
        style={{ background: baseLine }}
      />
      <div className="absolute inset-0 flex items-center">
        <div
          className="absolute h-[2px] w-24 animate-energy-flow opacity-0"
          style={{
            animationDelay: "0s",
            animationDuration: "3s",
            background: `linear-gradient(90deg,transparent,${primary},transparent)`,
          }}
        />
        <div
          className="absolute h-[2px] w-32 animate-energy-flow opacity-0"
          style={{
            animationDelay: "1.2s",
            animationDuration: "4s",
            background: `linear-gradient(90deg,transparent,${secondary},transparent)`,
          }}
        />
        <div
          className="absolute h-[1px] w-48 animate-energy-flow opacity-0"
          style={{
            animationDelay: "2.5s",
            animationDuration: "6s",
            background: `linear-gradient(90deg,transparent,${primary},transparent)`,
          }}
        />
      </div>
      <div
        className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full"
        style={{ background: primary, boxShadow: shadow }}
      />
      <div
        className="absolute right-0 top-1/2 h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full"
        style={{ background: primary, boxShadow: shadow }}
      />
    </div>
  );
}
