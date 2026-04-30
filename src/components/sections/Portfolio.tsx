import { motion } from "framer-motion";
import { SectionHeader } from "@/components/site/SectionHeader";
import { HUDCard } from "@/components/hud/HUDCard";

const PROJECTS = [
  {
    code: "PROJ_01",
    name: "EduCore LMS",
    desc: "AI-powered exam & student management platform for coaching centres.",
    tags: ["React", "Node.js", "PostgreSQL", "AI"],
    accent: "#1E3A5F",
    flagship: false,
  },
  {
    code: "PROJ_02",
    name: "FlowBot",
    desc: "End-to-end n8n automation suite for SMB lead and invoice workflows.",
    tags: ["n8n", "Python", "Webhooks", "GPT"],
    accent: "#00FF88",
    flagship: false,
  },
  {
    code: "PROJ_03",
    name: "CutX",
    desc: "AI video editing pipeline for content creators.",
    tags: ["Python", "FFmpeg", "OpenAI", "LangChain"],
    accent: "#2563EB",
    flagship: true,
  },
];

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative py-24 md:py-32 px-5 md:px-8"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          eyebrow="// DEPLOYED PRODUCTS"
          title="MISSIONS IN THE FIELD"
          subtitle="A glimpse at the systems we've shipped — owned, operated, and battle-tested."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.code}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <HUDCard accent={p.accent} bracketSize={12} className="h-full">
                <div className="p-7 pt-9 relative h-full flex flex-col">
                  {p.flagship && (
                    <div
                      className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.18em] px-2 py-1 rounded-[2px]"
                      style={{
                        color: "#000",
                        background: "#2563EB",
                        boxShadow: "0 0 14px rgba(37,99,235,0.55)",
                        fontWeight: 700,
                      }}
                    >
                      ★ FLAGSHIP
                    </div>
                  )}

                  <span
                    className="inline-block font-mono text-[9px] tracking-[0.18em] px-2 py-1 rounded-[2px] mb-4 self-start"
                    style={{
                      color: p.accent,
                      background: `${p.accent}14`,
                      border: `1px solid ${p.accent}26`,
                    }}
                  >
                    {p.code}
                  </span>

                  <h3
                    className="font-orbitron font-bold text-[20px] mb-2"
                    style={{ color: p.accent }}
                  >
                    {p.name}
                  </h3>
                  <p className="font-inter font-light text-[13.5px] leading-[1.7] text-[var(--text-secondary)] mb-5">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] tracking-[0.1em] px-2 py-[3px] rounded-[2px] text-[var(--text-secondary)]"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid var(--border-dark)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#"
                    className="mt-auto inline-flex items-center gap-2 font-orbitron font-bold text-[11px] tracking-[0.14em] px-5 py-3 rounded-[3px] transition-all duration-200 self-start"
                    style={{
                      color: p.accent,
                      border: `1px solid ${p.accent}55`,
                      background: `${p.accent}0d`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${p.accent}1f`;
                      e.currentTarget.style.borderColor = p.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${p.accent}0d`;
                      e.currentTarget.style.borderColor = `${p.accent}55`;
                    }}
                  >
                    VIEW MISSION //
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
