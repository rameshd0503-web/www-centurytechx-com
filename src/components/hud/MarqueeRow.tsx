import { ReactNode } from "react";

interface MarqueeRowProps {
  children: ReactNode[];
  direction?: "left" | "right";
  speed?: number; // seconds per loop
  className?: string;
}

export function MarqueeRow({ children, direction = "left", speed = 30, className = "" }: MarqueeRowProps) {
  const animation = direction === "left" ? "marquee-left" : "marquee-right";
  return (
    <div className={`group relative w-full overflow-hidden marquee-mask ${className}`}>
      <div
        className="flex w-max gap-2 group-hover:[animation-play-state:paused]"
        style={{ animation: `${animation} ${speed}s linear infinite` }}
      >
        {children.map((c, i) => (
          <div key={`a-${i}`}>{c}</div>
        ))}
        {children.map((c, i) => (
          <div key={`b-${i}`} aria-hidden>{c}</div>
        ))}
      </div>
    </div>
  );
}
