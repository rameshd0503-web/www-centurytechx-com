import { motion } from "framer-motion";
import { SectionHeader } from "@/components/site/SectionHeader";
import { HUDCard } from "@/components/hud/HUDCard";

const DIVISIONS = [
  {
    badge: "PHASE-01 · LIVE",
    icon: "🎨",
    title: "BRAND-OS",
    products: "AI branding & marketing automation",
    desc: "AI poster and video generation, content writing, and campaign planning. Every institution needs branding — we start where value is immediate.",
    accent: "#2563EB",
  },
  {
    badge: "PHASE-02 · ROADMAP",
    icon: "🤖",
    title: "AI AUTOMATION SUITE",
    products: "WhatsApp · Admissions · CRM · Chatbots",
    desc: "Admissions, email, WhatsApp, CRM, and chatbot automations that deepen the relationship once trust is built.",
    accent: "#1E3A5F",
  },
  {
    badge: "PHASE-03 · ROADMAP",
    icon: "📝",
    title: "EXAM-OS",
    products: "Assessments · Evaluation · Analytics",
    desc: "Question paper generation, evaluation, analytics, parent reports, and teacher dashboards in one assessment system.",
    accent: "#3B82F6",
  },
];

export function Divisions() {
  return (
    <section
       id="ecosystem"
      className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* decorative diagonal circuit line */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      >
        <line x1="0" y1="100%" x2="100%" y2="0" stroke="rgba(37,99,235,0.06)" strokeDasharray="4 8" />
      </svg>

      <div className="relative max-w-[1440px] mx-auto">
        <SectionHeader
           eyebrow="// ECOSYSTEM PHASES"
           title="ONE ECOSYSTEM. SEVEN PHASES."
           subtitle="Starting with immediate value today, then expanding into the complete operating system for education."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DIVISIONS.map((d, i) => (
            <motion.div
              key={d.badge}
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <HUDCard accent={d.accent} topBar={3} className="h-full">
                {/* scanline sweep */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden"
                >
                  <div
                    className="absolute inset-x-0 h-[40%]"
                    style={{
                      background: `linear-gradient(180deg, transparent, ${d.accent}15, transparent)`,
                      animation: "scan-sweep 1.8s linear infinite",
                    }}
                  />
                </div>

                <div className="p-10 px-8 relative">
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="font-mono text-[9px] tracking-[0.2em] px-2 py-1 rounded-[2px]"
                      style={{
                        color: d.accent,
                        background: `${d.accent}10`,
                        border: `1px solid ${d.accent}30`,
                      }}
                    >
                      {d.badge}
                    </span>
                  </div>

                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-[4px] mb-6 text-2xl"
                    style={{ background: `${d.accent}1A`, border: `1px solid ${d.accent}30` }}
                  >
                    {d.icon}
                  </div>

                  <h3 className="font-orbitron font-bold text-[20px] text-[var(--text-primary)] mb-2">
                    {d.title}
                  </h3>
                  <div
                    className="font-mono text-[11px] tracking-[0.1em] mb-5"
                    style={{ color: d.accent }}
                  >
                    {d.products}
                  </div>
                  <p className="font-inter font-light text-[14px] leading-[1.7] text-[var(--text-secondary)] mb-8">
                    {d.desc}
                  </p>

                  <a
                    href="#services"
                    className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] transition-opacity hover:opacity-70"
                    style={{ color: d.accent }}
                  >
                    ACCESS MODULE //
                  </a>
                </div>
              </HUDCard>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 rounded-[4px] p-6" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-mid)" }}>
          <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--neon)] mb-4">// FULL 7-PHASE ECOSYSTEM</div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {["● BRAND-OS · LIVE NOW", "○ AI AUTOMATION · ROADMAP", "○ EXAM-OS · ROADMAP", "○ INSTITUTION ERP · ROADMAP", "○ STUDENT NETWORK · ROADMAP", "○ MARKETPLACE · ROADMAP", "○ EDUCATION INTELLIGENCE · ROADMAP"].map((phase) => (
              <div key={phase} className="font-mono text-[10px] leading-[1.6] text-[var(--text-secondary)]">{phase}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
