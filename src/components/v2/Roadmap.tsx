import { Section, SectionHead, Reveal, SoftCard } from "./Primitives";
import {
  Sparkles,
  Bot,
  ClipboardCheck,
  Building2,
  Users,
  Store,
  LineChart,
} from "lucide-react";

const phases = [
  { n: "01", name: "Brand-OS", desc: "Branding & marketing automation", icon: Sparkles, live: true },
  { n: "02", name: "AI Automation Suite", desc: "WhatsApp, admissions, CRM", icon: Bot, live: true },
  { n: "03", name: "Exam-OS", desc: "Assessment & analytics", icon: ClipboardCheck, live: false },
  { n: "04", name: "Institution ERP", desc: "Fees, attendance, payroll", icon: Building2, live: false },
  { n: "05", name: "Student Network", desc: "Learners, alumni, mentors", icon: Users, live: false },
  { n: "06", name: "Marketplace", desc: "Vetted services & content", icon: Store, live: false },
  { n: "07", name: "Education Intelligence", desc: "Trends & benchmarking", icon: LineChart, live: false },
];

export function Roadmap() {
  return (
    <Section id="roadmap" tinted>
      <SectionHead
        eyebrow="Capabilities"
        title="The seven-phase ecosystem"
        accentWord="ecosystem"
        intro="One roadmap, built in order, so every institution grows onto the next system without switching vendors."
      />

      <Reveal delay={0.05}>
        <div className="mt-12 -mx-5 md:mx-0 overflow-x-auto pb-4">
          <div className="flex gap-5 px-5 md:px-0 min-w-max">
            {phases.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.n} className="w-[248px] shrink-0">
                  <SoftCard className="h-full">
                    <div className="flex items-start justify-between">
                      <div
                        className="w-11 h-11 rounded-[13px] grid place-items-center"
                        style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                      >
                        <Icon size={20} />
                      </div>
                      <span
                        className="rounded-full px-2.5 py-1 text-[9.5px] font-bold tracking-[0.14em]"
                        style={{
                          background: p.live ? "var(--accent)" : "rgba(20,24,31,0.06)",
                          color: p.live ? "#FFFFFF" : "var(--text-dim)",
                        }}
                      >
                        {p.live ? "LIVE" : "ROADMAP"}
                      </span>
                    </div>
                    <div className="mt-6 text-[12px] font-mono text-[var(--text-dim)]">Phase {p.n}</div>
                    <h3 className="mt-1 text-[17px] font-extrabold tracking-[-0.02em]">{p.name}</h3>
                    <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--text-secondary)]">
                      {p.desc}
                    </p>
                  </SoftCard>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
