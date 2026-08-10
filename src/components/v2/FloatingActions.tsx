import { useEffect, useState } from "react";
import { ArrowUp, CalendarClock } from "lucide-react";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#contact"
        className="fx-idle-bounce fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-[13.5px] font-semibold text-white transition-transform duration-200 active:scale-95"
        style={{ background: "var(--accent)", boxShadow: "0 12px 30px rgba(232,148,15,0.38)" }}
      >
        <CalendarClock size={17} />
        Book a Demo
      </a>

      <button
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 left-6 z-40 grid place-items-center w-11 h-11 rounded-full transition-all duration-300 active:scale-95"
        style={{
          background: "#FFFFFF",
          border: "1px solid var(--border-mid)",
          boxShadow: "var(--shadow-card)",
          color: "var(--text-primary)",
          opacity: showTop ? 1 : 0,
          pointerEvents: showTop ? "auto" : "none",
          transform: showTop ? "translateY(0)" : "translateY(10px)",
        }}
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}
