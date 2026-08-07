import { useEffect, useRef, useState } from "react";

const LINES: Array<[number, number, number, number, number]> = [
  // x1, y1, x2, y2, strokeWidth
  [160, 160, 160, 90, 1.5],
  [60, 90, 260, 90, 1.5],
  [60, 90, 60, 50, 1.5],
  [160, 90, 160, 30, 1.5],
  [260, 90, 260, 50, 1.5],
  [40, 50, 80, 50, 1],
  [40, 50, 40, 25, 1],
  [80, 50, 80, 25, 1],
  [240, 50, 280, 50, 1],
  [240, 50, 240, 25, 1],
  [280, 50, 280, 25, 1],
  [140, 30, 180, 30, 1],
  [140, 30, 140, 10, 1],
  [180, 30, 180, 10, 1],
];

const NODES: Array<[number, number, number]> = [
  [160, 160, 4],
  [160, 90, 3.5],
  [60, 90, 3],
  [260, 90, 3],
  [60, 50, 2.5],
  [260, 50, 2.5],
  [160, 30, 2.5],
  [40, 25, 2],
  [80, 25, 2],
  [240, 25, 2],
  [280, 25, 2],
  [140, 10, 2],
  [180, 10, 2],
];

const DRAW_STEP = 0.09; // seconds between each line
const NODE_START = LINES.length * DRAW_STEP + 0.2;

export function CircuitTree() {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  // Once the circuit has "powered on", let the nodes pulse gently.
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDrawn(true);
      return;
    }
    const t = window.setTimeout(() => setDrawn(true), (NODE_START + NODES.length * 0.05 + 0.4) * 1000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 180"
      className="w-full"
      style={{ height: 180, filter: "drop-shadow(0 0 6px rgba(249,115,22,0.4))" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="branch-grad" x1="0" x2="1">
          <stop offset="0" stopColor="#F97316" stopOpacity="0.3" />
          <stop offset="0.5" stopColor="#F97316" stopOpacity="0.7" />
          <stop offset="1" stopColor="#F97316" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Circuit lines — drawn in sequence like a board powering on */}
      {LINES.map(([x1, y1, x2, y2, w], i) => {
        const len = Math.hypot(x2 - x1, y2 - y1);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#F97316"
            strokeOpacity={w > 1 ? 0.6 : 0.5}
            strokeWidth={w}
            className="fx-draw-line"
            style={
              {
                "--dash": len,
                "--draw-delay": `${i * DRAW_STEP}s`,
              } as React.CSSProperties
            }
          />
        );
      })}

      {/* Nodes — pop in after their branch is drawn, then pulse gently */}
      {NODES.map(([cx, cy, r], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="#F97316"
          className="fx-node-in"
          style={
            {
              "--node-delay": `${NODE_START + i * 0.05}s`,
              animation: drawn
                ? `neon-pulse ${1.5 + (i % 3) * 0.5}s ease-in-out ${i * 0.2}s infinite`
                : undefined,
              opacity: drawn ? 1 : undefined,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Traveling data dots along trunk */}
      {drawn && (
        <>
          <circle r="3" fill="#FB923C" style={{ filter: "drop-shadow(0 0 4px #F97316)" }}>
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 160 160 L 160 90 L 60 90 L 60 50" />
          </circle>
          <circle r="3" fill="#FB923C" style={{ filter: "drop-shadow(0 0 4px #F97316)" }}>
            <animateMotion dur="2.5s" begin="0.8s" repeatCount="indefinite" path="M 160 160 L 160 90 L 260 90 L 260 50" />
          </circle>
        </>
      )}
    </svg>
  );
}
