import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Bot, ClipboardCheck, Building2, LineChart } from "lucide-react";
import { Eyebrow, Headline } from "./Primitives";

const cards = [
  {
    title: "Brand-OS",
    desc: "AI-powered branding & marketing automation for institutions",
    icon: Sparkles,
    badge: "LIVE",
    live: true,
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=640&q=70",
    alt: "Marketing team reviewing campaign designs",
  },
  {
    title: "AI Automation Suite",
    desc: "WhatsApp, admissions, and CRM automation",
    icon: Bot,
    badge: "SOLUTION",
    live: false,
    img: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=640&q=70",
    alt: "Phone showing chat conversation automation",
  },
  {
    title: "Exam-OS",
    desc: "Assessment, evaluation, and analytics",
    icon: ClipboardCheck,
    badge: "SOLUTION",
    live: false,
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=640&q=70",
    alt: "Students writing an examination",
  },
  {
    title: "Institution ERP",
    desc: "Fees, attendance, transport, payroll — one system",
    icon: Building2,
    badge: "SOLUTION",
    live: false,
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=640&q=70",
    alt: "Administration office workspace",
  },
  {
    title: "Education Intelligence",
    desc: "Admission trends & benchmarking",
    icon: LineChart,
    badge: "ROADMAP",
    live: false,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=640&q=70",
    alt: "Analytics dashboard with charts",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const [active, setActive] = useState(1);
  const count = cards.length;
  const reduce = useReducedMotion();
  const touchX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 40) return;
    setActive((a) => Math.min(count - 1, Math.max(0, a + (dx < 0 ? 1 : -1))));
  };

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
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Eyebrow>Ecosystem</Eyebrow>
          <Headline
            as="h1"
            text="Featured Solutions"
            accentWord="Solutions"
            className="mt-4 text-[clamp(2.6rem,5.6vw,4.2rem)]"
          />
          <p className="mt-4 italic text-[15px] text-[var(--text-dim)]">
            Hover to explore <span className="md:hidden">— swipe on mobile</span>
          </p>
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
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </motion.div>

        {/* Fanned card deck */}
        <div className="relative">
          <div
            className="relative mx-auto h-[420px] md:h-[460px] w-full max-w-[620px] touch-pan-y"
            style={{ perspective: "1400px" }}
            onMouseLeave={() => setActive(1)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {cards.map((c, i) => {
              const offset = i - (count - 1) / 2;
              const isActive = i === active;
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  tabIndex={0}
                  initial={
                    reduce
                      ? false
                      : { opacity: 0, x: "-50%", y: "-30%", rotate: 0, scale: 0.94 }
                  }
                  animate={{
                    opacity: isActive ? 1 : 0.86,
                    x: `calc(-50% + ${offset * 112}px)`,
                    y: `calc(-50% + ${isActive ? -18 : Math.abs(offset) * 16}px)`,
                    rotate: isActive ? 0 : offset * 7,
                    scale: isActive ? 1.06 : 0.98,
                  }}
                  transition={{
                    duration: reduce ? 0 : 0.34,
                    ease: EASE,
                    delay: reduce ? 0 : i * 0.09,
                    opacity: { duration: reduce ? 0 : 0.3, delay: reduce ? 0 : i * 0.09 },
                  }}
                  className="deck-card absolute left-1/2 top-1/2 w-[240px] md:w-[262px] h-[330px] md:h-[350px] rounded-[20px] overflow-hidden flex flex-col cursor-pointer outline-none"
                  style={{
                    background: "var(--card-dark)",
                    color: "#FFFFFF",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow: isActive
                      ? "0 26px 60px rgba(20,24,31,0.30), 0 0 0 1px rgba(249,115,22,0.25), 0 18px 48px rgba(249,115,22,0.32)"
                      : "0 10px 30px rgba(20,24,31,0.14)",
                    zIndex: isActive ? 30 : 10 - Math.abs(offset),
                  }}
                >
                  {/* image */}
                  <div className="relative w-full h-[178px] md:h-[190px] shrink-0 overflow-hidden bg-[#1b2029]">
                    <img
                      src={c.img}
                      alt={c.alt}
                      loading="lazy"
                      width={640}
                      height={420}
                      className="w-full h-full object-cover transition-transform duration-[900ms] ease-out"
                      style={{ transform: isActive && !reduce ? "scale(1.05)" : "scale(1)" }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(20,24,31,0.20) 0%, rgba(20,24,31,0.55) 55%, var(--card-dark) 100%)",
                      }}
                    />

                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={`${c.title}-${isActive}`}
                        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
                        className="absolute top-4 left-4 rounded-full px-2.5 py-1 text-[9.5px] font-bold tracking-[0.16em]"
                        style={{
                          background: c.live ? "var(--accent)" : "rgba(255,255,255,0.16)",
                          color: "#FFFFFF",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        {c.badge}
                      </motion.span>
                    </AnimatePresence>

                    <div
                      className="absolute -bottom-5 left-5 w-12 h-12 rounded-[14px] grid place-items-center"
                      style={{
                        background: "rgba(255,255,255,0.10)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        backdropFilter: "blur(8px)",
                        color: "var(--accent)",
                        boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
                      }}
                    >
                      <Icon size={22} />
                    </div>
                  </div>

                  <div className="mt-auto p-6 pt-8">
                    <h3 className="text-[19px] font-extrabold tracking-[-0.02em] text-white">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.6] text-white/70">{c.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {cards.map((c, i) => (
              <button
                key={c.title}
                aria-label={`Show ${c.title}`}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-200 ease-in-out"
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
