import { useEffect, useRef } from "react";

export function CircuitBackground() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const nodes = svg.querySelectorAll<SVGCircleElement>("circle.node");
    nodes.forEach((n) => {
      const dur = 2 + Math.random() * 2;
      const delay = Math.random() * 3;
      n.style.animation = `node-pulse ${dur}s ease-in-out ${delay}s infinite`;
    });
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <svg ref={ref} className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ctx-circuit" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(245,166,35,0.035)" strokeWidth="1" />
            <circle className="node" cx="0" cy="0" r="3" fill="rgba(245,166,35,0.06)" />
            <circle className="node" cx="64" cy="0" r="3" fill="rgba(245,166,35,0.06)" />
            <circle className="node" cx="0" cy="64" r="3" fill="rgba(245,166,35,0.06)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ctx-circuit)" />
      </svg>
    </div>
  );
}
