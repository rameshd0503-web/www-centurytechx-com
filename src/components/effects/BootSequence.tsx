import { useEffect, useState } from "react";

const BOOT_KEY = "ctx_boot_seen_v1";

export function BootSequence() {
  const [stage, setStage] = useState<"hidden" | "init" | "loading" | "ready" | "fading">("hidden");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(BOOT_KEY)) return;

    setStage("init");
    const t1 = window.setTimeout(() => setStage("loading"), 400);
    const t2 = window.setTimeout(() => setStage("ready"), 900);
    const t3 = window.setTimeout(() => setStage("fading"), 1400);
    const t4 = window.setTimeout(() => {
      setStage("hidden");
      sessionStorage.setItem(BOOT_KEY, "1");
    }, 1800);

    // Lock scroll briefly
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      [t1, t2, t3, t4].forEach((t) => window.clearTimeout(t));
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (stage === "hidden") {
      document.body.style.overflow = "";
    }
  }, [stage]);

  if (stage === "hidden") return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{
        zIndex: 99999,
        background: "#000",
        opacity: stage === "fading" ? 0 : 1,
        transition: "opacity 400ms ease-out",
      }}
    >
      <div className="w-[min(420px,80vw)] flex flex-col items-center gap-4">
        {/* Phase 1 — init text */}
        <div className="font-mono text-[14px] text-[var(--neon)] text-center leading-[1.7]">
          <div>CENTURY TECHX OS v2.0.4</div>
          <div className="opacity-80">
            INITIALIZING
            <span style={{ animation: "blink 0.6s steps(2) infinite" }}>...</span>
          </div>
        </div>

        {/* Phase 2 — progress bar */}
        {(stage === "loading" || stage === "ready" || stage === "fading") && (
          <div className="w-full mt-2">
            <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-secondary)] mb-2 text-left">
              LOADING SYSTEMS...
            </div>
            <div
              className="w-full h-[3px] rounded-[1px] overflow-hidden"
              style={{ background: "rgba(37,99,235,0.15)" }}
            >
              <div
                className="h-full"
                style={{
                  background: "#2563EB",
                  boxShadow: "0 0 10px rgba(37,99,235,0.8)",
                  width: stage === "loading" ? "0%" : "100%",
                  animation: stage === "loading" ? "boot-progress-fill 500ms linear forwards" : undefined,
                }}
              />
            </div>
          </div>
        )}

        {/* Phase 3 — operational flash */}
        {(stage === "ready" || stage === "fading") && (
          <div
            className="font-mono text-[13px] tracking-[0.18em] mt-2"
            style={{
              color: "#00FF88",
              textShadow: "0 0 10px rgba(0,255,136,0.6)",
              animation: "boot-flash 0.16s steps(2) 3",
            }}
          >
            ALL SYSTEMS OPERATIONAL //
          </div>
        )}
      </div>
    </div>
  );
}
