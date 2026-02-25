import Card from "@/components/ui/Card";
import Reveal from "@/components/motion/Reveal";

type FeatureItem = {
  title: string;
  description: string;
  icon?: string;
};

type FeatureGridProps = {
  title?: string;
  subtitle?: string;
  items: FeatureItem[];
  columns?: 2 | 3;
};

const iconMap: Record<string, JSX.Element> = {
  bolt: (
    <path
      d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  grid: (
    <path
      d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  shield: (
    <path
      d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  cpu: (
    <path
      d="M9 9h6v6H9V9zm-4 3h2m10 0h2M12 5v2m0 10v2M7 7l-1-1m11 11-1-1M7 17l-1 1m11-11-1-1"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  cloud: (
    <path
      d="M6 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11 2 3 3 0 0 0 1 6z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  link: (
    <path
      d="M9 7H7a4 4 0 0 0 0 8h2m6-8h2a4 4 0 0 1 0 8h-2m-7-4h8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  sensor: (
    <path
      d="M12 4v2m0 12v2M4 12h2m12 0h2M7 7l-1-1m11 11-1-1M7 17l-1 1m11-11-1-1M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  search: (
    <path
      d="M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 0 7 7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  monitor: (
    <path
      d="M4 6h16v10H4V6zm4 14h8m-6-4 1 4m4-4-1 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  ladder: (
    <path
      d="M7 4v16m10-16v16M7 7h10M7 11h10M7 15h10"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  rocket: (
    <path
      d="M5 19l4-1 7-7c2-2 3-5 3-8-3 0-6 1-8 3l-7 7-1 4 2 2zM14 6l4 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  clipboard: (
    <>
      <path
        d="M16 4h-1a2 2 0 0 0-4 0H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 2h.01"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
};

export default function FeatureGrid({
  title,
  subtitle,
  items,
  columns = 3,
}: FeatureGridProps) {
  const columnsClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <div>
      {title ? (
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
          {subtitle ? (
            <p className="mt-3 text-sm text-[var(--muted)] md:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}
      <div
        className={`flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 -mx-6 px-6 scrollbar-hide md:grid ${columnsClass} md:gap-8 md:overflow-visible md:pb-0 md:mx-0 md:px-0`}
      >
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.05}>
            <div className="min-w-[85vw] snap-center md:min-w-0 h-full">
              <Card className="h-full">
                {item.icon && iconMap[item.icon] ? (
                  <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)]">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      {iconMap[item.icon]}
                    </svg>
                  </span>
                ) : null}
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {item.description}
                </p>
              </Card>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
