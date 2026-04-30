import { useEffect, useRef } from "react";

/**
 * HeroFX — Light-theme VFX layer for the hero:
 *   • Two soft, slowly drifting blue/navy gradient blobs (parallax)
 *   • Subtle dotted grid (subtle parallax)
 *   • A faint conic shimmer (counter-parallax)
 * Pure CSS animations + rAF-driven pointer parallax. Pointer-events: none.
 */
export function HeroFX() {
  const rootRef = useRef<HTMLDivElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);
  const blobCRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Smoothed pointer offset in [-1, 1]
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const section = root.parentElement; // the <section id="top">
    if (!section) return;

    const updateFromPoint = (clientX: number, clientY: number) => {
      const rect = section.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width;   // 0..1
      const py = (clientY - rect.top) / rect.height;   // 0..1
      target.current.x = Math.max(-1, Math.min(1, (px - 0.5) * 2));
      target.current.y = Math.max(-1, Math.min(1, (py - 0.5) * 2));
    };

    const onMove = (e: PointerEvent) => updateFromPoint(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) updateFromPoint(t.clientX, t.clientY);
    };
    const onLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("touchmove", onTouch, { passive: true });
    section.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const tick = () => {
      // ease toward target
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      const x = current.current.x;
      const y = current.current.y;

      // Different magnitudes per layer => depth
      if (blobARef.current) {
        blobARef.current.style.transform = `translate3d(${x * 40}px, ${y * 30}px, 0)`;
      }
      if (blobBRef.current) {
        blobBRef.current.style.transform = `translate3d(${x * -55}px, ${y * -40}px, 0)`;
      }
      if (blobCRef.current) {
        blobCRef.current.style.transform = `translate3d(${x * 25}px, ${y * -20}px, 0)`;
      }
      if (gridRef.current) {
        // tiny shift so grid feels anchored deep
        gridRef.current.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0)`;
      }
      if (shimmerRef.current) {
        // counter-parallax + slight tilt
        shimmerRef.current.style.transform = `translate3d(${x * -18}px, ${y * -12}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("touchmove", onTouch);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Dotted grid */}
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(30,58,95,0.10) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, #000 35%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, #000 35%, transparent 75%)",
          willChange: "transform",
          transition: "transform 120ms linear",
        }}
      />

      {/* Blob 1 — vibrant blue */}
      <div
        ref={blobARef}
        className="absolute rounded-full"
        style={{
          width: 520,
          height: 520,
          left: "-8%",
          top: "10%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.28) 0%, rgba(37,99,235,0) 65%)",
          filter: "blur(20px)",
          animation: "blob-drift-a 18s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Blob 2 — navy */}
      <div
        ref={blobBRef}
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          right: "-10%",
          top: "30%",
          background:
            "radial-gradient(circle, rgba(30,58,95,0.22) 0%, rgba(30,58,95,0) 65%)",
          filter: "blur(24px)",
          animation: "blob-drift-b 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Blob 3 — sky accent */}
      <div
        ref={blobCRef}
        className="absolute rounded-full"
        style={{
          width: 380,
          height: 380,
          left: "45%",
          top: "55%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0) 65%)",
          filter: "blur(18px)",
          animation: "blob-drift-c 26s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Conic shimmer line */}
      <div
        ref={shimmerRef}
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: 1200,
          height: 1200,
          marginLeft: -600,
          marginTop: -600,
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(37,99,235,0.08) 25deg, transparent 50deg, transparent 360deg)",
          animation: "shimmer-rotate 28s linear infinite",
          opacity: 0.6,
          maskImage:
            "radial-gradient(circle, transparent 35%, #000 55%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 35%, #000 55%, transparent 75%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
