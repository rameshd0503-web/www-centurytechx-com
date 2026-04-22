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

type Mode = "signin" | "signup";

function AdminLoginPage() {
  const auth = useAdminAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  // If already an admin, bounce to inbox.
  useEffect(() => {
    if (auth.status === "admin") {
      void navigate({ to: "/admin/inbox" });
    }
  }, [auth.status, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");

    const parsed = credsSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setSubmitting(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword(parsed.data);
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: { emailRedirectTo: `${window.location.origin}/admin/inbox` },
      });
      if (error) setError(error.message);
      else setInfo("Account created. You'll need an admin role assigned to access the inbox.");
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
          <div className="flex gap-2 mb-6 p-1 rounded-[3px]" style={{ background: "var(--bg-surface)" }}>
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError("");
                  setInfo("");
                }}
                className="flex-1 font-mono text-[10px] tracking-[0.18em] py-2 rounded-[2px] transition-all"
                style={{
                  background: mode === m ? "var(--neon)" : "transparent",
                  color: mode === m ? "#000" : "var(--text-secondary)",
                }}
              >
                {m === "signin" ? "SIGN IN" : "REGISTER"}
              </button>
            ))}
          </div>

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
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
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
          {info && (
            <div
              role="status"
              className="mt-4 font-mono text-[11px] px-3 py-2 rounded-[3px]"
              style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.30)", color: "#00FF88" }}
            >
              ✓ {info}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="ctx-focus-ring w-full mt-6 font-orbitron font-bold text-[12px] tracking-[0.15em] px-6 py-4 rounded-[3px] transition-all disabled:opacity-60"
            style={{ background: "var(--neon)", color: "#000" }}
          >
            {submitting ? "AUTHENTICATING..." : mode === "signin" ? "ACCESS TERMINAL //" : "REQUEST ACCESS //"}
          </button>

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
          background: "rgba(245,166,35,0.03)",
          border: "1px solid rgba(245,166,35,0.18)",
          color: "var(--text-primary)",
          padding: "12px 14px",
          borderRadius: 3,
          outline: "none",
        }}
      />
    </div>
  );
}
