import { motion } from "framer-motion";
import { SectionHeader } from "@/components/site/SectionHeader";
import { HUDCard } from "@/components/hud/HUDCard";

const SERVICES = [
  { num: "01", icon: "💻", title: "SaaS Product Development", desc: "Full-stack SaaS from concept to deployed product." },
  { num: "02", icon: "🤖", title: "AI & Automation Workflows", desc: "n8n, LLMs, custom agents — automate what slows you." },
  { num: "03", icon: "🎓", title: "EdTech Solutions", desc: "Custom exam management and student platforms for institutions." },
  { num: "04", icon: "⚡", title: "MVP Rapid Build", desc: "Ship a working product in 8–12 weeks. No fluff." },
  { num: "05", icon: "🎬", title: "AI Video Editing (CutX)", desc: "AI-powered video editing at creator speed and scale." },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 px-5 md:px-8"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader eyebrow="// SERVICE PROTOCOLS" title="WHAT WE BUILD" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={i === 3 ? "lg:col-start-1 lg:col-end-2 xl:col-start-1" : ""}
            >
              <HUDCard accent="#2563EB" bracketSize={10} className="h-full">
                <div className="p-8 px-7 relative">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-11 h-11 flex items-center justify-center rounded-[4px] text-xl"
                      style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-mid)",
                      }}
                    >
                      {s.icon}
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-dim)]">
                      {s.num}
                    </span>
                  </div>
                  <h3 className="font-orbitron font-bold text-[14px] text-[var(--text-primary)] mb-3 leading-tight">
                    {s.title}
                  </h3>
                  <p className="font-inter font-light text-[13px] leading-[1.7] text-[var(--text-secondary)] mb-6">
                    {s.desc}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-[var(--neon)] hover:text-[var(--neon-bright)]"
                  >
                    &gt; INITIATE
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
