import { Section, SectionHead, Reveal, SoftCard } from "./Primitives";
import { ArrowUpRight, FileText } from "lucide-react";

const posts = [
  {
    tag: "Admissions",
    title: "What a 2026 admission funnel actually looks like",
    date: "12 Jun 2026",
  },
  {
    tag: "Automation",
    title: "WhatsApp-first parent communication, without the spam",
    date: "28 May 2026",
  },
  {
    tag: "Strategy",
    title: "Why institutions outgrow their marketing agency",
    date: "09 May 2026",
  },
];

export function Insights() {
  return (
    <Section id="insights">
      <SectionHead
        eyebrow="Insights"
        title="Notes from the field"
        accentWord="field"
        intro="Practical writing on admissions, automation, and running an institution's technology stack."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <SoftCard className="h-full group">
              <div
                className="h-[132px] rounded-[14px]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(232,148,15,0.18), rgba(20,24,31,0.06))",
                }}
              />
              <span className="mt-5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                {p.tag}
              </span>
              <h3 className="mt-2 text-[17px] font-extrabold tracking-[-0.02em] leading-[1.35]">
                {p.title}
              </h3>
              <div className="mt-4 flex items-center justify-between text-[12.5px] text-[var(--text-dim)]">
                {p.date}
                <ArrowUpRight
                  size={16}
                  className="text-[var(--accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </SoftCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <div
          className="mt-6 rounded-[18px] p-7 md:p-9 flex flex-col md:flex-row md:items-center gap-6 justify-between"
          style={{ background: "var(--card-dark)", boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-11 h-11 rounded-[13px] grid place-items-center shrink-0"
              style={{ background: "rgba(255,255,255,0.10)", color: "var(--accent)" }}
            >
              <FileText size={20} />
            </div>
            <div>
              <h3 className="text-[19px] font-extrabold tracking-[-0.02em] text-white">
                State of Indian EdTech
              </h3>
              <p className="mt-1.5 text-[14px] text-white/60 max-w-[560px]">
                Our annual report on how Indian institutions buy, adopt, and consolidate technology.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13.5px] font-semibold text-white shrink-0 transition-all duration-200 active:scale-95 hover:brightness-110"
            style={{ background: "var(--accent)" }}
          >
            Request the report
            <ArrowUpRight size={16} />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
