import { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  value: number; // 0-100
  label: string;
  display?: string; // e.g. "82%", "4/4", "ZERO"
  empty?: boolean;
  emptyColor?: string;
  className?: string;
}

export function ProgressBar({
  value,
  label,
  display,
  empty = false,
  emptyColor = "#16A34A",
  className = "",
}: ProgressBarProps) {
  const [filled, setFilled] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setFilled(empty ? 0 : value), 100);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, empty]);

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <div className="flex items-baseline justify-between mb-[6px]">
        <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--text-secondary)] uppercase">
          {label}
        </span>
        <span
          className="font-mono text-[9px] tracking-[0.15em]"
          style={{ color: empty ? emptyColor : "#F97316" }}
        >
          {display ?? `${value}%`}
        </span>
      </div>
      <div
        className="h-[3px] w-full rounded-[1px] overflow-hidden"
        style={{ background: "rgba(249,115,22,0.10)" }}
      >
        <div
          className="h-full rounded-[1px]"
          style={{
            width: `${filled}%`,
            background: empty ? "transparent" : "linear-gradient(90deg, #F97316, #FB923C)",
            transition: "width 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: empty ? "none" : "0 0 8px rgba(249,115,22,0.5)",
            animation: filled > 0 && !empty ? "neon-pulse 3s ease-in-out infinite" : "none",
          }}
        />
      </div>
    </div>
  );
}
