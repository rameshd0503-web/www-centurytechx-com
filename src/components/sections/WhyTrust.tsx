import { motion } from "framer-motion";
import { SectionHeader } from "@/components/site/SectionHeader";

const REASONS = [
  {
    code: "TRUST_01",
    icon: "🔐",
    title: "100% IP OWNERSHIP",
    desc: "Every line of code we write is yours. No lock-in, no licensing traps.",
    accent: "#00FF88",
  },
  {
    code: "TRUST_02",
    icon: "⚡",
    title: "DELIVERY-FIRST CULTURE",
    desc: "We sign contracts with timelines. If we commit to 10 weeks, we mean 10 weeks.",
    accent: "#F5A623",
  },
  {
    code: "TRUST_03",
    icon: "🤝",
    title: "FOUNDER-TO-FOUNDER THINKING",
    desc: "We think about your product like it's ours. Because sometimes, it is (Co-Build model).",
    accent: "#00D4E8",
  },
  {
    code: "TRUST_04",
    icon: "🇮🇳",
    title: "BUILT FOR INDIA",
    desc: "GST-ready, Razorpay-integrated, WhatsApp-native. We build for how India actually works.",
    accent: "#C9A84C",
  },
];

export function WhyTrust() {
  return (
    <section
      className="relative py-24 md:py-32 px-5 md:px-8"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          eyebrow="// WHY CENTURY TECHX"
          title="WHY TRUST US?"
          subtitle="No client logos to flash yet — just principles we ship by."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.code}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[4px] p-7 transition-all duration-300 hover:-translate-y-[6px]"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-dark)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${r.accent}66`;
                e.currentTarget.style.boxShadow = `0 12px 40px ${r.accent}1a`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-dark)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                className="inline-block font-mono text-[9px] tracking-[0.18em] px-2 py-1 rounded-[2px] mb-5"
                style={{
                  color: r.accent,
                  background: `${r.accent}14`,
                  border: `1px solid ${r.accent}26`,
                }}
              >
                {r.code}
              </span>
              <div className="text-3xl mb-4">{r.icon}</div>
              <h3 className="font-orbitron font-bold text-[14px] text-[var(--text-primary)] mb-3 leading-tight">
                {r.title}
              </h3>
              <p className="font-mono text-[12px] leading-[1.7] text-[var(--text-secondary)]">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
