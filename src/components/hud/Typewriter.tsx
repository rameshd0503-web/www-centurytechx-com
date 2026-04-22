import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  cursor?: boolean;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({
  text,
  speed = 35,
  startDelay = 0,
  cursor = true,
  className = "",
  onComplete,
}: TypewriterProps) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setOut("");
    setDone(false);
    let i = 0;
    let interval: number;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(interval);
          setDone(true);
          onComplete?.();
        }
      }, speed);
    }, startDelay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [text, speed, startDelay, onComplete]);

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setShowCursor(false), 2000);
    return () => window.clearTimeout(t);
  }, [done]);

  return (
    <span className={className}>
      {out}
      {cursor && showCursor && (
        <span
          className="inline-block ml-[1px] text-[var(--neon)]"
          style={{ animation: "blink 1s steps(2) infinite" }}
        >
          ▌
        </span>
      )}
    </span>
  );
}
