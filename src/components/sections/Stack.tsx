import { SectionHeader } from "@/components/site/SectionHeader";
import { MarqueeRow } from "@/components/hud/MarqueeRow";

const ROW_1 = [
  "React/Next.js", "Node.js", "Python", "PostgreSQL", "MongoDB",
  "AWS/GCP", "Docker/K8s", "Flutter", "OpenAI/LLMs", "LangChain", "Supabase",
];
const ROW_2 = [
  "Stripe/Razorpay", "Firebase", "Redis", "n8n/Make.com", "REST & GraphQL",
  "CI/CD Pipelines", "Vercel/Netlify", "TypeScript", "TailwindCSS", "Framer Motion",
];

function Pill({ label }: { label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-5 py-[10px] rounded-[3px] mr-2 transition-all duration-200"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid rgba(37,99,235,0.18)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(37,99,235,0.5)";
        e.currentTarget.style.background = "rgba(37,99,235,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(37,99,235,0.18)";
        e.currentTarget.style.background = "var(--bg-elevated)";
      }}
    >
      <span className="w-[6px] h-[6px] rounded-full" style={{ background: "#2563EB", boxShadow: "0 0 4px #2563EB" }} />
      <span className="font-mono text-[12px] text-[var(--text-secondary)] whitespace-nowrap">{label}</span>
    </div>
  );
}

export function Stack() {
  return (
    <section
      id="stack"
      className="relative py-24 md:py-32"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        <SectionHeader eyebrow="// TECH ARSENAL" title="OUR STACK" />
      </div>

      <div className="space-y-4">
        <MarqueeRow direction="left" speed={30}>
          {ROW_1.map((t) => <Pill key={t} label={t} />)}
        </MarqueeRow>
        <MarqueeRow direction="right" speed={25}>
          {ROW_2.map((t) => <Pill key={t} label={t} />)}
        </MarqueeRow>
      </div>
    </section>
  );
}
