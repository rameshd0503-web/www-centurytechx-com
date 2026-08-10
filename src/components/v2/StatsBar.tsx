import { StatCounter } from "@/components/hud/StatCounter";

const stats = [
  { target: 12, suffix: "+", label: "Institutions Onboarding" },
  { target: 25000, suffix: "+", label: "Students Impacted" },
  { target: 2, suffix: "", label: "Ecosystem Products Live" },
  { target: 6, suffix: "", label: "Years Building" },
];

export function StatsBar() {
  return (
    <div
      className="hidden md:block w-full"
      style={{ background: "var(--card-dark)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-[1180px] mx-auto px-5 md:px-8">
        <ul className="flex items-center justify-between gap-6 py-2.5">
          {stats.map((s) => (
            <li key={s.label} className="flex items-baseline gap-2">
              <span className="text-[13px] font-bold text-[var(--accent)]">
                <StatCounter target={s.target} suffix={s.suffix} duration={1400} />
              </span>
              <span className="text-[11px] tracking-[0.14em] uppercase text-white/55">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
