import { useEffect, useRef } from "react";

/**
 * HeroFX — Light-theme VFX layer for the hero with mouse/touch parallax.
 *
 * Layered transforms:
 *   • Outer wrapper (ref) handles pointer parallax via translate3d
 *   • Inner element keeps its CSS keyframe drift/rotate animation
 * This avoids the conflict where a single element's `transform` is owned
 * by both an animation and inline JS.
 */
export function HeroFX() {
  const rootRef = useRef<HTMLDivElement>(null);
  const blobAWrap = useRef<HTMLDivElement>(null);
  const blobBWrap = useRef<HTMLDivElement>(null);
  const blobCWrap = useRef<HTMLDivElement>(null);
  const shimmerWrap = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const section = root.parentElement;
    if (!section) return;

    const updateFromPoint = (clientX: number, clientY: number) => {
      const rect = section.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;
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
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      const x = current.current.x;
      const y = current.current.y;

      if (blobAWrap.current)
        blobAWrap.current.style.transform = `translate3d(${x * 40}px, ${y * 30}px, 0)`;
      if (blobBWrap.current)
        blobBWrap.current.style.transform = `translate3d(${x * -55}px, ${y * -40}px, 0)`;
      if (blobCWrap.current)
        blobCWrap.current.style.transform = `translate3d(${x * 25}px, ${y * -20}px, 0)`;
      if (gridRef.current)
        gridRef.current.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0)`;
      if (shimmerWrap.current)
        shimmerWrap.current.style.transform = `translate3d(${x * -18}px, ${y * -12}px, 0)`;

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
      {/* Dotted grid (parallax via JS) */}
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(124,144,255,0.16) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, #000 35%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, #000 35%, transparent 75%)",
          willChange: "transform",
          transition: "transform 120ms linear",
        }}
      />

      {/* Subtle depth glow — outer wrap = parallax, inner = drift animation */}
      <div
        ref={blobAWrap}
        className="absolute"
        style={{
          left: "-8%",
          top: "10%",
          width: 520,
          height: 520,
          willChange: "transform",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
               "radial-gradient(circle, rgba(79,107,255,0.16) 0%, rgba(79,107,255,0) 65%)",
            filter: "blur(20px)",
            animation: "blob-drift-a 18s ease-in-out infinite",
            willChange: "transform",
          }}
        />
      </div>

      {/* Blob 2 */}
      <div
        ref={blobBWrap}
        className="absolute"
        style={{
          right: "-10%",
          top: "30%",
          width: 600,
          height: 600,
          willChange: "transform",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
               "radial-gradient(circle, rgba(45,212,191,0.10) 0%, rgba(45,212,191,0) 65%)",
            filter: "blur(24px)",
            animation: "blob-drift-b 22s ease-in-out infinite",
            willChange: "transform",
          }}
        />
      </div>

      {/* Blob 3 */}
      <div
        ref={blobCWrap}
        className="absolute"
        style={{
          left: "45%",
          top: "55%",
          width: 380,
          height: 380,
          willChange: "transform",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
               "radial-gradient(circle, rgba(79,107,255,0.10) 0%, rgba(79,107,255,0) 65%)",
            filter: "blur(18px)",
            animation: "blob-drift-c 26s ease-in-out infinite",
            willChange: "transform",
          }}
        />
      </div>

      {/* Conic shimmer — outer wrap parallax, inner rotates */}
      <div
        ref={shimmerWrap}
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: 1200,
          height: 1200,
          marginLeft: -600,
          marginTop: -600,
          willChange: "transform",
        }}
      >
        <div
          className="w-full h-full"
          style={{
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
    </div>
  );
}
