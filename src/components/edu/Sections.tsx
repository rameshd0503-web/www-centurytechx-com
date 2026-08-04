import { Section, Heading, Card } from "@/components/edu/Section";
import { motion } from "framer-motion";
import {
  Image,
  Video,
  PenLine,
  LayoutTemplate,
  CheckCircle2,
  CalendarRange,
  Unplug,
  School,
  GraduationCap,
  Users,
  Briefcase,
  ShieldCheck,
  KeyRound,
  MapPin,
  TrendingUp,
  Newspaper,
  Trophy,
  FileBarChart,
  ArrowRight,
} from "lucide-react";

/* ---------------- 3. The Problem ---------------- */

const fragments = [
  "CRM vendor",
  "Website vendor",
  "Marketing agency",
  "Admissions software",
  "Analytics tool",
];

export function Problem() {
  return (
    <Section id="problem" alt>
      <Heading
        eyebrow="The Problem"
        title="Institutions are running on five disconnected vendors"
        intro="A CRM here, a website vendor there, a marketing agency on retainer, admissions software bolted on, and an analytics tool nobody logs into. None of them talk to each other. Data is stranded, work is duplicated, and no one owns the outcome."
      />

      <div className="grid gap-4 md:grid-cols-5">
        {fragments.map((f, i) => (
          <motion.div
            key={f}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="rounded-[13px] px-5 py-6 text-center"
            style={{
              background: "var(--bg-elevated)",
              border: "1px dashed var(--border-mid)",
            }}
          >
            <Unplug size={18} className="mx-auto mb-3 text-[var(--text-dim)]" />
            <div className="text-[13.5px] text-[var(--text-secondary)]">{f}</div>
          </motion.div>
        ))}
      </div>

      <div
        className="mt-10 rounded-[16px] px-8 py-9 text-center"
        style={{
          background: "linear-gradient(120deg, rgba(79,107,255,0.10), rgba(45,212,191,0.08))",
          border: "1px solid var(--border-bright)",
        }}
      >
        <p
          className="font-semibold tracking-[-0.02em] text-[var(--text-primary)]"
          style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)" }}
        >
          "Every institution should only need one technology partner."
        </p>
        <p className="mt-3 text-[14.5px] text-[var(--text-secondary)]">
          That is the reason Century TechX exists.
        </p>
      </div>
    </Section>
  );
}

/* ---------------- 4. Product Today — Brand-OS ---------------- */

const brandOs = [
  { icon: Image, title: "AI Poster Generation", body: "Admission posters, event creatives and announcements generated in your institution's brand style." },
  { icon: Video, title: "AI Video Generation", body: "Short-form videos for campaigns, results and campus updates without an editing team." },
  { icon: PenLine, title: "Content Writing", body: "Blogs, captions and full social calendars written for an education audience." },
  { icon: LayoutTemplate, title: "Templates & Brand Profile", body: "Your logo, colours, fonts and tone stored once and applied to everything." },
  { icon: CheckCircle2, title: "Approval Workflow", body: "Drafts route to the principal or marketing head before anything goes public." },
  { icon: CalendarRange, title: "Campaign Planner", body: "Plan admission cycles, exam seasons and events across the academic year." },
];

export function BrandOS() {
  return (
    <Section id="product">
      <Heading
        eyebrow="The Product Today"
        title="Brand-OS — live and in production"
        intro="Brand-OS is the first module of the ecosystem and it is available now. It handles everything an institution publishes: creatives, video, written content, approvals and campaign planning."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {brandOs.map((f) => (
          <Card key={f.title}>
            <div
              className="grid place-items-center w-10 h-10 rounded-[10px] mb-5"
              style={{ background: "var(--accent-soft)", color: "var(--accent-bright)" }}
            >
              <f.icon size={19} />
            </div>
            <h3 className="text-[16px] font-semibold text-[var(--text-primary)]">{f.title}</h3>
            <p className="mt-2.5 text-[14px] leading-[1.7] text-[var(--text-secondary)]">{f.body}</p>
          </Card>
        ))}
      </div>

      <p className="mt-10 text-[15.5px] leading-[1.8] text-[var(--text-secondary)] max-w-[720px]">
        <span className="text-[var(--text-primary)] font-medium">
          Every institution needs branding. Very few need ERP on day one.
        </span>{" "}
        We start where the value is immediate.
      </p>
    </Section>
  );
}

