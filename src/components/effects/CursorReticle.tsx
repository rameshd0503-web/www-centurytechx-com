import { useEffect, useRef, useState } from "react";

export function CursorReticle() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const target = useRef({ x: -100, y: -100 });
  const reticle = useRef({ x: -100, y: -100 });
  const glow = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      const el = e.target as HTMLElement;
      const interactive = !!el.closest("a, button, input, textarea, [role='button'], [data-cursor='hover']");
      setHovering(interactive);
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    let raf = 0;
    const loop = () => {
      // reticle: 60ms lag (fast lerp)
      reticle.current.x += (target.current.x - reticle.current.x) * 0.35;
      reticle.current.y += (target.current.y - reticle.current.y) * 0.35;
      // glow: slow follow
      glow.current.x += (target.current.x - glow.current.x) * 0.06;
      glow.current.y += (target.current.y - glow.current.y) * 0.06;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${reticle.current.x}px, ${reticle.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${reticle.current.x}px, ${reticle.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glow.current.x}px, ${glow.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  const size = hovering ? 44 : 28;

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 60%)",
          zIndex: 1,
          willChange: "transform",
        }}
      />
      <div
        ref={outerRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none rounded-full transition-[width,height,background] duration-150 ease-out"
        style={{
          width: size,
          height: size,
          border: "1px solid #F97316",
          background: hovering ? "rgba(249,115,22,0.08)" : "transparent",
          zIndex: 10000,
          willChange: "transform",
          mixBlendMode: "normal",
        }}
      />
      <div
        ref={innerRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          width: clicking ? 2 : 4,
          height: clicking ? 2 : 4,
          background: "#F97316",
          boxShadow: "0 0 6px #F97316",
          zIndex: 10001,
          willChange: "transform",
          animation: hovering ? "blink-slow 0.8s ease-in-out infinite" : "none",
        }}
      />
    </>
  );
}
