import { useEffect, useState, CSSProperties } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: "low" | "medium" | "high";
  as?: "span" | "h1" | "h2" | "h3" | "div";
  /** When true, glitch uses filter drop-shadow instead of text-shadow (works with background-clip:text) */
  useDropShadow?: boolean;
  style?: CSSProperties;
}

const GLITCH_CHARS = ["░", "▓", "█", "▒"];

export function GlitchText({ text, className = "", intensity = "medium", as: Tag = "span", useDropShadow = false, style }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  const [shift, setShift] = useState(0);

  useEffect(() => setDisplayText(text), [text]);

  useEffect(() => {
    const minDelay = intensity === "high" ? 2500 : intensity === "low" ? 6000 : 4000;
    const maxDelay = intensity === "high" ? 4000 : intensity === "low" ? 9000 : 6000;

    let timeout: number;
    const trigger = () => {
      setGlitching(true);
      // char swap
      if (text.length > 2) {
        const idx = Math.floor(Math.random() * text.length);
        const ch = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        setDisplayText(text.slice(0, idx) + ch + text.slice(idx + 1));
      }
      setShift(2);
      window.setTimeout(() => setShift(-2), 20);
      window.setTimeout(() => setShift(0), 40);
      window.setTimeout(() => {
        setGlitching(false);
        setDisplayText(text);
      }, 60);

      timeout = window.setTimeout(trigger, minDelay + Math.random() * (maxDelay - minDelay));
    };
    timeout = window.setTimeout(trigger, minDelay + Math.random() * (maxDelay - minDelay));
    return () => window.clearTimeout(timeout);
  }, [text, intensity]);

  return (
    <Tag
      className={className}
      style={{
        display: "inline-block",
        transform: `translateX(${shift}px)`,
        textShadow: glitching && !useDropShadow ? "3px 0 #FF2D55, -3px 0 #1E3A5F" : undefined,
        filter: glitching && useDropShadow
          ? "drop-shadow(3px 0 0 #FF2D55) drop-shadow(-3px 0 0 #1E3A5F)"
          : undefined,
        transition: "transform 20ms linear",
        ...style,
      }}
    >
      {displayText}
    </Tag>
  );
}
