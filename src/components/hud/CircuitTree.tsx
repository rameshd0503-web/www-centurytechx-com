import { useEffect, useRef } from "react";

export function CircuitTree() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const dots = svg.querySelectorAll<SVGCircleElement>("circle.pulse-node");
    dots.forEach((d, i) => {
      d.style.animation = `neon-pulse ${1.5 + (i % 3) * 0.5}s ease-in-out ${i * 0.2}s infinite`;
    });
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 180"
      className="w-full"
      style={{ height: 180, filter: "drop-shadow(0 0 6px rgba(245,166,35,0.4))" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="branch-grad" x1="0" x2="1">
          <stop offset="0" stopColor="#F5A623" stopOpacity="0.3" />
          <stop offset="0.5" stopColor="#F5A623" stopOpacity="0.7" />
          <stop offset="1" stopColor="#F5A623" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Main vertical trunk */}
      <line x1="160" y1="160" x2="160" y2="90" stroke="#F5A623" strokeOpacity="0.6" strokeWidth="1.5" />
      {/* Horizontal split */}
      <line x1="60" y1="90" x2="260" y2="90" stroke="#F5A623" strokeOpacity="0.6" strokeWidth="1.5" />
      {/* Branches up */}
      <line x1="60" y1="90" x2="60" y2="50" stroke="#F5A623" strokeOpacity="0.6" strokeWidth="1.5" />
      <line x1="160" y1="90" x2="160" y2="30" stroke="#F5A623" strokeOpacity="0.6" strokeWidth="1.5" />
      <line x1="260" y1="90" x2="260" y2="50" stroke="#F5A623" strokeOpacity="0.6" strokeWidth="1.5" />
      {/* Sub branches */}
      <line x1="40" y1="50" x2="80" y2="50" stroke="#F5A623" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="40" y1="50" x2="40" y2="25" stroke="#F5A623" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="80" y1="50" x2="80" y2="25" stroke="#F5A623" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="240" y1="50" x2="280" y2="50" stroke="#F5A623" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="240" y1="50" x2="240" y2="25" stroke="#F5A623" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="280" y1="50" x2="280" y2="25" stroke="#F5A623" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="140" y1="30" x2="180" y2="30" stroke="#F5A623" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="140" y1="30" x2="140" y2="10" stroke="#F5A623" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="180" y1="30" x2="180" y2="10" stroke="#F5A623" strokeOpacity="0.5" strokeWidth="1" />

      {/* Nodes */}
      {[
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
      ].map(([cx, cy, r], i) => (
        <circle
          key={i}
          className="pulse-node"
          cx={cx}
          cy={cy}
          r={r}
          fill="#F5A623"
        />
      ))}

      {/* Traveling data dots along trunk */}
      <circle r="3" fill="#FFB830" style={{ filter: "drop-shadow(0 0 4px #F5A623)" }}>
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 160 160 L 160 90 L 60 90 L 60 50" />
      </circle>
      <circle r="3" fill="#FFB830" style={{ filter: "drop-shadow(0 0 4px #F5A623)" }}>
        <animateMotion dur="2.5s" begin="0.8s" repeatCount="indefinite" path="M 160 160 L 160 90 L 260 90 L 260 50" />
      </circle>
      <circle r="3" fill="#FFB830" style={{ filter: "drop-shadow(0 0 4px #F5A623)" }}>
        <animateMotion dur="2.5s" begin="1.6s" repeatCount="indefinite" path="M 160 160 L 160 30" />
      </circle>
    </svg>
  );
}
