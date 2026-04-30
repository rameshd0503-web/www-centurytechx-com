import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/use-admin-auth";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login · Century TechX" },
      { name: "description", content: "Admin sign-in for Century TechX." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

const credsSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
});

function AdminLoginPage() {
  const auth = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // If already an admin, bounce to inbox.
  useEffect(() => {
    if (auth.status === "admin") {
      void navigate({ to: "/admin/inbox" });
    }
  }, [auth.status, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const parsed = credsSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    if (error) {
      // Generic message to avoid email enumeration / leaking auth details.
      setError("Invalid email or password.");
    }
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-16" style={{ background: "var(--bg-primary)" }}>
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--neon)] mb-2">// SECURE TERMINAL</p>
          <h1 className="font-orbitron font-black text-3xl text-[var(--text-primary)] tracking-tight">ADMIN ACCESS</h1>
          <p className="font-mono text-[11px] text-[var(--text-secondary)] mt-3">
            Authorized personnel only · Century TechX OS
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[6px] p-7"
          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-mid)" }}
        >
          <div className="space-y-4">
            <LabeledField
              label="// EMAIL"
              type="email"
              value={email}
              onChange={setEmail}
              autoComplete="email"
              placeholder="admin@centurytechx.com"
            />
            <LabeledField
              label="// PASSWORD"
              type="password"
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="mt-4 font-mono text-[11px] px-3 py-2 rounded-[3px]"
              style={{ background: "rgba(255,45,85,0.08)", border: "1px solid rgba(255,45,85,0.35)", color: "#FF2D55" }}
            >
              ⚠ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="ctx-focus-ring w-full mt-6 font-orbitron font-bold text-[12px] tracking-[0.15em] px-6 py-4 rounded-[3px] transition-all disabled:opacity-60"
            style={{ background: "var(--neon)", color: "#000" }}
          >
            {submitting ? "AUTHENTICATING..." : "ACCESS TERMINAL //"}
          </button>

          <p className="mt-4 font-mono text-[10px] tracking-[0.15em] text-[var(--text-dim)] text-center">
            // ACCOUNTS ARE PROVISIONED BY SYSTEM ADMINISTRATORS
          </p>

          <div className="mt-5 text-center">
            <Link
              to="/"
              className="ctx-focus-ring font-mono text-[10px] tracking-[0.18em] text-[var(--text-dim)] hover:text-[var(--neon)] transition-colors"
            >
              ← BACK TO SITE
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

function LabeledField({
  label,
  type,
  value,
  onChange,
  autoComplete,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] tracking-[0.18em] text-[var(--neon)] mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="ctx-focus-ring w-full font-mono text-[13px]"
        style={{
          background: "rgba(37,99,235,0.03)",
          border: "1px solid rgba(37,99,235,0.18)",
          color: "var(--text-primary)",
          padding: "12px 14px",
          borderRadius: 3,
          outline: "none",
        }}
      />
    </div>
  );
}
