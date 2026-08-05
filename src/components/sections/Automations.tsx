import { motion } from "framer-motion";
import { SectionHeader } from "@/components/site/SectionHeader";
import { HUDCard } from "@/components/hud/HUDCard";

const WORKFLOWS = [
  {
    code: "FLOW_01",
    icon: "🎓",
    title: "STUDENT ONBOARDING",
    industry: "Schools · Colleges · Training institutes",
    steps: [
      "Admission form syncs to student database",
      "Fee link and welcome email auto-sent",
      "WhatsApp class schedule dispatched",
      "Parent portal credentials provisioned",
    ],
    impact: "Onboard hundreds of students without administrative bottlenecks.",
    accent: "#2563EB",
  },
  {
    code: "FLOW_02",
    icon: "🎯",
    title: "ADMISSIONS LEAD PIPELINE",
    industry: "Admissions · Counseling teams",
    steps: [
      "Enquiry form triggers lead scoring",
      "Qualified lead created in CRM",
      "WhatsApp and email nurture begins",
      "Counselor assigned with follow-up task",
    ],
    impact: "Every enquiry receives a fast, consistent admissions response.",
    accent: "#1E3A5F",
  },
  {
    code: "FLOW_03",
    icon: "🎯",
    title: "AI SUPPORT & PARENT QUERIES",
    industry: "Parents · Student services",
    steps: [
      "Inbound query classified by AI",
      "Sentiment + priority + category tagged",
      "Routed to right team or auto-replied",
      "Escalations logged and resolution tracked",
    ],
    impact: "Routine questions resolve instantly while sensitive issues reach staff.",
    accent: "#7B5EA7",
  },
  {
    code: "FLOW_04",
    icon: "🎨",
    title: "DAILY BRANDING CONTENT",
    industry: "Institution marketing teams",
    steps: [
      "Institution brand profile loads",
      "AI generates posters and captions",
      "Content enters an approval workflow",
      "Approved posts schedule to social channels",
    ],
    impact: "Stay visible every day without starting every creative from scratch.",
    accent: "#C9A84C",
  },
  {
    code: "FLOW_05",
    icon: "💳",
    title: "FEE & PAYMENT AUTOMATION",
    industry: "Accounts · Parents",
    steps: [
      "Fee due date triggers a reminder",
      "Secure payment link is dispatched",
      "Receipt generated after payment",
      "Accounts and student record updated",
    ],
    impact: "Reduce follow-ups and keep fee records accurate automatically.",
    accent: "#00FF88",
  },
  {
    code: "FLOW_06",
    icon: "📝",
    title: "EXAM RESULT DISTRIBUTION",
    industry: "Roadmap · Exam-OS",
    steps: [
      "Answer sheets evaluated",
      "Performance analytics generated",
      "Parent reports sent automatically",
      "Teacher dashboard updated",
    ],
    impact: "Roadmap workflow for faster, clearer result communication.",
    accent: "#2563EB",
  },
];

export function Automations() {
  return (
    <section
      id="automations"
      className="relative py-24 md:py-32 px-5 md:px-8"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
           eyebrow="// AUTOMATION PLAYBOOK"
           title="AUTOMATIONS FOR INSTITUTIONS"
           subtitle="Education-specific workflows built with n8n, custom code, and AI-driven agents."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKFLOWS.map((w, i) => (
            <motion.div
              key={w.code}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <HUDCard accent={w.accent} bracketSize={12} className="h-full">
                <div className="p-7 pt-9 relative">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-mono text-[9px] tracking-[0.18em] px-2 py-1 rounded-[2px]"
                      style={{
                        color: w.accent,
                        background: `${w.accent}14`,
                        border: `1px solid ${w.accent}26`,
                      }}
                    >
                      {w.code}
                    </span>
                    <span className="text-2xl">{w.icon}</span>
                  </div>

                  <h3 className="font-orbitron font-bold text-[15px] text-[var(--text-primary)] leading-tight mb-1">
                    {w.title}
                  </h3>
                  <div className="font-mono text-[10px] tracking-[0.12em] text-[var(--text-dim)] mb-5">
                    {w.industry}
                  </div>

                  <ol className="space-y-2 mb-5">
                    {w.steps.map((s, idx) => (
                      <li key={s} className="flex items-start gap-3 text-[12.5px] font-inter text-[var(--text-secondary)] leading-[1.6]">
                        <span
                          className="font-mono text-[10px] shrink-0 mt-[3px] w-[18px] h-[18px] flex items-center justify-center rounded-full"
                          style={{
                            color: w.accent,
                            border: `1px solid ${w.accent}40`,
                          }}
                        >
                          {idx + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>

                  <div
                    className="pt-4 font-mono text-[11px] leading-[1.6]"
                    style={{
                      borderTop: `1px dashed ${w.accent}30`,
                      color: w.accent,
                    }}
                  >
                    ▸ {w.impact}
                  </div>
                </div>
              </HUDCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
