import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, Mail, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Section, Eyebrow, Headline, Reveal } from "./Primitives";

const schema = z.object({
  institution: z.string().trim().min(1, "Institution name is required").max(150),
  name: z.string().trim().min(1, "Contact name is required").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(50).optional(),
  type: z.string(),
  message: z.string().trim().max(2000).optional(),
});

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#FFFFFF",
  border: "1px solid var(--border-mid)",
  borderRadius: 12,
  padding: "13px 15px",
  fontSize: 14.5,
  color: "var(--text-primary)",
  outline: "none",
  transition: "border-color .2s ease, box-shadow .2s ease",
};

function focusOn(e: React.FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = "var(--accent)";
  e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-soft)";
}
function focusOff(e: React.FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = "var(--border-mid)";
  e.currentTarget.style.boxShadow = "none";
}

const details = [
  { icon: Phone, label: "Phone", value: "+91 80730 92082", href: "tel:+918073092082" },
  { icon: Mail, label: "Email", value: "info@centurytechx.com", href: "mailto:info@centurytechx.com" },
];

export function DemoContact() {
  const [form, setForm] = useState({
    institution: "",
    name: "",
    email: "",
    phone: "",
    type: "School",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contacts").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: `Institution: ${parsed.data.institution}\nType: ${parsed.data.type}\n\n${parsed.data.message ?? ""}`,
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again or email us directly.");
      return;
    }
    toast.success("Demo request received — we'll be in touch within 24 hours.");
    setForm({ institution: "", name: "", email: "", phone: "", type: "School", message: "" });
  };

  return (
    <Section id="contact" tinted>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Eyebrow>Book a Demo</Eyebrow>
          <Headline
            text="See the ecosystem live"
            accentWord="live"
            className="mt-4 text-[clamp(2rem,4.2vw,3.1rem)]"
          />
          <p className="mt-5 text-[16.5px] leading-[1.75] text-[var(--text-secondary)] max-w-[440px]">
            Tell us about your institution. We'll map your current stack, show you Brand-OS in action,
            and give you a phased plan — no obligation.
          </p>

          <div className="mt-9 flex flex-col gap-4">
            {details.map((d) => (
              <a key={d.label} href={d.href} className="flex items-center gap-3.5 group">
                <span
                  className="w-10 h-10 rounded-[12px] grid place-items-center shrink-0"
                  style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                >
                  <d.icon size={17} />
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-[var(--text-dim)]">
                    {d.label}
                  </span>
                  <span className="block text-[15px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {d.value}
                  </span>
                </span>
              </a>
            ))}
            <div className="flex items-start gap-3.5">
              <span
                className="w-10 h-10 rounded-[12px] grid place-items-center shrink-0"
                style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
              >
                <MapPin size={17} />
              </span>
              <address className="not-italic text-[14px] leading-[1.65] text-[var(--text-secondary)]">
                Plot No. 119, KIADB Industrial Area, 1st Phase,
                <br />
                Vasanthanarasapura, Tumkur — 572 137, Karnataka, India
              </address>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            onSubmit={onSubmit}
            className="rounded-[20px] p-7 md:p-9"
            style={{
              background: "#FFFFFF",
              border: "1px solid var(--border-dark)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Labeled id="d-institution" label="Institution name">
                <input id="d-institution" style={inputStyle} value={form.institution} onChange={set("institution")} onFocus={focusOn} onBlur={focusOff} placeholder="Sunrise Public School" />
              </Labeled>
              <Labeled id="d-name" label="Contact name">
                <input id="d-name" style={inputStyle} value={form.name} onChange={set("name")} onFocus={focusOn} onBlur={focusOff} placeholder="Your full name" />
              </Labeled>
              <Labeled id="d-email" label="Email">
                <input id="d-email" type="email" style={inputStyle} value={form.email} onChange={set("email")} onFocus={focusOn} onBlur={focusOff} placeholder="you@institution.edu" />
              </Labeled>
              <Labeled id="d-phone" label="Phone">
                <input id="d-phone" type="tel" style={inputStyle} value={form.phone} onChange={set("phone")} onFocus={focusOn} onBlur={focusOff} placeholder="+91 80730 92082" />
              </Labeled>
              <div className="sm:col-span-2">
                <Labeled id="d-type" label="Institution type">
                  <select id="d-type" style={inputStyle} value={form.type} onChange={set("type")} onFocus={focusOn} onBlur={focusOff}>
                    {["School", "College & University", "Coaching Institute", "Training Institute"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Labeled>
              </div>
              <div className="sm:col-span-2">
                <Labeled id="d-message" label="What would you like to fix first?">
                  <textarea id="d-message" rows={4} style={inputStyle} value={form.message} onChange={set("message")} onFocus={focusOn} onBlur={focusOff} placeholder="Admissions follow-up, website, exams…" />
                </Labeled>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full py-3.5 text-[14.5px] font-semibold text-white transition-all duration-200 active:scale-[0.98] hover:brightness-110 disabled:opacity-60"
              style={{ background: "var(--accent)", boxShadow: "0 10px 26px var(--accent-shadow)" }}
            >
              {loading ? "Sending…" : "Book a Demo"}
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Labeled({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-[12.5px] font-medium text-[var(--text-secondary)]">
        {label}
      </label>
      {children}
    </div>
  );
}
