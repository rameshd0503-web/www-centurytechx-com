import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[150px] pb-24 px-5 md:px-8">
      {/* subtle grid + glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(79,107,255,0.22), transparent 65%)", filter: "blur(40px)" }}
      />

      <div className="relative max-w-[1000px] mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12.5px] text-[var(--text-secondary)]"
          style={{ border: "1px solid var(--border-mid)", background: "var(--accent-soft)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--teal)" }} />
          India's education technology ecosystem · Building for 50,000+ institutions by 2032
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-7 font-semibold tracking-[-0.035em]"
          style={{ fontSize: "clamp(2.6rem, 6.2vw, 4.6rem)", lineHeight: 1.05, color: "var(--text-primary)" }}
        >
          The Operating System
          <br />
          for{" "}
          <span
            style={{
              background: "linear-gradient(100deg, var(--accent-bright), var(--teal))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Education
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mt-6 mx-auto max-w-[640px] text-[17px] leading-[1.75] text-[var(--text-secondary)]"
        >
          One partner. Every system your institution needs to run, grow, and teach.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-[11px] px-7 py-3.5 text-[14px] font-semibold text-white transition-all duration-200 hover:brightness-110"
            style={{ background: "var(--accent)", boxShadow: "0 10px 30px var(--neon-glow)" }}
          >
            Book a Demo
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#ecosystem"
            className="inline-flex items-center rounded-[11px] px-7 py-3.5 text-[14px] font-semibold text-[var(--text-primary)] transition-colors"
            style={{ border: "1px solid var(--border-mid)", background: "var(--bg-elevated)" }}
          >
            See the Ecosystem
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-[14px] overflow-hidden"
          style={{ background: "var(--border-dark)", border: "1px solid var(--border-dark)" }}
        >
          {[
            ["Phase 1 live", "Brand-OS in production"],
            ["7 phases", "Full ecosystem roadmap"],
            ["India-first", "GST · WhatsApp · regional"],
            ["Education only", "No unrelated industries"],
          ].map(([t, s]) => (
            <div key={t} className="px-6 py-6 text-left" style={{ background: "var(--bg-surface)" }}>
              <div className="text-[15px] font-semibold text-[var(--text-primary)]">{t}</div>
              <div className="mt-1 text-[12.5px] text-[var(--text-dim)]">{s}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
