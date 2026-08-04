import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Section, Heading } from "@/components/edu/Section";
import { ArrowRight, Loader2 } from "lucide-react";

const institutionTypes = [
  "School",
  "College / University",
  "Coaching Institute",
  "Training Institute",
  "Other",
];

const inputStyle: React.CSSProperties = {
  background: "var(--bg-primary)",
  border: "1px solid var(--border-mid)",
  color: "var(--text-primary)",
};

export function DemoCTA() {
  const [institution, setInstitution] = useState("");
  const [type, setType] = useState(institutionTypes[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const composed = [
      `Institution: ${institution}`,
      `Type: ${type}`,
      phone ? `Phone: ${phone}` : null,
      "",
      message || "(No additional details provided)",
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await supabase.from("enquiries").insert({
      name: name.trim(),
      email: email.trim(),
      message: composed,
    });

    setLoading(false);

    if (error) {
      toast.error("We couldn't submit your request. Please try again.");
      return;
    }

    toast.success("Demo request received — we'll be in touch within one working day.");
    setInstitution("");
    setType(institutionTypes[0]);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <Section id="contact">
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <div>
          <Heading
            eyebrow="Get Started"
            title="See the Operating System for Education"
            intro="Tell us about your institution and we'll walk you through Brand-OS live, then map where the rest of the ecosystem fits your calendar."
          />
          <ul className="flex flex-col gap-3 -mt-6">
            {[
              "30-minute working demo, not a slide deck",
              "Built around your admission cycle",
              "No obligation, no vendor lock-in pitch",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3 text-[14.5px] text-[var(--text-secondary)]">
                <span
                  className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--teal)" }}
                />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-[18px] p-7 md:p-8 flex flex-col gap-4"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-mid)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Institution name">
              <input
                required
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="Sunrise Public School"
                className="w-full rounded-[10px] px-4 py-3 text-[14.5px] outline-none focus:border-[var(--accent)]"
                style={inputStyle}
              />
            </Field>
            <Field label="Institution type">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-[10px] px-4 py-3 text-[14.5px] outline-none focus:border-[var(--accent)]"
                style={inputStyle}
              >
                {institutionTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full rounded-[10px] px-4 py-3 text-[14.5px] outline-none focus:border-[var(--accent)]"
                style={inputStyle}
              />
            </Field>
            <Field label="Phone">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 00000 00000"
                className="w-full rounded-[10px] px-4 py-3 text-[14.5px] outline-none focus:border-[var(--accent)]"
                style={inputStyle}
              />
            </Field>
          </div>

          <Field label="Work email">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@institution.edu.in"
              className="w-full rounded-[10px] px-4 py-3 text-[14.5px] outline-none focus:border-[var(--accent)]"
              style={inputStyle}
            />
          </Field>

          <Field label="What would you like to solve first?">
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Admission season creatives, parent communication, exam workflows…"
              className="w-full rounded-[10px] px-4 py-3 text-[14.5px] outline-none resize-none focus:border-[var(--accent)]"
              style={inputStyle}
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-[11px] px-6 py-3.5 text-[14px] font-semibold text-white transition-all duration-200 hover:brightness-110 disabled:opacity-60"
            style={{ background: "var(--accent)", boxShadow: "0 10px 26px var(--neon-glow)" }}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            {loading ? "Sending…" : "Book a Demo"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12.5px] font-medium text-[var(--text-secondary)]">{label}</span>
      {children}
    </label>
  );
}
