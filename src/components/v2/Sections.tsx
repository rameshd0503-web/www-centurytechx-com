import { Section, SectionHead, Reveal, SoftCard } from "./Primitives";
import { School, GraduationCap, BookOpen, Briefcase } from "lucide-react";

const problems = [
  "A CRM that never syncs with admissions",
  "A website vendor who takes weeks per change",
  "A marketing agency with no education context",
  "Analytics that live in five different logins",
];

export function Problem() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] items-center">
        <SectionHead
          eyebrow="The Problem"
          title="One institution, ten vendors."
          accentWord="ten"
          intro="Institutions today juggle a CRM, a website vendor, a marketing agency, admissions software, and analytics tools that don't talk to each other."
        />
        <Reveal delay={0.08}>
          <SoftCard dark className="p-8">
            <ul className="flex flex-col gap-4">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] text-white/72">
                  <span
                    className="mt-[9px] w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  {p}
                </li>
              ))}
            </ul>
          </SoftCard>
        </Reveal>
      </div>
    </Section>
  );
}

const audiences = [
  { icon: School, title: "Schools", desc: "Admissions, parent comms, and brand presence in one place." },
  { icon: GraduationCap, title: "Colleges & Universities", desc: "Departments, campaigns, and reporting that finally align." },
  { icon: BookOpen, title: "Coaching Institutes", desc: "Batch-season marketing and lead follow-up on autopilot." },
  { icon: Briefcase, title: "Training Institutes", desc: "Cohort intake, certification, and placement workflows." },
];

export function WhoWeServe() {
  return (
    <Section id="serve">
      <SectionHead
        eyebrow="For Institutions"
        title="Who we serve"
        accentWord="serve"
        intro="Built exclusively for Indian education — no unrelated industries, no generic playbooks."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {audiences.map((a, i) => {
          const Icon = a.icon;
          return (
            <Reveal key={a.title} delay={i * 0.06}>
              <SoftCard className="h-full">
                <div
                  className="w-11 h-11 rounded-[13px] grid place-items-center"
                  style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-[17px] font-extrabold tracking-[-0.02em]">{a.title}</h3>
                <p className="mt-2 text-[13.5px] leading-[1.65] text-[var(--text-secondary)]">{a.desc}</p>
              </SoftCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

const pillars = [
  { title: "Built exclusively for education", desc: "Every workflow assumes admission cycles, batches, and parents." },
  { title: "One login, every system", desc: "Brand, admissions, exams, and operations under a single account." },
  { title: "India-first", desc: "GST invoicing, WhatsApp-native comms, and regional language support." },
  { title: "Your data compounds for you", desc: "You own the data; each product makes the next one smarter." },
];

export function WhyOnePartner() {
  return (
    <Section tinted>
      <SectionHead
        eyebrow="Why Century TechX"
        title="Why one partner wins"
        accentWord="one"
        intro="Fragmented vendors cost more than money — they cost the compounding value of your own data."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <SoftCard className="h-full">
              <span className="text-[12px] font-bold tracking-[0.16em] text-[var(--accent)]">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-[16.5px] font-extrabold tracking-[-0.02em] leading-[1.3]">
                {p.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.65] text-[var(--text-secondary)]">{p.desc}</p>
            </SoftCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
