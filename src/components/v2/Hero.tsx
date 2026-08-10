import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Bot, ClipboardCheck, Building2, LineChart } from "lucide-react";
import { Eyebrow, Headline } from "./Primitives";

const cards = [
  {
    title: "Brand-OS",
    desc: "AI-powered branding & marketing automation for institutions",
    icon: Sparkles,
    badge: "LIVE",
    live: true,
  },
  {
    title: "AI Automation Suite",
    desc: "WhatsApp, admissions, and CRM automation",
    icon: Bot,
    badge: "SOLUTION",
    live: false,
  },
  {
    title: "Exam-OS",
    desc: "Assessment, evaluation, and analytics",
    icon: ClipboardCheck,
    badge: "SOLUTION",
    live: false,
  },
  {
    title: "Institution ERP",
    desc: "Fees, attendance, transport, payroll — one system",
    icon: Building2,
    badge: "SOLUTION",
    live: false,
  },
  {
    title: "Education Intelligence",
    desc: "Admission trends & benchmarking",
    icon: LineChart,
    badge: "ROADMAP",
    live: false,
  },
];

export function Hero() {
  const [active, setActive] = useState(1);
  const count = cards.length;

  return (
    <section id="top" className="relative overflow-hidden pt-[130px] md:pt-[150px] pb-20 px-5 md:px-8">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(900px 460px at 50% -10%, rgba(232,148,15,0.16), transparent 70%)",
        }}
      />

      <div className="relative max-w-[1180px] mx-auto grid gap-14 lg:grid-cols-[0.85fr_1.15fr] items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow>Ecosystem</Eyebrow>
          <Headline
            as="h1"
            text="Featured Solutions"
            accentWord="Solutions"
            className="mt-4 text-[clamp(2.6rem,5.6vw,4.2rem)]"
          />
          <p className="mt-4 italic text-[15px] text-[var(--text-dim)]">Hover to explore</p>
          <p className="mt-5 max-w-[460px] text-[16.5px] leading-[1.75] text-[var(--text-secondary)]">
            Each panel is a live or upcoming product in the Century TechX ecosystem. Pick one to see
            how it works.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#roadmap"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold text-white transition-all duration-200 active:scale-95"
              style={{ background: "var(--card-dark)" }}
            >
              View All Solutions
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>

        {/* Fanned card deck */}
        <div className="relative">
          <div
            className="relative mx-auto h-[420px] md:h-[460px] w-full max-w-[620px]"
            style={{ perspective: "1400px" }}
            onMouseLeave={() => setActive(1)}
          >
            {cards.map((c, i) => {
              const offset = i - (count - 1) / 2;
              const isActive = i === active;
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  tabIndex={0}
                  className="deck-card absolute left-1/2 top-1/2 w-[240px] md:w-[262px] h-[330px] md:h-[350px] rounded-[20px] p-6 flex flex-col cursor-pointer outline-none"
                  style={{
                    background: isActive ? "var(--card-dark)" : "#FFFFFF",
                    color: isActive ? "#FFFFFF" : "var(--text-primary)",
                    border: isActive
                      ? "1px solid rgba(255,255,255,0.10)"
                      : "1px solid var(--border-dark)",
                    boxShadow: isActive
                      ? "0 26px 60px rgba(20,24,31,0.28)"
                      : "0 10px 30px rgba(20,24,31,0.10)",
                    zIndex: isActive ? 30 : 10 - Math.abs(offset),
                    transform: `translate(-50%, -50%) translateX(${offset * 112}px) translateY(${
                      isActive ? -18 : Math.abs(offset) * 16
                    }px) rotate(${isActive ? 0 : offset * 7}deg) scale(${isActive ? 1.06 : 1})`,
                    transition: "transform 300ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms ease, background 300ms ease",
                  }}
                >
                  <span
                    className="self-start rounded-full px-2.5 py-1 text-[9.5px] font-bold tracking-[0.16em]"
                    style={{
                      background: c.live ? "var(--accent)" : isActive ? "rgba(255,255,255,0.12)" : "var(--accent-soft)",
                      color: c.live ? "#FFFFFF" : isActive ? "#FFFFFF" : "var(--accent)",
                    }}
                  >
                    {c.badge}
                  </span>

                  <div
                    className="mt-6 w-12 h-12 rounded-[14px] grid place-items-center"
                    style={{
                      background: isActive ? "rgba(255,255,255,0.10)" : "var(--accent-soft)",
                      color: "var(--accent)",
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <h3
                    className="mt-auto text-[19px] font-extrabold tracking-[-0.02em]"
                    style={{ color: isActive ? "#FFFFFF" : "var(--text-primary)" }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="mt-2 text-[13px] leading-[1.6]"
                    style={{ color: isActive ? "rgba(255,255,255,0.66)" : "var(--text-secondary)" }}
                  >
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {cards.map((c, i) => (
              <button
                key={c.title}
                aria-label={`Show ${c.title}`}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === active ? 22 : 8,
                  height: 8,
                  background: i === active ? "var(--accent)" : "rgba(20,24,31,0.18)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
