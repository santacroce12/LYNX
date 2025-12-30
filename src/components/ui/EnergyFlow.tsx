type EnergyFlowProps = {
  className?: string;
};

export default function EnergyFlow({ className }: EnergyFlowProps) {
  return (
    <div className={`relative h-8 w-full overflow-hidden ${className ?? ""}`}>
      <div className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-[var(--accent-soft)]/20" />
      <div className="absolute inset-0 flex items-center">
        <div
          className="absolute h-[2px] w-24 animate-energy-flow bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        />
        <div
          className="absolute h-[2px] w-32 animate-energy-flow bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0"
          style={{ animationDelay: "1.2s", animationDuration: "4s" }}
        />
        <div
          className="absolute h-[1px] w-48 animate-energy-flow bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent opacity-0"
          style={{ animationDelay: "2.5s", animationDuration: "6s" }}
        />
      </div>
      <div className="absolute left-0 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
      <div className="absolute right-0 top-1/2 h-1 w-1 translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
    </div>
  );
}