/* ---------------- 5. Ecosystem / Roadmap ---------------- */

const phases = [
  { n: 1, name: "Brand-OS", desc: "Marketing and content automation for institutions.", status: "Live now" },
  { n: 2, name: "AI Automation Suite", desc: "WhatsApp, admissions, email, CRM and chatbots.", status: "In development" },
  { n: 3, name: "Exam-OS", desc: "Assessments, question papers, evaluation and analytics.", status: "Planned" },
  { n: 4, name: "Institution ERP", desc: "Fees, attendance, transport, HR, payroll and timetable.", status: "Planned" },
  { n: 5, name: "Student Network", desc: "Communities, careers, courses, resume and portfolio tools.", status: "Planned" },
  { n: 6, name: "Marketplace", desc: "Furniture, books, software and services bought directly through us.", status: "Planned" },
  { n: 7, name: "Education Intelligence", desc: "Admission trends, benchmarking and demand forecasting.", status: "Planned" },
];

export function Ecosystem() {
  return (
    <Section id="ecosystem" alt>
      <Heading
        eyebrow="The Ecosystem"
        title="A seven-phase build sequence, in the open"
        intro="We would rather be trusted than impressive. Here is exactly what is live, what we are building, and what comes later. Each phase compounds on the data and relationships of the one before it."
      />

      <div className="relative">
        <div
          aria-hidden
          className="absolute left-[19px] top-2 bottom-2 w-px hidden sm:block"
          style={{ background: "var(--border-mid)" }}
        />
        <div className="flex flex-col gap-4">
          {phases.map((p, i) => {
            const live = p.status === "Live now";
            const dev = p.status === "In development";
            return (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="relative sm:pl-[60px]"
              >
                <div
                  className="hidden sm:grid place-items-center absolute left-0 top-4 w-10 h-10 rounded-full text-[13px] font-semibold"
                  style={{
                    background: live ? "var(--accent)" : "var(--bg-elevated)",
                    color: live ? "#fff" : "var(--text-dim)",
                    border: `1px solid ${live ? "var(--accent)" : "var(--border-mid)"}`,
                    boxShadow: live ? "0 0 0 6px var(--accent-soft)" : "none",
                  }}
                >
                  {p.n}
                </div>
                <div
                  className="rounded-[15px] px-6 py-5 flex flex-wrap items-center gap-x-6 gap-y-2"
                  style={{
                    background: "var(--bg-elevated)",
                    border: `1px solid ${live ? "var(--border-bright)" : "var(--border-mid)"}`,
                  }}
                >
                  <div className="min-w-[220px] flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[16.5px] font-semibold text-[var(--text-primary)]">
                        Phase {p.n} · {p.name}
                      </h3>
                      {live && (
                        <span
                          className="rounded-full px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.08em] uppercase"
                          style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
                        >
                          You are here
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-[14px] text-[var(--text-secondary)]">{p.desc}</p>
                  </div>
                  <span
                    className="text-[12.5px] font-medium"
                    style={{
                      color: live ? "var(--teal)" : dev ? "var(--accent-bright)" : "var(--text-dim)",
                    }}
                  >
                    {p.status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- 6. Who We Serve ---------------- */

const audience = [
  { icon: School, title: "Schools", pain: "Parent communication, fee follow-ups and admission season creatives handled by staff who already have a full day." },
  { icon: GraduationCap, title: "Colleges & Universities", pain: "Scale and multi-department complexity — every department publishes, no one owns the brand." },
  { icon: Users, title: "Coaching Institutes", pain: "High lead volume and short admission windows where a slow response loses the enrolment." },
  { icon: Briefcase, title: "Training Institutes", pain: "Continuous batch marketing and placement storytelling with no in-house content team." },
];

export function WhoWeServe() {
  return (
    <Section id="institutions">
      <Heading
        eyebrow="Who We Serve"
        title="Built for four kinds of institution — and nothing else"
        intro="Every workflow, template and integration is designed around how Indian education institutions actually operate."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {audience.map((a) => (
          <Card key={a.title}>
            <a.icon size={22} className="text-[var(--accent-bright)]" />
            <h3 className="mt-5 text-[16.5px] font-semibold text-[var(--text-primary)]">{a.title}</h3>
            <p className="mt-2.5 text-[14px] leading-[1.7] text-[var(--text-secondary)]">{a.pain}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- 7. Why One Partner ---------------- */

const pillars = [
  { icon: ShieldCheck, title: "Built exclusively for education", body: "We do not take on retail, real-estate or generic SaaS work. The roadmap never gets diluted into unrelated industries." },
  { icon: KeyRound, title: "One login, every system", body: "As each phase ships it joins the same platform. No stitching together five vendors and reconciling their exports." },
  { icon: MapPin, title: "India-first by design", body: "GST-ready billing, WhatsApp-native communication and regional language support — not a Western product translated." },
  { icon: TrendingUp, title: "Your data compounds for you", body: "Admissions, campaigns and outcomes accumulate in one place, so the insights get sharper the longer you stay." },
];

export function WhyOnePartner() {
  return (
    <Section alt>
      <Heading
        eyebrow="Why One Partner"
        title="One partner, not ten vendors"
        intro="Choosing a technology partner for an institution is a multi-year decision. Here is what that decision buys you with us."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {pillars.map((p) => (
          <Card key={p.title}>
            <div className="flex items-start gap-4">
              <div
                className="grid place-items-center w-10 h-10 rounded-[10px] shrink-0"
                style={{ background: "var(--teal-soft)", color: "var(--teal)" }}
              >
                <p.icon size={19} />
              </div>
              <div>
                <h3 className="text-[16.5px] font-semibold text-[var(--text-primary)]">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.75] text-[var(--text-secondary)]">{p.body}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- 8. Insights ---------------- */

const insights = [
  { icon: Newspaper, tag: "Editorial", title: "EdTech News & Insights", body: "Reporting on policy, technology and admissions trends shaping Indian education." },
  { icon: Trophy, tag: "Rankings", title: "Top Digital Schools", body: "An annual recognition programme for institutions leading on digital adoption." },
  { icon: FileBarChart, tag: "Research", title: "State of Indian Education Technology", body: "Our yearly report on how institutions across India actually buy and use technology." },
];

export function Insights() {
  return (
    <Section id="insights">
      <Heading
        eyebrow="Century TechX Media"
        title="Insights"
        intro="An independent editorial arm covering the sector we serve. Research and rankings are produced separately from our product and sales teams."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {insights.map((i) => (
          <Card key={i.title}>
            <div className="flex items-center gap-3">
              <i.icon size={18} className="text-[var(--accent-bright)]" />
              <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--text-dim)]">
                {i.tag}
              </span>
            </div>
            <h3 className="mt-5 text-[16.5px] font-semibold text-[var(--text-primary)]">{i.title}</h3>
            <p className="mt-2.5 text-[14px] leading-[1.7] text-[var(--text-secondary)]">{i.body}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-[var(--text-dim)]">
              Launching soon <ArrowRight size={14} />
            </span>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- 9. Company / Vision ---------------- */

export function Company() {
  return (
    <Section id="company" alt>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start">
        <Heading eyebrow="Company" title="Where we are going, stated plainly" />
        <div className="flex flex-col gap-6">
          <div
            className="rounded-[16px] p-7"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-mid)" }}
          >
            <div className="text-[12px] font-medium tracking-[0.14em] uppercase text-[var(--accent-bright)]">
              Vision
            </div>
            <p className="mt-3 text-[17px] leading-[1.75] text-[var(--text-primary)]">
              Become India's largest technology ecosystem exclusively serving educational institutions.
            </p>
          </div>
          <div
            className="rounded-[16px] p-7"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-mid)" }}
          >
            <div className="text-[12px] font-medium tracking-[0.14em] uppercase text-[var(--teal)]">
              Mission
            </div>
            <p className="mt-3 text-[17px] leading-[1.75] text-[var(--text-primary)]">
              Empower every educational institution with affordable, intelligent, integrated technology.
            </p>
          </div>
          <div
            className="rounded-[16px] p-7"
            style={{
              background: "linear-gradient(120deg, rgba(79,107,255,0.12), rgba(45,212,191,0.08))",
              border: "1px solid var(--border-bright)",
            }}
          >
            <p className="text-[16px] leading-[1.8] text-[var(--text-secondary)]">
              Not an ERP company. Not a marketing agency. Not a software company.
            </p>
            <p className="mt-2 text-[19px] font-semibold text-[var(--text-primary)]">
              The Operating System for Education.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
