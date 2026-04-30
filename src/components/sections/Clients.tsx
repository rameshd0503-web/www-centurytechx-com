import { motion } from "framer-motion";
import { SectionHeader } from "@/components/site/SectionHeader";

const CLIENTS = [
  {
    code: "CLIENT_01",
    icon: "🌱",
    name: "STARTUPS",
    desc: "First-time founders who need an MVP built fast and affordably, with full IP ownership.",
  },
  {
    code: "CLIENT_02",
    icon: "🏫",
    name: "EDTECH & SCHOOLS",
    desc: "Institutions needing exam engines, LMS, or ERP solutions for Indian education.",
  },
  {
    code: "CLIENT_03",
    icon: "🏢",
    name: "SMBS & ENTERPRISES",
    desc: "Businesses needing custom SaaS tools, AI automation, or digital transformation.",
  },
  {
    code: "CLIENT_04",
    icon: "💼",
    name: "AGENCIES & CREATORS",
    desc: "Agencies needing white-label SaaS and creators needing AI video and automation tools.",
  },
];

export function Clients() {
  return (
    <section
      className="relative py-24 md:py-32 px-5 md:px-8"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          eyebrow="// TARGET CLIENTS"
          title="WHO WE SERVE"
          subtitle="From first-time founders to growing enterprises."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CLIENTS.map((c, i) => (
            <motion.div
              key={c.code}
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
                e.currentTarget.style.borderColor = "rgba(37,99,235,0.4)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,99,235,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-dark)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                className="inline-block font-mono text-[9px] tracking-[0.18em] text-[var(--neon)] px-2 py-1 rounded-[2px] mb-5"
                style={{
                  background: "rgba(37,99,235,0.08)",
                  border: "1px solid rgba(37,99,235,0.15)",
                }}
              >
                {c.code}
              </span>
              <div className="text-3xl mb-4">{c.icon}</div>
              <h3 className="font-orbitron font-bold text-[14px] text-[var(--text-primary)] mb-3">
                {c.name}
              </h3>
              <p className="font-inter font-light text-[13px] leading-[1.7] text-[var(--text-secondary)]">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
