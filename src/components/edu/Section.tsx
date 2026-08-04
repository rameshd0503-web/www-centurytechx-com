import { ReactNode } from "react";
import { motion } from "framer-motion";

export function Section({
  id,
  alt,
  children,
}: {
  id?: string;
  alt?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="px-5 md:px-8 py-24 md:py-28"
      style={{
        background: alt ? "var(--bg-surface)" : "var(--bg-primary)",
        borderTop: "1px solid var(--border-dark)",
      }}
    >
      <div className="max-w-[1160px] mx-auto">{children}</div>
    </section>
  );
}

export function Heading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className={`max-w-[720px] mb-14 ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <div className="text-[12px] font-medium tracking-[0.14em] uppercase text-[var(--accent-bright)]">
        {eyebrow}
      </div>
      <h2
        className="mt-4 font-semibold tracking-[-0.03em]"
        style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", lineHeight: 1.15, color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-[16.5px] leading-[1.75] text-[var(--text-secondary)]">{intro}</p>
      )}
    </motion.div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={`rounded-[16px] p-7 transition-colors duration-300 hover:border-[var(--border-bright)] ${className}`}
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-mid)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {children}
    </motion.div>
  );
}
