import { motion } from "framer-motion";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CornerBrackets } from "@/components/hud/CornerBrackets";

const PRODUCTS = [
  {
    code: "PRODUCT-001",
    name: "EXAMOS",
    tagline: "AI-Powered Exam Management for K-12 Schools",
    description:
      "A complete exam management operating system for Indian K-12 schools — from AI question paper generation to real-time analytics, powered by a flexible credit-based pricing model.",
    features: [
      "AI question paper generation",
      "Credit-based flexible pricing",
      "School subdomain system (school.examos.in)",
      "Real-time analytics dashboard",
    ],
    accent: "#F5A623",
    cta: "LAUNCH EXAMOS //",
  },
  {
    code: "PRODUCT-002",
    name: "STUDENTOS",
    tagline: "Complete Student Management OS",
    description:
      "A full-featured student management operating system for Indian schools and coaching centres — attendance, fees, performance tracking, and parent communication.",
    features: [
      "Attendance & performance tracking",
      "Parent communication portal",
      "Fee management system",
      "Multi-branch support",
    ],
    accent: "#00D4E8",
    cta: "LAUNCH STUDENTOS //",
  },
];

export function Products() {
  return (
    <section
      id="products"
      className="relative py-24 md:py-32 px-5 md:px-8"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="relative max-w-[1440px] mx-auto">
        <SectionHeader eyebrow="// ACTIVE PRODUCTS" title="DEPLOYED SYSTEMS" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.code}
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[4px] p-8 md:p-12 group transition-all duration-300 hover:-translate-y-[6px]"
              style={{
                background: "var(--bg-elevated)",
                borderLeft: `4px solid ${p.accent}`,
                border: `1px solid var(--border-dark)`,
                borderLeftWidth: 4,
                borderLeftColor: p.accent,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 1px ${p.accent}40, 0 16px 48px ${p.accent}20, 0 0 80px ${p.accent}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <CornerBrackets size={16} color={p.accent} />

              <div className="relative">
                <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                  <span
                    className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] px-3 py-[6px] rounded-[2px]"
                    style={{
                      color: p.accent,
                      background: `${p.accent}1A`,
                      border: `1px solid ${p.accent}50`,
                    }}
                  >
                    <span
                      className="w-[6px] h-[6px] rounded-full"
                      style={{ background: p.accent, boxShadow: `0 0 6px ${p.accent}`, animation: "blink 1.5s steps(2) infinite" }}
                    />
                    EDTECH · LIVE
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.15em] text-[var(--text-dim)]">
                    {p.code}
                  </span>
                </div>

                <h3
                  className="font-orbitron font-black mb-3"
                  style={{
                    color: p.accent,
                    fontSize: "clamp(2.2rem, 4vw, 3rem)",
                    letterSpacing: "-0.02em",
                    textShadow: `0 0 30px ${p.accent}66`,
                  }}
                >
                  {p.name}
                </h3>

                <p className="font-rajdhani font-semibold text-[1.1rem] text-[var(--text-secondary)] mb-5">
                  {p.tagline}
                </p>

                <p className="font-inter font-light text-[15px] leading-[1.75] text-[var(--text-secondary)] mb-8">
                  {p.description}
                </p>

                <ul className="mb-10">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 py-2 border-b border-[var(--border-dark)] last:border-0"
                    >
                      <span className="font-mono text-[14px]" style={{ color: p.accent }}>&gt;</span>
                      <span className="font-inter text-[14px] text-[var(--text-primary)]">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full font-orbitron font-bold text-[12px] tracking-[0.15em] text-black px-6 py-4 rounded-[3px] transition-all duration-200"
                  style={{ background: p.accent }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 30px ${p.accent}80`;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {p.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
