import { motion } from "framer-motion";
import { GlitchText } from "@/components/hud/GlitchText";
import { Typewriter } from "@/components/hud/Typewriter";
import { CircuitTree } from "@/components/hud/CircuitTree";
import { ProgressBar } from "@/components/hud/ProgressBar";
import { StatCounter } from "@/components/hud/StatCounter";
import { CornerBrackets } from "@/components/hud/CornerBrackets";

const reveal = {
  initial: { opacity: 0, y: 40, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen pt-[110px] pb-20 px-5 md:px-8"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-15 lg:gap-[60px] items-center">
        {/* LEFT */}
        <div>
          {/* Status bar */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-[var(--text-dim)] mb-8"
          >
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-[6px] h-[6px] rounded-full"
                style={{ background: "#00FF88", boxShadow: "0 0 6px #00FF88", animation: "blink 1s steps(2) infinite" }}
              />
              SYS.ONLINE
            </span>
            <span className="text-[var(--border-mid)]">─────</span>
            <span>BUILD · LAUNCH · AUTOMATE</span>
            <span className="text-[var(--border-mid)]">─────</span>
            <span>TUMKUR, INDIA</span>
          </motion.div>

          {/* Eyebrow tag */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-[6px] rounded-[2px] mb-7"
            style={{
              border: "1px solid rgba(245,166,35,0.25)",
              background: "rgba(245,166,35,0.05)",
            }}
          >
            <span
              className="inline-block w-[6px] h-[6px] rounded-full"
              style={{ background: "#F5A623", boxShadow: "0 0 6px #F5A623" }}
            />
            <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--neon)]">
              // CTX-2024 · TECHNOLOGY COMPANY · INDIA
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...reveal}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-orbitron mb-7 flicker-on"
            style={{ lineHeight: 0.92, letterSpacing: "-0.04em" }}
          >
            {/* Line 1 */}
            <span
              className="block font-black"
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
              }}
            >
              <GlitchText text="WE BUILD" intensity="low" />
            </span>

            {/* Line 2 — gradient, same size, drop-shadow glow */}
            <span
              className="block font-black"
              style={{
                fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                filter: "drop-shadow(0 0 20px rgba(245,166,35,0.5))",
              }}
            >
              <GlitchText
                text="THE FUTURE."
                intensity="medium"
                useDropShadow
                className="gradient-text-anim"
                style={{
                  fontWeight: 900,
                }}
              />
            </span>

            {/* Line 3 — cyan accent */}
            <span
              className="block font-bold"
              style={{
                color: "#00D4E8",
                fontFamily: "var(--font-orbitron)",
                fontWeight: 700,
                fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
                letterSpacing: "0.15em",
                textShadow: "0 0 20px rgba(0,212,232,0.5)",
                marginTop: 12,
              }}
            >
              <GlitchText text="EMPOWERING GROWTH" intensity="low" />
            </span>
          </motion.h1>

          {/* Typed sub */}
          <motion.p
            {...reveal}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-inter font-light text-[17px] leading-[1.8] text-[var(--text-secondary)] max-w-[520px] mb-10"
          >
            <Typewriter
              text="India's next-generation technology company — building AI automation, EdTech platforms, and SaaS products that power real businesses forward."
              speed={28}
              startDelay={800}
            />
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 font-orbitron font-bold text-[12px] tracking-[0.12em] text-black px-8 py-4 rounded-[3px] transition-all duration-200"
              style={{ background: "#F5A623" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FFB830";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(245,166,35,0.5)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F5A623";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              ENGAGE MISSION
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#products"
              className="inline-flex items-center font-orbitron font-bold text-[12px] tracking-[0.12em] text-[var(--neon)] px-8 py-4 rounded-[3px] transition-all duration-200"
              style={{
                background: "transparent",
                border: "1px solid rgba(245,166,35,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(245,166,35,0.08)";
                e.currentTarget.style.borderColor = "#F5A623";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(245,166,35,0.35)";
              }}
            >
              VIEW INTEL //
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="relative mt-14 grid grid-cols-2 md:grid-cols-4 rounded-[4px] overflow-hidden"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-dark)",
            }}
          >
            {[
              { val: <StatCounter target={4} suffix="+" />, label: "ACTIVE PRODUCTS" },
              { val: <StatCounter target={3} />, label: "DIVISIONS" },
              { val: <StatCounter target={100} suffix="%" />, label: "IP OWNERSHIP" },
              { val: <StatCounter target={0} literal="∞" />, label: "GROWTH POTENTIAL" },
            ].map((s, i) => (
              <div
                key={i}
                className="relative px-6 py-6 md:px-8"
                style={{
                  borderRight: i < 3 ? "1px solid rgba(245,166,35,0.15)" : "none",
                }}
              >
                <div className="font-orbitron font-black text-[var(--neon)]" style={{ fontSize: "2.4rem", lineHeight: 1 }}>
                  {s.val}
                </div>
                <div className="mt-2 font-mono text-[9px] tracking-[0.2em] text-[var(--text-dim)]">
                  {s.label}
                </div>
              </div>
            ))}
            <CornerBrackets size={10} color="#F5A623" />
          </motion.div>
        </div>

        {/* RIGHT — HUD */}
        <motion.div
          initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[4px] p-8"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid rgba(245,166,35,0.20)",
            boxShadow: "0 0 40px rgba(245,166,35,0.06), inset 0 0 40px rgba(245,166,35,0.02)",
          }}
        >
          <CornerBrackets size={16} color="#F5A623" />

          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-[var(--border-dark)]">
            <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--neon)]">// CTX SYSTEM STATUS</span>
            <span className="font-mono text-[10px] text-[var(--text-dim)]">v2.0.4</span>
          </div>

          {/* Circuit tree */}
          <div className="my-4">
            <CircuitTree />
          </div>

          {/* Metrics */}
          <div className="space-y-3 mt-4">
            <ProgressBar value={82} label="CPU LOAD" />
            <ProgressBar value={100} label="ACTIVE MODULES" display="4/4" />
            <ProgressBar value={71} label="AI WORKFLOWS" />
            <ProgressBar value={99.9} label="UPTIME" display="99.9%" />
            <ProgressBar value={0} label="THREAT LEVEL" display="ZERO" empty />
          </div>

          {/* Status footer */}
          <div className="mt-6 pt-4 border-t border-[var(--border-dark)] flex items-center gap-2">
            <span
              className="inline-block w-[6px] h-3 bg-[var(--neon)]"
              style={{ animation: "blink 1.2s steps(2) infinite", boxShadow: "0 0 8px #F5A623" }}
            />
            <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--neon)]">
              ALL SYSTEMS OPERATIONAL //
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
