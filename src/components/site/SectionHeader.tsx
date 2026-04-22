import { ReactNode } from "react";
import { motion } from "framer-motion";
import { GlitchText } from "@/components/hud/GlitchText";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  titleColor?: string;
  glitch?: boolean;
  children?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  titleColor = "var(--text-primary)",
  glitch = true,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col gap-4 max-w-3xl mb-16 ${alignClass}`}
    >
      <span className="font-mono text-[11px] tracking-[0.25em] text-[var(--neon)]">
        {eyebrow}
      </span>
      <h2
        className="font-orbitron font-bold leading-[1.05] tracking-[-0.02em]"
        style={{
          fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
          color: titleColor,
        }}
      >
        {glitch ? <GlitchText text={title} intensity="low" /> : title}
      </h2>
      {subtitle && (
        <p className="font-inter font-light text-[16px] leading-[1.7] text-[var(--text-secondary)] max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
