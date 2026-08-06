import { ReactNode, CSSProperties } from "react";
import { CornerBrackets } from "./CornerBrackets";

interface HUDCardProps {
  accent?: string;
  children: ReactNode;
  className?: string;
  topBar?: number; // px height for top accent bar
  leftBar?: number; // px width for left accent bar
  bracketSize?: number;
  hoverable?: boolean;
  style?: CSSProperties;
}

export function HUDCard({
  accent = "#F97316",
  children,
  className = "",
  topBar = 0,
  leftBar = 0,
  bracketSize = 14,
  hoverable = true,
  style,
}: HUDCardProps) {
  return (
    <div
      className={`relative bg-[var(--bg-elevated)] border border-[var(--border-dark)] rounded-[12px] overflow-hidden group transition-all duration-300 ${
        hoverable ? "hover:-translate-y-[6px] hover:border-[color:var(--border-bright)]" : ""
      } ${className}`}
      style={{
        boxShadow: "var(--shadow-card)",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!hoverable) return;
        e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
      }}
      onMouseLeave={(e) => {
        if (!hoverable) return;
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
      }}
    >
      {topBar > 0 && (
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: topBar, background: accent, boxShadow: `0 0 20px ${accent}80` }}
        />
      )}
      {leftBar > 0 && (
        <div
          className="absolute top-0 bottom-0 left-0"
          style={{ width: leftBar, background: accent, boxShadow: `0 0 20px ${accent}80` }}
        />
      )}
      <CornerBrackets size={bracketSize} color={accent} />
      {children}
    </div>
  );
}
