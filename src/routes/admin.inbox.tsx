import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Search, RefreshCw, LogOut, Inbox, ChevronDown, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/use-admin-auth";

const STATUS_VALUES = ["all", "new", "in_progress", "resolved", "spam"] as const;
type StatusFilter = (typeof STATUS_VALUES)[number];
type SubmissionStatus = Exclude<StatusFilter, "all">;

const inboxSearchSchema = z.object({
  status: fallback(z.enum(STATUS_VALUES), "all").default("all"),
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/admin/inbox")({
  validateSearch: zodValidator(inboxSearchSchema),
  head: () => ({
    meta: [
      { title: "Admin Inbox · Century TechX" },
      { name: "description", content: "Contact submission inbox for Century TechX admins." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminInboxPage,
});

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  status: SubmissionStatus;
  created_at: string;
  updated_at: string;
}

const STATUS_META: Record<SubmissionStatus, { label: string; color: string; bg: string }> = {
  new: { label: "NEW", color: "#00FF88", bg: "rgba(0,255,136,0.10)" },
  in_progress: { label: "IN PROGRESS", color: "#F5A623", bg: "rgba(245,166,35,0.10)" },
  resolved: { label: "RESOLVED", color: "#00D4E8", bg: "rgba(0,212,232,0.10)" },
  spam: { label: "SPAM", color: "#FF2D55", bg: "rgba(255,45,85,0.10)" },
};

function AdminInboxPage() {
  const auth = useAdminAuth();
  const navigate = useNavigate({ from: "/admin/inbox" });
  const { status, q } = Route.useSearch();

  const [rows, setRows] = useState<Submission[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Auth gate (in component is fine since the hook is async).
  useEffect(() => {
    if (auth.status === "signed_out") void navigate({ to: "/admin/login" });
  }, [auth.status, navigate]);

  const fetchRows = async () => {
    setLoading(true);
    setError("");
    let query = supabase
      .from("enquiries")
      .select("id, name, email, message, status, created_at, updated_at")
      .order("created_at", { ascending: false })
      .limit(200);

    if (status !== "all") query = query.eq("status", status);

    const { data, error } = await query;
    if (error) {
      console.error("Failed to load submissions:", error);
      setError("Failed to load submissions. Please try again.");
    } else {
      setRows((data ?? []) as Submission[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (auth.status === "admin") void fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.status, status]);

  const filtered = useMemo(() => {
    if (!rows) return [];
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((r) => r.name.toLowerCase().includes(needle) || r.email.toLowerCase().includes(needle));
  }, [rows, q]);

  const updateStatus = async (id: string, next: SubmissionStatus) => {
    const prev = rows;
    setRows((curr) => curr?.map((r) => (r.id === id ? { ...r, status: next } : r)) ?? curr);
    const { error } = await supabase.from("enquiries").update({ status: next }).eq("id", id);
    if (error) {
      console.error("Failed to update submission status:", error);
      setError("Failed to update status. Please try again.");
      setRows(prev ?? null);
    }
  };

  if (auth.status === "loading") return <FullScreenMessage text="// AUTHENTICATING..." />;
  if (auth.status === "signed_out") return <FullScreenMessage text="// REDIRECTING TO LOGIN..." />;
  if (auth.status === "signed_in_no_role") return <NoRoleScreen email={auth.session.user.email} onSignOut={auth.signOut} />;

  return (
    <main className="min-h-screen px-5 md:px-8 py-10" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--neon)] mb-2">// MISSION CONTROL · INBOX</p>
            <h1 className="font-orbitron font-black text-3xl md:text-4xl text-[var(--text-primary)] tracking-tight flex items-center gap-3">
              <Inbox size={28} className="text-[var(--neon)]" />
              CONTACT SUBMISSIONS
            </h1>
            <p className="font-mono text-[11px] text-[var(--text-secondary)] mt-2">
              Signed in as <span className="text-[var(--neon)]">{auth.session.user.email}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => void fetchRows()}
              disabled={loading}
              aria-label="Refresh"
              className="ctx-focus-ring inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] px-3 py-2 rounded-[3px] disabled:opacity-50"
              style={{ border: "1px solid var(--border-mid)", color: "var(--text-secondary)" }}
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              REFRESH
            </button>
            <button
              onClick={() => void auth.signOut()}
              className="ctx-focus-ring inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] px-3 py-2 rounded-[3px]"
              style={{ border: "1px solid var(--border-mid)", color: "var(--text-secondary)" }}
            >
              <LogOut size={14} />
              SIGN OUT
            </button>
          </div>
        </header>

        {/* Filters */}
        <section
          className="flex flex-wrap items-center gap-3 p-4 rounded-[6px] mb-6"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border-mid)" }}
        >
          {/* Status pills */}
          <div className="flex flex-wrap gap-2">
            {STATUS_VALUES.map((s) => {
              const active = status === s;
              const meta = s === "all" ? null : STATUS_META[s];
              return (
                <Link
                  key={s}
                  from={Route.fullPath}
                  search={(prev: { status: StatusFilter; q: string }) => ({ ...prev, status: s })}
                  className="ctx-focus-ring font-mono text-[10px] tracking-[0.15em] px-3 py-2 rounded-[3px] transition-all"
                  style={{
                    background: active ? (meta?.color ?? "var(--neon)") : "transparent",
                    color: active ? "#000" : meta?.color ?? "var(--text-secondary)",
                    border: `1px solid ${meta?.color ?? "var(--border-mid)"}`,
                  }}
                >
                  {s === "all" ? "ALL" : STATUS_META[s].label}
                </Link>
              );
            })}
          </div>

          {/* Search */}
          <div className="flex-1 min-w-[240px] flex items-center gap-2 ml-auto">
            <Search size={14} className="text-[var(--text-dim)]" />
            <input
              type="search"
              value={q}
              onChange={(e) =>
                navigate({ search: (prev: { status: StatusFilter; q: string }) => ({ ...prev, q: e.target.value }), replace: true })
              }
              placeholder="Search by name or email…"
              className="ctx-focus-ring w-full font-mono text-[12px]"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-mid)",
                color: "var(--text-primary)",
                padding: "8px 12px",
                borderRadius: 3,
                outline: "none",
              }}
            />
          </div>

          <div className="font-mono text-[10px] tracking-[0.15em] text-[var(--text-dim)] whitespace-nowrap">
            {filtered.length} / {rows?.length ?? 0}
          </div>
        </section>

        {error && (
          <div
            role="alert"
            className="mb-4 font-mono text-[11px] px-3 py-2 rounded-[3px]"
            style={{ background: "rgba(255,45,85,0.08)", border: "1px solid rgba(255,45,85,0.35)", color: "#FF2D55" }}
          >
            ⚠ {error}
          </div>
        )}

        {/* Table */}
        <div
          className="rounded-[6px] overflow-hidden"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border-mid)" }}
        >
          <div
            className="grid gap-3 px-4 py-3 font-mono text-[9px] tracking-[0.2em] text-[var(--text-dim)]"
            style={{
              gridTemplateColumns: "24px 1.4fr 1.6fr 1.1fr 1fr",
              borderBottom: "1px solid var(--border-mid)",
            }}
          >
            <span></span>
            <span>// NAME</span>
            <span>// EMAIL</span>
            <span>// RECEIVED</span>
            <span>// STATUS</span>
          </div>

          {loading && rows === null && <RowMessage text="// LOADING TRANSMISSIONS..." />}
          {!loading && filtered.length === 0 && rows !== null && (
            <RowMessage text={q ? "// NO MATCHES FOR YOUR SEARCH" : "// INBOX EMPTY"} />
          )}

          {filtered.map((row) => {
            const isOpen = expanded === row.id;
            const meta = STATUS_META[row.status];
            return (
              <div key={row.id} style={{ borderBottom: "1px solid var(--border-dark)" }}>
                <button
                  onClick={() => setExpanded(isOpen ? null : row.id)}
                  aria-expanded={isOpen}
                  className="ctx-focus-ring w-full grid gap-3 px-4 py-3 text-left items-center hover:bg-[rgba(245,166,35,0.03)] transition-colors"
                  style={{ gridTemplateColumns: "24px 1.4fr 1.6fr 1.1fr 1fr" }}
                >
                  {isOpen ? (
                    <ChevronDown size={14} className="text-[var(--neon)]" />
                  ) : (
                    <ChevronRight size={14} className="text-[var(--text-dim)]" />
                  )}
                  <span className="font-rajdhani font-semibold text-[14px] text-[var(--text-primary)] truncate">
                    {row.name}
                  </span>
                  <span className="font-mono text-[12px] text-[var(--text-secondary)] truncate">{row.email}</span>
                  <span className="font-mono text-[11px] text-[var(--text-dim)]">{formatDate(row.created_at)}</span>
                  <span
                    className="font-mono text-[10px] tracking-[0.15em] px-2 py-1 rounded-[2px] w-fit"
                    style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.color}40` }}
                  >
                    ● {meta.label}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 pt-1" style={{ background: "rgba(245,166,35,0.02)" }}>
                    <div
                      className="font-mono text-[12px] leading-relaxed text-[var(--text-primary)] whitespace-pre-wrap p-4 rounded-[3px] mb-4"
                      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-dark)" }}
                    >
                      {row.message}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--text-dim)] mr-2">
                        // SET STATUS:
                      </span>
                      {(Object.keys(STATUS_META) as SubmissionStatus[]).map((s) => {
                        const isCurrent = row.status === s;
                        const m = STATUS_META[s];
                        return (
                          <button
                            key={s}
                            onClick={() => void updateStatus(row.id, s)}
                            disabled={isCurrent}
                            className="ctx-focus-ring font-mono text-[10px] tracking-[0.15em] px-3 py-1.5 rounded-[2px] transition-all disabled:opacity-100"
                            style={{
                              background: isCurrent ? m.color : "transparent",
                              color: isCurrent ? "#000" : m.color,
                              border: `1px solid ${m.color}`,
                              cursor: isCurrent ? "default" : "pointer",
                            }}
                          >
                            {m.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function RowMessage({ text }: { text: string }) {
  return (
    <div className="px-4 py-12 text-center font-mono text-[11px] tracking-[0.18em] text-[var(--text-dim)]">{text}</div>
  );
}

function FullScreenMessage({ text }: { text: string }) {
  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
      <p className="font-mono text-[12px] tracking-[0.2em] text-[var(--neon)]">{text}</p>
    </main>
  );
}

function NoRoleScreen({ email, onSignOut }: { email: string | undefined; onSignOut: () => Promise<void> }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-5" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-md text-center">
        <p className="font-mono text-[10px] tracking-[0.25em] text-[#FF2D55] mb-3">// ACCESS DENIED</p>
        <h1 className="font-orbitron font-black text-2xl text-[var(--text-primary)] mb-3">ADMIN ROLE REQUIRED</h1>
        <p className="font-mono text-[12px] text-[var(--text-secondary)] mb-2">
          You're signed in as <span className="text-[var(--neon)]">{email}</span>, but this account doesn't have the
          <span className="text-[var(--neon)]"> admin</span> role.
        </p>
        <p className="font-mono text-[11px] text-[var(--text-dim)] mb-6">
          Ask a project administrator to grant you access in the user_roles table.
        </p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => void onSignOut()}
            className="ctx-focus-ring inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] px-4 py-2 rounded-[3px]"
            style={{ border: "1px solid var(--border-mid)", color: "var(--text-secondary)" }}
          >
            <LogOut size={14} />
            SIGN OUT
          </button>
          <Link
            to="/"
            className="ctx-focus-ring inline-flex items-center font-mono text-[10px] tracking-[0.18em] px-4 py-2 rounded-[3px]"
            style={{ background: "var(--neon)", color: "#000" }}
          >
            ← BACK TO SITE
          </Link>
        </div>
      </div>
    </main>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
