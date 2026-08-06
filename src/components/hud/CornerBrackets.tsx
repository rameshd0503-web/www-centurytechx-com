import { CSSProperties } from "react";

interface CornerBracketsProps {
  size?: number;
  color?: string;
  thickness?: number;
  inset?: number;
  className?: string;
}

export function CornerBrackets({
  size = 14,
  color = "#F97316",
  thickness = 2,
  inset = 0,
  className = "",
}: CornerBracketsProps) {
  const base: CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    borderColor: color,
    borderStyle: "solid",
    borderWidth: 0,
    pointerEvents: "none",
    transition: "all 0.3s ease",
  };
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <span style={{ ...base, top: inset, left: inset, borderTopWidth: thickness, borderLeftWidth: thickness }} />
      <span style={{ ...base, top: inset, right: inset, borderTopWidth: thickness, borderRightWidth: thickness }} />
      <span style={{ ...base, bottom: inset, left: inset, borderBottomWidth: thickness, borderLeftWidth: thickness }} />
      <span style={{ ...base, bottom: inset, right: inset, borderBottomWidth: thickness, borderRightWidth: thickness }} />
    </div>
  );
}
