import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logoUrl from "@/assets/ctx-logo.jpeg";

export const Route = createFileRoute("/qa/focus")({
  head: () => ({
    meta: [
      { title: "QA · Focus States — Century TechX" },
      { name: "description", content: "Visual regression page for keyboard focus-visible outlines on logo links." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: FocusQAPage,
});

type Variant = {
  id: string;
  label: string;
  size: number;
  context: "navigation" | "footer" | "compact";
};

const VARIANTS: Variant[] = [
  { id: "nav-50", label: "Navigation logo (50px)", size: 50, context: "navigation" },
  { id: "footer-80", label: "Footer logo (80px)", size: 80, context: "footer" },
  { id: "compact-32", label: "Compact logo (32px)", size: 32, context: "compact" },
];

function LogoLink({ variant, refEl }: { variant: Variant; refEl: (el: HTMLAnchorElement | null) => void }) {
  return (
    <a
      ref={refEl}
      href="#top"
      onClick={(e) => e.preventDefault()}
      aria-label={`Century TechX LLP — ${variant.label}`}
      className="ctx-focus-ring inline-flex items-center justify-center rounded-full"
    >
      <span
        className="relative inline-flex items-center justify-center rounded-full overflow-hidden"
        style={{
          width: variant.size,
          height: variant.size,
          background: "#FFFFFF",
          border: "1px solid rgba(37,99,235,0.45)",
          boxShadow: "0 0 14px rgba(37,99,235,0.35)",
        }}
      >
        <img src={logoUrl} alt="Century TechX LLP logo" className="block w-full h-full object-cover" style={{ transform: "scale(1.05)" }} />
      </span>
    </a>
  );
}

function FocusQAPage() {
  const refs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [activeId, setActiveId] = useState<string>(VARIANTS[0].id);
  const [autoCycle, setAutoCycle] = useState(true);
  const [intervalMs] = useState(1500);

  // Apply programmatic focus to simulate keyboard focus-visible.
  // Browsers treat focus() with focusVisible: true as keyboard-equivalent.
  useEffect(() => {
    const el = refs.current[activeId];
    if (!el) return;
    try {
      (el as HTMLElement & { focus: (opts?: FocusOptions & { focusVisible?: boolean }) => void }).focus({
        preventScroll: true,
        focusVisible: true,
      });
    } catch {
      el.focus({ preventScroll: true });
    }
  }, [activeId]);

  // Auto-cycle through variants
  useEffect(() => {
    if (!autoCycle) return;
    const t = window.setInterval(() => {
      setActiveId((prev) => {
        const idx = VARIANTS.findIndex((v) => v.id === prev);
        return VARIANTS[(idx + 1) % VARIANTS.length].id;
      });
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [autoCycle, intervalMs]);

  return (
    <main className="min-h-screen px-6 py-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1100px] mx-auto">
        <header className="mb-10">
          <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--neon)] mb-3">// QA · VISUAL REGRESSION</p>
          <h1 className="font-orbitron font-black text-3xl md:text-4xl text-[var(--text-primary)] tracking-tight mb-3">
            Logo Focus-Visible States
          </h1>
          <p className="font-mono text-[12px] text-[var(--text-secondary)] max-w-[640px] leading-relaxed">
            Auto-cycles keyboard focus through every logo variant so any drift in the neon focus ring,
            offset, or glow is visually obvious. Tab manually to verify real keyboard parity.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setAutoCycle((v) => !v)}
              className="ctx-focus-ring font-mono text-[11px] tracking-[0.15em] px-4 py-2 rounded-[3px]"
              style={{
                background: autoCycle ? "var(--neon)" : "transparent",
                color: autoCycle ? "#000" : "var(--neon)",
                border: "1px solid var(--neon)",
              }}
            >
              {autoCycle ? "■ PAUSE CYCLE" : "▶ RESUME CYCLE"}
            </button>
            <Link
              to="/"
              className="ctx-focus-ring font-mono text-[11px] tracking-[0.15em] px-4 py-2 rounded-[3px] text-[var(--text-secondary)]"
              style={{ border: "1px solid var(--border-mid)" }}
            >
              ← BACK TO SITE
            </Link>
          </div>
        </header>

        {/* Cycle grid */}
        <section
          className="grid gap-6 md:grid-cols-3 p-8 rounded-[6px]"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-mid)",
          }}
        >
          {VARIANTS.map((v) => {
            const isActive = v.id === activeId;
            return (
              <div key={v.id} className="flex flex-col items-center gap-5 py-8">
                <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-dim)]">
                  {v.context.toUpperCase()}
                </div>

                <div
                  className="flex items-center justify-center p-6 rounded-[6px] transition-colors"
                  style={{
                    background: isActive ? "rgba(37,99,235,0.04)" : "transparent",
                    border: `1px dashed ${isActive ? "rgba(37,99,235,0.4)" : "rgba(37,99,235,0.12)"}`,
                    minHeight: 140,
                    minWidth: 140,
                  }}
                  onClick={() => {
                    setAutoCycle(false);
                    setActiveId(v.id);
                  }}
                >
                  <LogoLink
                    variant={v}
                    refEl={(el) => {
                      refs.current[v.id] = el;
                    }}
                  />
                </div>

                <div className="text-center">
                  <div className="font-rajdhani font-semibold text-[14px] text-[var(--text-primary)]">{v.label}</div>
                  <div className="font-mono text-[10px] text-[var(--text-dim)] mt-1">
                    {isActive ? (
                      <span className="text-[var(--neon)]">● FOCUSED</span>
                    ) : (
                      <span>○ IDLE</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Acceptance checklist */}
        <section
          className="mt-8 p-6 rounded-[6px]"
          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-mid)" }}
        >
          <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--neon)] mb-4">// ACCEPTANCE CRITERIA</div>
          <ul className="space-y-2 font-mono text-[12px] text-[var(--text-secondary)]">
            <li>✓ Outline is solid 2px in <span className="text-[var(--neon)]">--neon (#2563EB)</span></li>
            <li>✓ Outline-offset is 4px (logo container fully visible inside the ring)</li>
            <li>✓ Layered glow (12px + 24px) wraps the ring without clipping the circle</li>
            <li>✓ Ring is fully circular — no square corners around the round logo</li>
            <li>✓ Mouse click does NOT trigger the ring (focus-visible only)</li>
            <li>✓ Tab key navigation triggers the ring on every variant</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
