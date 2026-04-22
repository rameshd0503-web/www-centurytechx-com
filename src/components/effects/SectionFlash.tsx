import { useEffect, useRef, useState, ReactNode } from "react";

interface SectionFlashProps {
  children: ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Wraps a section and fires a single 0.4s orange scan-line sweep
 * the first time the section enters the viewport.
 */
export function SectionFlash({ children, id, className, style }: SectionFlashProps) {
  const ref = useRef<HTMLElement>(null);
  const [flash, setFlash] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || fired.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          setFlash(true);
          window.setTimeout(() => setFlash(false), 500);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className={className} style={{ position: "relative", ...style }}>
      {flash && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 5 }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: "rgba(245,166,35,0.6)",
              boxShadow: "0 0 12px rgba(245,166,35,0.7)",
              animation: "section-flash-sweep 0.4s linear forwards",
            }}
          />
        </div>
      )}
      {children}
    </section>
  );
}
