import { motion } from "framer-motion";
import { SectionHeader } from "@/components/site/SectionHeader";
import { HUDCard } from "@/components/hud/HUDCard";

const COLLAB = [
  {
    icon: "🚀",
    title: "BUILD YOUR PRODUCT",
    sub: "Project · Fixed scope",
    body: "You have an idea or vision. We take it from zero to a live, working SaaS product — with full IP ownership transferred to you.",
    features: [
      "Full-stack development from scratch",
      "Fixed pricing, no hidden charges",
      "You own 100% of the code & IP",
      "Timeline guaranteed in contract",
    ],
    accent: "#F5A623",
  },
  {
    icon: "🤝",
    title: "SCALE TOGETHER",
    sub: "Retainer · Ongoing partnership",
    body: "After launch, we stay in as your dedicated tech team — shipping features, fixing issues, and growing the product with you.",
    features: [
      "Monthly feature sprints",
      "Priority support & bug fixes",
      "Performance monitoring",
      "Strategy calls as needed",
    ],
    accent: "#00D4E8",
  },
  {
    icon: "⚡",
    title: "AUGMENT YOUR TEAM",
    sub: "Staff augmentation · Dev bandwidth",
    body: "Already have a team but need more hands? Plug our developers directly into your workflow and ship faster.",
    features: [
      "Dedicated devs on your stack",
      "Work in your tools & processes",
      "Flexible monthly engagement",
      "No long-term lock-in",
    ],
    accent: "#7B5EA7",
  },
  {
    icon: "💡",
    title: "CO-BUILD & CO-OWN",
    sub: "Venture model · Equity partnership",
    body: "Have a strong idea but limited budget? We co-build in exchange for equity — skin in the game, together.",
    features: [
      "Reduced upfront development cost",
      "Century TechX as technical co-founder",
      "Shared growth incentive",
      "Selective, high-conviction only",
    ],
    accent: "#C9A84C",
  },
];

export function Collaboration() {
  return (
    <section
      className="relative py-24 md:py-32 px-5 md:px-8"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          eyebrow="// ENGAGEMENT PROTOCOLS"
          title="HOW WE WORK WITH YOU"
          subtitle="Century TechX operates as a long-term tech partner, not a one-time vendor."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COLLAB.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <HUDCard accent={c.accent} topBar={8} bracketSize={14} className="h-full" style={{ minHeight: 280 }}>
                <div className="p-9 pt-12 relative">
                  <div className="flex items-start gap-4 mb-2">
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-[4px] text-2xl shrink-0"
                      style={{
                        background: `${c.accent}1A`,
                        border: `1px solid ${c.accent}30`,
                      }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <h3 className="font-orbitron font-bold text-[18px] text-[var(--text-primary)] leading-tight">
                        {c.title}
                      </h3>
                      <div className="font-mono text-[10px] tracking-[0.15em] mt-1" style={{ color: c.accent }}>
                        {c.sub}
                      </div>
                    </div>
                  </div>

                  <p className="font-inter font-light text-[14px] leading-[1.75] text-[var(--text-secondary)] mt-5 mb-6">
                    {c.body}
                  </p>

                  <ul className="space-y-2">
                    {c.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[13px] font-inter text-[var(--text-primary)]">
                        <span className="font-mono pt-[2px]" style={{ color: c.accent }}>&gt;</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </HUDCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
