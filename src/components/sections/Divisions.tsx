import { motion } from "framer-motion";
import { SectionHeader } from "@/components/site/SectionHeader";
import { HUDCard } from "@/components/hud/HUDCard";

const DIVISIONS = [
  {
    badge: "DIV-01",
    icon: "🎓",
    title: "EDTECH DIVISION",
    products: "Custom School Platforms",
    desc: "Powering Indian Education at scale through AI-driven exam management and complete student performance systems.",
    accent: "#F5A623",
  },
  {
    badge: "DIV-02",
    icon: "🤖",
    title: "AI AUTOMATION",
    products: "n8n · LLMs · Custom Agents",
    desc: "We design and deploy automation infrastructure that eliminates repetitive work — intelligent workflows powered by the latest AI models.",
    accent: "#00D4E8",
  },
  {
    badge: "DIV-03",
    icon: "💻",
    title: "SAAS PRODUCTS",
    products: "SaaS · APIs · White-label",
    desc: "End-to-end SaaS development — from architecture to deployment to long-term maintenance and scaling.",
    accent: "#FFB830",
  },
];

export function Divisions() {
  return (
    <section
      id="divisions"
      className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* decorative diagonal circuit line */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      >
        <line x1="0" y1="100%" x2="100%" y2="0" stroke="rgba(245,166,35,0.06)" strokeDasharray="4 8" />
      </svg>

      <div className="relative max-w-[1440px] mx-auto">
        <SectionHeader
          eyebrow="// DIVISIONS.EXE"
          title="OUR CORE DIVISIONS"
          subtitle="Three focused divisions. One unified mission."
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
      </div>
    </section>
  );
}
