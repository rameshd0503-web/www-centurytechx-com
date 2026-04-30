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
  accent = "#2563EB",
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
      className={`relative bg-[var(--bg-elevated)] border border-[var(--border-dark)] rounded-[4px] overflow-hidden group transition-all duration-300 ${
        hoverable ? "hover:-translate-y-[6px] hover:border-[color:var(--border-bright)]" : ""
      } ${className}`}
      style={{
        boxShadow: hoverable
          ? undefined
          : `0 0 40px rgba(37,99,235,0.06), inset 0 0 40px rgba(37,99,235,0.02)`,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!hoverable) return;
        e.currentTarget.style.boxShadow = `0 0 0 1px rgba(37,99,235,0.25), 0 16px 48px rgba(37,99,235,0.12), 0 0 80px rgba(37,99,235,0.06)`;
      }}
      onMouseLeave={(e) => {
        if (!hoverable) return;
        e.currentTarget.style.boxShadow = "";
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
