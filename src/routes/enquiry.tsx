import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CornerBrackets } from "@/components/hud/CornerBrackets";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: "Submit an Enquiry — Century TechX" },
      { name: "description", content: "Send us your project enquiry. We respond within 24 hours with a tailored plan." },
      { property: "og:title", content: "Submit an Enquiry — Century TechX" },
      { property: "og:description", content: "Send us your project enquiry. We respond within 24 hours." },
    ],
  }),
  component: EnquiryPage,
});

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type FormStatus = "idle" | "loading";

function EnquiryPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = enquirySchema.safeParse({ name, email, message });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setStatus("loading");
    const payload = {
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    };
    console.log("[Enquiry] Submitting payload:", payload);
    const { data, error } = await supabase.from("enquiries").insert(payload).select();
    console.log("[Enquiry] Supabase response:", { data, error });
    setStatus("idle");

    if (error) {
      toast.error(`Submission failed — ${error.message}`);
      return;
    }

    toast.success("Enquiry received! We'll respond within 24 hours.");
    setName("");
    setEmail("");
    setMessage("");
  };

  const inputStyle: React.CSSProperties = {
    background: "#FFFFFF",
    border: "1px solid rgba(37,99,235,0.12)",
    borderRadius: 3,
    color: "#000000",
    caretColor: "#000000",
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    padding: "14px 16px",
    width: "100%",
    outline: "none",
    transition: "all 0.2s",
  };

  return (
    <main className="min-h-screen px-5 md:px-8 py-24 md:py-32" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[720px] mx-auto">
        <SectionHeader
          eyebrow="// MISSION INTAKE — ENQUIRY"
          title="SUBMIT AN ENQUIRY"
          subtitle="Tell us about your project. We'll respond within 24 hours with a tailored plan."
        />

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[4px] p-8 md:p-10 mt-8"
          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-mid)" }}
        >
          <CornerBrackets size={16} color="#2563EB" />

          <div className="flex items-center justify-between mb-7 pb-4 border-b border-[var(--border-dark)]">
            <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--neon)]">
              // ENQUIRY.FORM
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-[var(--text-secondary)]">
              <span
                className="w-[6px] h-[6px] rounded-full"
                style={{ background: "#00FF88", boxShadow: "0 0 6px #00FF88" }}
              />
              READY
            </span>
          </div>

          <div className="space-y-5">
            <div>
              <label className="font-mono text-[10px] tracking-[0.18em] text-[var(--neon)] block mb-2">
                // OPERATIVE_NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="font-mono text-[10px] tracking-[0.18em] text-[var(--neon)] block mb-2">
                // COMMS_CHANNEL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                style={inputStyle}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[10px] tracking-[0.18em] text-[var(--neon)]">
                  // PAYLOAD
                </label>
                <span className="font-mono text-[9px] text-[var(--text-dim)]">
                  {message.length}/2000
                </span>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 2000))}
                placeholder="Describe your project, timeline, and goals..."
                rows={6}
                maxLength={2000}
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full font-orbitron font-bold text-[12px] tracking-[0.15em] px-6 rounded-[3px] transition-all duration-200 disabled:opacity-60"
              style={{ background: "#2563EB", color: "#FFFFFF", padding: "18px" }}
            >
              {status === "loading" ? "TRANSMITTING //" : "SUBMIT ENQUIRY //"}
            </button>

            <p className="font-mono text-[9px] tracking-[0.18em] text-[var(--text-dim)] text-center">
              // ENCRYPTED · BOT-SHIELDED · SECURE TRANSMISSION
            </p>
          </div>
        </motion.form>
      </div>
    </main>
  );
}
