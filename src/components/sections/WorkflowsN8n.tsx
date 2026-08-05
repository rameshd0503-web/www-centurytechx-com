import { motion } from "framer-motion";

type Theme = "blue" | "green" | "purple" | "orange" | "teal" | "pink";

const THEMES: Record<Theme, { from: string; to: string; ring: string; chip: string; text: string }> = {
  blue:   { from: "#3B82F6", to: "#2563EB", ring: "rgba(37,99,235,0.25)",  chip: "rgba(37,99,235,0.08)",  text: "#1E3A5F" },
  green:  { from: "#22C55E", to: "#16A34A", ring: "rgba(34,197,94,0.25)",  chip: "rgba(34,197,94,0.08)",  text: "#14532D" },
  purple: { from: "#A855F7", to: "#7C3AED", ring: "rgba(168,85,247,0.25)", chip: "rgba(168,85,247,0.08)", text: "#4C1D95" },
  orange: { from: "#FB923C", to: "#EA580C", ring: "rgba(234,88,12,0.25)",  chip: "rgba(234,88,12,0.08)",  text: "#7C2D12" },
  teal:   { from: "#2DD4BF", to: "#0D9488", ring: "rgba(13,148,136,0.25)", chip: "rgba(13,148,136,0.08)", text: "#134E4A" },
  pink:   { from: "#F472B6", to: "#DB2777", ring: "rgba(219,39,119,0.25)", chip: "rgba(219,39,119,0.08)", text: "#831843" },
};

interface Workflow {
  icon: string;
  title: string;
  trigger: string;
  steps: string[];
  theme: Theme;
}

const WORKFLOWS: Workflow[] = [
  { icon: "🎓", title: "Student Onboarding", trigger: "Admission confirmed",
    steps: ["Create student record", "Send fee link", "WhatsApp class schedule", "Issue parent access"], theme: "blue" },
  { icon: "💰", title: "Fee Reminder Automation", trigger: "Fee due date approaching",
    steps: ["Check balance", "Send WhatsApp reminder", "Share payment link", "Update accounts"], theme: "green" },
  { icon: "🎯", title: "Admissions Follow-Up", trigger: "New admission enquiry",
    steps: ["Score lead", "Create CRM record", "Start nurture sequence", "Assign counselor"], theme: "purple" },
  { icon: "💬", title: "Parent Communication", trigger: "Institution announcement",
    steps: ["Select audience", "Personalize message", "Send WhatsApp + email", "Track delivery"], theme: "orange" },
  { icon: "🎨", title: "Brand Content Posting", trigger: "Campaign approved",
    steps: ["Generate channel copy", "Resize creative", "Schedule channels", "Log performance"], theme: "teal" },
  { icon: "📚", title: "Batch & Class Updates", trigger: "Schedule changed",
    steps: ["Update timetable", "Notify students", "Notify faculty", "Record acknowledgement"], theme: "pink" },
];

const STATS = [
  { icon: "⚡", value: "500+", label: "Hours Saved Per Client" },
  { icon: "🔄", value: "50+",  label: "Workflows Delivered" },
  { icon: "🤖", value: "20+",  label: "Apps Integrated" },
  { icon: "⭐", value: "100%", label: "Client Satisfaction" },
];

function FlowDiagram({ steps, theme }: { steps: string[]; theme: Theme }) {
  const t = THEMES[theme];
  return (
    <div className="relative mt-5 overflow-hidden rounded-[8px] p-3" style={{ background: t.chip, border: `1px solid ${t.ring}` }}>
      <div className="flex flex-col gap-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex-1 flex items-center gap-2 px-3 py-2 rounded-full bg-white"
              style={{ border: `1px solid ${t.ring}`, boxShadow: `0 1px 0 ${t.ring}` }}
            >
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}
              >
                {i + 1}
              </span>
              <span className="font-mono text-[11px] tracking-[0.04em]" style={{ color: t.text }}>{s}</span>
            </motion.div>
          </div>
        ))}
      </div>

      {/* animated flow line */}
      <div className="relative mt-3 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.05)" }}>
        <motion.div
          className="absolute top-0 left-0 h-full w-1/3 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${t.from}, ${t.to}, transparent)` }}
          animate={{ x: ["-40%", "320%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}

export function WorkflowsN8n() {
  return (
     <section id="workflows" className="relative py-24 px-5 md:px-8" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-[6px] rounded-full mb-5"
            style={{ border: "1px solid rgba(37,99,235,0.25)", background: "rgba(37,99,235,0.06)" }}>
            <span className="inline-block w-[6px] h-[6px] rounded-full" style={{ background: "#2563EB", boxShadow: "0 0 6px #2563EB" }} />
             <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--accent)]">// POWERED BY N8N — FOR EDUCATION</span>
          </div>
           <h2 className="font-orbitron font-black mb-4" style={{ color: "var(--text-primary)", fontSize: "clamp(2rem, 4.2vw, 3.4rem)", lineHeight: 1 }}>
             SMART EDUCATION WORKFLOWS
          </h2>
           <p className="font-inter font-light text-[16px] md:text-[17px] leading-[1.7] text-[var(--text-secondary)] max-w-[640px] mx-auto">
             Custom n8n workflows for admissions, accounts, communication, and institution marketing.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-[10px] overflow-hidden mb-14"
           style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-mid)", boxShadow: "var(--shadow-card)" }}>
          {STATS.map((s, i) => (
            <div key={i} className="px-5 py-6 text-center"
              style={{ borderRight: i < 3 ? "1px solid rgba(37,99,235,0.12)" : "none" }}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-orbitron font-black text-[#2563EB]" style={{ fontSize: "1.6rem", lineHeight: 1 }}>{s.value}</div>
              <div className="mt-2 font-mono text-[9px] tracking-[0.2em] text-[#64748B]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKFLOWS.map((w, i) => {
            const t = THEMES[w.theme];
            return (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                 className="group relative rounded-[12px] p-6 transition-all duration-300 hover:-translate-y-1"
                 style={{ background: "var(--bg-elevated)", border: `1px solid ${t.ring}`, boxShadow: "var(--shadow-card)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 18px 40px ${t.ring}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 14px rgba(30,58,95,0.06)"; }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-[10px] text-2xl shrink-0"
                    style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})`, boxShadow: `0 6px 16px ${t.ring}` }}
                  >
                    <span>{w.icon}</span>
                  </div>
                  <div className="flex-1">
                     <h3 className="font-orbitron font-bold text-[15px]" style={{ color: "var(--text-primary)" }}>
                      {w.title}
                    </h3>
                    <div className="mt-1 font-mono text-[10px] tracking-[0.14em] text-[#64748B]">
                      TRIGGER · {w.trigger.toUpperCase()}
                    </div>
                  </div>
                </div>

                <FlowDiagram steps={w.steps} theme={w.theme} />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="fx-shine group inline-flex items-center gap-2 font-orbitron font-bold text-[12px] tracking-[0.12em] text-white px-8 py-4 rounded-[8px] transition-all duration-200"
            style={{ background: "#2563EB", boxShadow: "0 6px 18px rgba(37,99,235,0.25)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#3B82F6";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(37,99,235,0.35)";
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2563EB";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(37,99,235,0.25)";
              e.currentTarget.style.transform = "translateY(0) scale(1)";
            }}
          >
            GET YOUR CUSTOM WORKFLOW BUILT
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
