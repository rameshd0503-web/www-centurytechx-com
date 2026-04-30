import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CornerBrackets } from "@/components/hud/CornerBrackets";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const CONTACTS = [
  {
    icon: Phone,
    label: "// COMMS CHANNEL",
    value: "+91 80730 92082",
    sub: "Mon–Sat, 9AM–6PM IST",
    href: "tel:+918073092082",
  },
  {
    icon: Mail,
    label: "// SECURE UPLINK",
    value: "info@centurytechx.com",
    sub: "We respond within 24 hours",
    href: "mailto:info@centurytechx.com",
  },
  {
    icon: Globe,
    label: "// NETWORK",
    value: "centurytechx.in",
    sub: "Live · 24/7 uptime",
    href: "https://centurytechx.in",
  },
];

// Mirrors the database CHECK constraints
const contactSchema = z.object({
  name: z.string().trim().min(1, "Operative name is required").max(100, "Name must be 100 characters or fewer"),
  email: z.string().trim().email("Enter a valid email address").max(255, "Email must be 255 characters or fewer"),
  phone: z.string().trim().max(50, "Phone must be 50 characters or fewer").optional(),
  message: z.string().trim().min(1, "Mission payload is required").max(2000, "Message must be 2000 characters or fewer"),
});

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const parsed = contactSchema.safeParse({ name, email, phone: phone || undefined, message });
    if (!parsed.success) {
      setStatus("error");
      setErrorMsg(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setStatus("loading");
    const { error } = await supabase.from("contacts").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      message: parsed.data.message,
    });

    if (error) {
      setStatus("error");
      setErrorMsg("Transmission failed — please try again in a moment.");
      return;
    }

    setStatus("success");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    window.setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 px-5 md:px-8"
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid rgba(37,99,235,0.25)",
        borderBottom: "1px solid rgba(37,99,235,0.25)",
        boxShadow: "0 -20px 60px rgba(37,99,235,0.04), 0 20px 60px rgba(37,99,235,0.04)",
      }}
    >
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          eyebrow="// MISSION CONTROL — CONTACT"
          title="HAVE A MISSION?"
          subtitle="Drop your coordinates below. We'll map the plan, price it fairly, and build it right."
        />
        <div className="text-center -mt-10 mb-16">
          <span className="font-orbitron font-bold text-[var(--neon)] text-glow-neon" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
            // LET&apos;S BUILD IT.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="space-y-4">
            {CONTACTS.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative block rounded-[4px] p-6 px-7 transition-all duration-200 hover:-translate-y-[2px]"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-dark)",
                  borderLeft: "3px solid #2563EB",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderLeftColor = "#3B82F6";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,99,235,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderLeftColor = "#2563EB";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <CornerBrackets size={8} color="#2563EB" />
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-[3px] shrink-0"
                    style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}
                  >
                    <c.icon size={18} className="text-[var(--neon)]" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.18em] text-[var(--text-dim)] mb-2">
                      {c.label}
                    </div>
                    <div className="font-orbitron font-bold text-[var(--neon)]" style={{ fontSize: "1.1rem" }}>
                      {c.value}
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.1em] text-[var(--text-secondary)] mt-2">
                      {c.sub}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Address card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="relative rounded-[4px] p-6 px-7"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-dark)",
                borderLeft: "3px solid #2563EB",
              }}
            >
              <CornerBrackets size={8} color="#2563EB" />
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-[3px] shrink-0"
                  style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}
                >
                  <MapPin size={18} className="text-[var(--neon)]" />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.18em] text-[var(--text-dim)] mb-2">
                    // COORDINATES — HQ
                  </div>
                  <address className="not-italic font-mono text-[13px] leading-[1.6] text-[var(--text-primary)]">
                    Plot No. 119, KIADB Industrial Area<br />
                    1st Phase, Vasanthanarasapura<br />
                    Industrial Area, Tumkur — 572 137<br />
                    Karnataka, India 🇮🇳
                  </address>
                  <div className="font-mono text-[10px] tracking-[0.1em] text-[var(--text-secondary)] mt-3">
                    Registered office &amp; tech hub
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — FORM */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[4px] p-8 md:p-10"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-mid)",
            }}
          >
            <CornerBrackets size={16} color="#2563EB" />

            <div className="flex items-center justify-between mb-7 pb-4 border-b border-[var(--border-dark)]">
              <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--neon)]">
                // SECURE_UPLINK.FORM
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-[var(--text-secondary)]">
                <span
                  className="w-[6px] h-[6px] rounded-full"
                  style={{ background: "#00FF88", boxShadow: "0 0 6px #00FF88", animation: "blink 1.4s steps(2) infinite" }}
                />
                READY
              </span>
            </div>

            <div className="space-y-5">
              <Field label="// OPERATIVE_NAME" value={name} onChange={setName} placeholder="Your full name" />
              <Field label="// COMMS_CHANNEL" value={email} onChange={setEmail} placeholder="you@domain.com" type="email" />
              <Field label="// PHONE_LINK (OPTIONAL)" value={phone} onChange={setPhone} placeholder="+91 80730 92082" type="tel" />
              <Field
                label="// PAYLOAD"
                value={message}
                onChange={setMessage}
                placeholder="Brief mission description — what are we building?"
                textarea
                maxLength={1000}
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full font-orbitron font-bold text-[12px] tracking-[0.15em] px-6 rounded-[3px] transition-all duration-200 disabled:opacity-60"
                style={{
                  background: status === "success" ? "#00AA44" : "#2563EB",
                  color: "#FFFFFF",
                  padding: "18px",
                }}
                onMouseEnter={(e) => {
                  if (status !== "loading" && status !== "success") {
                    e.currentTarget.style.background = "#3B82F6";
                    e.currentTarget.style.boxShadow = "0 0 30px rgba(37,99,235,0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (status !== "success") {
                    e.currentTarget.style.background = "#2563EB";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {status === "loading" && "TRANSMITTING //"}
                {status === "success" && "✓ TRANSMITTED //"}
                {status === "error" && "RETRY TRANSMISSION //"}
                {status === "idle" && "TRANSMIT MESSAGE //"}
              </button>

              {status === "error" && errorMsg && (
                <div
                  role="alert"
                  className="font-mono text-[11px] tracking-[0.05em] px-4 py-3 rounded-[3px]"
                  style={{
                    background: "rgba(255,45,85,0.08)",
                    border: "1px solid rgba(255,45,85,0.35)",
                    color: "#FF2D55",
                  }}
                >
                  ⚠ {errorMsg}
                </div>
              )}

              {status === "success" && (
                <div
                  role="status"
                  className="font-mono text-[11px] tracking-[0.05em] px-4 py-3 rounded-[3px]"
                  style={{
                    background: "rgba(0,255,136,0.06)",
                    border: "1px solid rgba(0,255,136,0.30)",
                    color: "#00FF88",
                  }}
                >
                  ✓ Message received. We'll respond within 24 hours.
                </div>
              )}

              <p className="font-mono text-[9px] tracking-[0.18em] text-[var(--text-dim)] text-center">
                // ENCRYPTED · BOT-SHIELDED · SECURE TRANSMISSION
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  maxLength?: number;
}

function Field({ label, value, onChange, placeholder, type = "text", textarea, maxLength }: FieldProps) {
  const baseStyle = {
    background: "rgba(37,99,235,0.03)",
    border: "1px solid rgba(37,99,235,0.12)",
    borderRadius: 3,
    color: "#FFFFFF",
    caretColor: "#3B82F6",
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    padding: "14px 16px",
    width: "100%",
    outline: "none",
    transition: "all 0.2s",
  } as React.CSSProperties;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="font-mono text-[10px] tracking-[0.18em] text-[var(--neon)]">
          {label}
        </label>
        {textarea && maxLength && (
          <span className="font-mono text-[9px] text-[var(--text-dim)]">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength ?? 1000))}
          placeholder={placeholder}
          rows={5}
          maxLength={maxLength}
          style={baseStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#2563EB";
            e.currentTarget.style.boxShadow = "0 0 0 2px rgba(37,99,235,0.12)";
            e.currentTarget.style.background = "rgba(37,99,235,0.05)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(37,99,235,0.12)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.background = "rgba(37,99,235,0.03)";
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={baseStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#2563EB";
            e.currentTarget.style.boxShadow = "0 0 0 2px rgba(37,99,235,0.12)";
            e.currentTarget.style.background = "rgba(37,99,235,0.05)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(37,99,235,0.12)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.background = "rgba(37,99,235,0.03)";
          }}
        />
      )}
    </div>
  );
}
