import { motion } from "framer-motion";
import { SectionHeader } from "@/components/site/SectionHeader";
import { HUDCard } from "@/components/hud/HUDCard";

const COLLAB = [
  {
    icon: "🎓",
    title: "START WITH BRAND-OS",
    sub: "Subscription · Get onboarded fast",
    body: "Start with AI-powered branding and marketing content from week one.",
    features: [
      "Institution brand profile setup",
      "AI posters, captions, and campaigns",
      "Approval-ready content workflows",
      "Fast onboarding and support",
    ],
    accent: "#F97316",
  },
  {
    icon: "🤝",
    title: "GROW WITH THE ECOSYSTEM",
    sub: "Ongoing partnership · One login",
    body: "As your institution scales, add automation, Exam-OS, and ERP without changing technology partners.",
    features: [
      "Add modules at your pace",
      "Shared institution data layer",
      "Priority implementation support",
      "No fragmented vendor stack",
    ],
    accent: "#9A3412",
  },
  {
    icon: "⚡",
    title: "FULL INSTITUTION OS",
    sub: "Enterprise · Integrated operations",
    body: "Large institutions and university systems get the complete integrated stack with dedicated support.",
    features: [
      "Multi-campus architecture",
      "Central administration controls",
      "Dedicated success team",
      "Phased rollout and migration",
    ],
    accent: "#7B5EA7",
  },
  {
    icon: "💡",
    title: "FOUNDING INSTITUTION PROGRAM",
    sub: "Early access · Shape the roadmap",
    body: "Join as one of our first institutions and directly influence the ecosystem with preferential pricing.",
    features: [
      "Early access to new modules",
      "Preferential founding pricing",
      "Direct product feedback channel",
      "Recognition as an early partner",
    ],
    accent: "#C9A84C",
  },
];

export function Collaboration() {
  return (
    <section
      className="relative py-24 md:py-32 px-5 md:px-8"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          eyebrow="// ENGAGEMENT PROTOCOLS"
          title="HOW WE WORK WITH YOU"
          subtitle="Start with what you need now, then grow into one complete education ecosystem."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COLLAB.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <HUDCard accent={c.accent} topBar={8} bracketSize={14} className="h-full" style={{ minHeight: 280 }}>
                <div className="p-9 pt-12 relative">
                  <div className="flex items-start gap-4 mb-2">
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-[4px] text-2xl shrink-0"
                      style={{
                        background: `${c.accent}1A`,
                        border: `1px solid ${c.accent}30`,
                      }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <h3 className="font-orbitron font-bold text-[18px] text-[var(--text-primary)] leading-tight">
                        {c.title}
                      </h3>
                      <div className="font-mono text-[10px] tracking-[0.15em] mt-1" style={{ color: c.accent }}>
                        {c.sub}
                      </div>
                    </div>
                  </div>

                  <p className="font-inter font-light text-[14px] leading-[1.75] text-[var(--text-secondary)] mt-5 mb-6">
                    {c.body}
                  </p>

                  <ul className="space-y-2">
                    {c.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[13px] font-inter text-[var(--text-primary)]">
                        <span className="font-mono pt-[2px]" style={{ color: c.accent }}>&gt;</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </HUDCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
