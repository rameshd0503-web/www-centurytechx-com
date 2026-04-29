import { motion } from "framer-motion";
import { SectionHeader } from "@/components/site/SectionHeader";
import { HUDCard } from "@/components/hud/HUDCard";

const WORKFLOWS = [
  {
    code: "FLOW_01",
    icon: "📥",
    title: "LEAD CAPTURE → CRM → SLACK",
    industry: "Agencies · SMBs",
    steps: [
      "Website form submission triggers webhook",
      "Lead enriched via Clearbit / Apollo API",
      "Auto-created in HubSpot / Zoho CRM",
      "Slack alert pinged to sales channel",
    ],
    impact: "Cuts lead response time from hours → under 60 seconds.",
    accent: "#F5A623",
  },
  {
    code: "FLOW_02",
    icon: "🧾",
    title: "INVOICE & GST AUTOMATION",
    industry: "SMBs · Finance teams",
    steps: [
      "Razorpay / Stripe payment webhook fires",
      "Invoice generated with GST calculation",
      "PDF emailed to client + stored in Drive",
      "Tally / Zoho Books updated via API",
    ],
    impact: "Eliminates 10+ hours/week of manual bookkeeping.",
    accent: "#00D4E8",
  },
  {
    code: "FLOW_03",
    icon: "🎯",
    title: "AI SUPPORT TRIAGE",
    industry: "SaaS · EdTech",
    steps: [
      "Inbound ticket parsed by GPT-5 classifier",
      "Sentiment + priority + category tagged",
      "Routed to right team or auto-replied",
      "Escalations logged in Linear / Jira",
    ],
    impact: "Resolves 40% of tickets without human touch.",
    accent: "#7B5EA7",
  },
  {
    code: "FLOW_04",
    icon: "🎬",
    title: "CONTENT FACTORY (CutX)",
    industry: "Creators · Marketing teams",
    steps: [
      "Long-form video uploaded to Drive folder",
      "AI transcribes + extracts viral clips",
      "Auto-captioned shorts generated",
      "Scheduled to YouTube / Reels / TikTok",
    ],
    impact: "1 podcast → 20+ shorts published, hands-free.",
    accent: "#C9A84C",
  },
  {
    code: "FLOW_05",
    icon: "📊",
    title: "DAILY KPI DIGEST",
    industry: "Founders · Ops leads",
    steps: [
      "Cron pulls metrics from Stripe, GA4, DB",
      "LLM summarises trends + anomalies",
      "Branded PDF / WhatsApp digest dispatched",
      "Alerts trigger if thresholds breached",
    ],
    impact: "Founders get a board-ready snapshot every 8 AM.",
    accent: "#00FF88",
  },
  {
    code: "FLOW_06",
    icon: "🎓",
    title: "STUDENT ONBOARDING (EdTech)",
    industry: "Schools · Coaching centres",
    steps: [
      "Admission form syncs to StudentOS",
      "Fee link + welcome email auto-sent",
      "WhatsApp class schedule dispatched",
      "Parent portal credentials provisioned",
    ],
    impact: "Onboards 500+ students/day without admin overhead.",
    accent: "#F5A623",
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
          title="WORKFLOWS WE'VE SHIPPED"
          subtitle="Real automation blueprints we deploy for clients — n8n, Make, custom code, and LLM-driven agents."
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
