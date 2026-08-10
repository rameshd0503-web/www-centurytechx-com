import { ReactNode } from "react";
import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="block text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
      {children}
    </span>
  );
}

/**
 * Headline where a single word is italic + orange, matching the reference style.
 * Pass the full text and the word to accent.
 */
export function Headline({
  text,
  accentWord,
  className = "",
  as: Tag = "h2",
}: {
  text: string;
  accentWord: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  const parts = text.split(accentWord);
  return (
    <Tag
      className={`font-extrabold tracking-[-0.03em] text-[var(--text-primary)] ${className}`}
      style={{ lineHeight: 1.05 }}
    >
      {parts[0]}
      <em className="italic text-[var(--accent)]">{accentWord}</em>
      {parts.slice(1).join(accentWord)}
    </Tag>
  );
}

export function SectionHead({
  eyebrow,
  title,
  accentWord,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  accentWord: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "text-center mx-auto max-w-[720px]" : "max-w-[720px]"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Headline
        text={title}
        accentWord={accentWord}
        className="mt-4 text-[clamp(2rem,4.4vw,3.35rem)]"
      />
      {intro ? (
        <p className="mt-5 text-[16.5px] leading-[1.75] text-[var(--text-secondary)]">{intro}</p>
      ) : null}
    </Reveal>
  );
}

export function Section({
  id,
  children,
  tinted = false,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  tinted?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`px-5 md:px-8 py-20 md:py-28 ${className}`}
      style={{ background: tinted ? "var(--bg-surface)" : "var(--bg-primary)" }}
    >
      <div className="max-w-[1180px] mx-auto">{children}</div>
    </section>
  );
}

export function SoftCard({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-[18px] p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 ${className}`}
      style={{
        background: dark ? "var(--card-dark)" : "#FFFFFF",
        border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--border-dark)",
        boxShadow: "var(--shadow-card)",
        color: dark ? "#F5F6F8" : "var(--text-primary)",
      }}
    >
      {children}
    </div>
  );
}
