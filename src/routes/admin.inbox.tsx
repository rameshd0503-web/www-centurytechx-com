import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import {
  Search,
  RefreshCw,
  LogOut,
  Inbox,
  X,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Reply,
  Copy,
  Check,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/use-admin-auth";

const STATUS_VALUES = ["all", "new", "in_progress", "resolved", "spam"] as const;
const SOURCE_VALUES = ["enquiries", "contacts"] as const;
const PAGE_SIZE = 25;

type StatusFilter = (typeof STATUS_VALUES)[number];
type SubmissionStatus = Exclude<StatusFilter, "all">;
type Source = (typeof SOURCE_VALUES)[number];

const inboxSearchSchema = z.object({
  source: fallback(z.enum(SOURCE_VALUES), "enquiries").default("enquiries"),
  status: fallback(z.enum(STATUS_VALUES), "all").default("all"),
  q: fallback(z.string(), "").default(""),
  page: fallback(z.number().int().min(1), 1).default(1),
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
  phone: string | null;
  message: string;
  status: SubmissionStatus | null; // contacts have no status
  created_at: string;
}

const STATUS_META: Record<SubmissionStatus, { label: string; color: string; bg: string }> = {
  new: { label: "NEW", color: "#16A34A", bg: "rgba(22,163,74,0.10)" },
  in_progress: { label: "IN PROGRESS", color: "#F97316", bg: "rgba(249,115,22,0.10)" },
  resolved: { label: "RESOLVED", color: "#9A3412", bg: "rgba(154,52,18,0.10)" },
  spam: { label: "SPAM", color: "#FF2D55", bg: "rgba(255,45,85,0.10)" },
};

function AdminInboxPage() {
  const auth = useAdminAuth();
  const navigate = useNavigate({ from: "/admin/inbox" });
  const { source, status, q, page } = Route.useSearch();

  const [rows, setRows] = useState<Submission[] | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Auth gate
  useEffect(() => {
    if (auth.status === "signed_out") void navigate({ to: "/admin/login" });
  }, [auth.status, navigate]);

  const fetchRows = async () => {
    setLoading(true);
    setError("");

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const selectCols =
      source === "enquiries"
        ? "id, name, email, message, status, created_at"
        : "id, name, email, phone, message, created_at";

    let query = supabase
      .from(source)
      .select(selectCols, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (source === "enquiries" && status !== "all") {
      query = query.eq("status", status);
    }

    if (q.trim()) {
      const needle = q.trim().replace(/[%_]/g, "\\$&");
      query = query.or(`name.ilike.%${needle}%,email.ilike.%${needle}%`);
    }

    const { data, error, count } = await query;
    if (error) {
      console.error("Failed to load submissions:", error);
      setError("Failed to load submissions. Please try again.");
      setRows([]);
      setTotalCount(0);
    } else {
      const normalized: Submission[] = ((data ?? []) as unknown[]).map((r) => {
        const row = r as Record<string, unknown>;
        return {
          id: String(row.id),
          name: String(row.name ?? ""),
          email: String(row.email ?? ""),
          phone: (row.phone as string | null | undefined) ?? null,
          message: String(row.message ?? ""),
          status: (row.status as SubmissionStatus | undefined) ?? null,
          created_at: String(row.created_at),
        };
      });
      setRows(normalized);
      setTotalCount(count ?? 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (auth.status === "admin") void fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.status, source, status, q, page]);

  const selected = useMemo(
    () => (selectedId ? rows?.find((r) => r.id === selectedId) ?? null : null),
    [selectedId, rows]
  );

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const updateStatus = async (id: string, next: SubmissionStatus) => {
    if (source !== "enquiries") return;
    const prev = rows;
    setRows((curr) => curr?.map((r) => (r.id === id ? { ...r, status: next } : r)) ?? curr);
    const { error } = await supabase.from("enquiries").update({ status: next }).eq("id", id);
    if (error) {
      console.error("Failed to update status:", error);
      setError("Failed to update status. Please try again.");
      setRows(prev ?? null);
    }
  };

  const setSearch = (patch: Partial<{ source: Source; status: StatusFilter; q: string; page: number }>) => {
    void navigate({
      search: (prev: any) => ({
        ...prev,
        ...patch,
        // Reset to page 1 when filters change (unless page is in patch)
        page: patch.page ?? (patch.q !== undefined || patch.status !== undefined || patch.source !== undefined ? 1 : prev.page),
      }),
      replace: true,
    });
  };

  if (auth.status === "loading") return <FullScreenMessage text="// AUTHENTICATING..." />;
  if (auth.status === "signed_out") return <FullScreenMessage text="// REDIRECTING TO LOGIN..." />;
  if (auth.status === "signed_in_no_role")
    return <NoRoleScreen email={auth.session.user.email} onSignOut={auth.signOut} />;

  return (
    <main className="min-h-screen px-5 md:px-8 py-10" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--neon)] mb-2">
              // MISSION CONTROL · INBOX
            </p>
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

        {/* Source tabs */}
        <div className="flex gap-1 mb-4" role="tablist" aria-label="Submission source">
          {SOURCE_VALUES.map((s) => {
            const active = source === s;
            return (
              <button
                key={s}
                role="tab"
                aria-selected={active}
                onClick={() => setSearch({ source: s })}
                className="ctx-focus-ring font-mono text-[10px] tracking-[0.2em] px-4 py-2.5 rounded-t-[4px] transition-all"
                style={{
                  background: active ? "var(--bg-surface)" : "transparent",
                  color: active ? "var(--neon)" : "var(--text-dim)",
                  border: "1px solid var(--border-mid)",
                  borderBottom: active ? "1px solid var(--bg-surface)" : "1px solid var(--border-mid)",
                  marginBottom: -1,
                }}
              >
                {s === "enquiries" ? "// ENQUIRIES" : "// CONTACTS"}
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <section
          className="flex flex-wrap items-center gap-3 p-4 rounded-b-[6px] rounded-tr-[6px] mb-6"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border-mid)" }}
        >
          {source === "enquiries" && (
            <div className="flex flex-wrap gap-2">
              {STATUS_VALUES.map((s) => {
                const active = status === s;
                const meta = s === "all" ? null : STATUS_META[s];
                return (
                  <button
                    key={s}
                    onClick={() => setSearch({ status: s })}
                    className="ctx-focus-ring font-mono text-[10px] tracking-[0.15em] px-3 py-2 rounded-[3px] transition-all"
                    style={{
                      background: active ? meta?.color ?? "var(--neon)" : "transparent",
                      color: active ? "#000" : meta?.color ?? "var(--text-secondary)",
                      border: `1px solid ${meta?.color ?? "var(--border-mid)"}`,
                    }}
                  >
                    {s === "all" ? "ALL" : STATUS_META[s].label}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex-1 min-w-[240px] flex items-center gap-2 ml-auto">
            <Search size={14} className="text-[var(--text-dim)]" />
            <input
              type="search"
              defaultValue={q}
              onChange={(e) => setSearch({ q: e.target.value })}
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
            {totalCount} TOTAL
          </div>
        </section>

        {error && (
          <div
            role="alert"
            className="mb-4 font-mono text-[11px] px-3 py-2 rounded-[3px]"
            style={{
              background: "rgba(255,45,85,0.08)",
              border: "1px solid rgba(255,45,85,0.35)",
              color: "#FF2D55",
            }}
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
              gridTemplateColumns:
                source === "enquiries" ? "1.4fr 1.6fr 1.1fr 1fr" : "1.4fr 1.6fr 1fr 1.1fr",
              borderBottom: "1px solid var(--border-mid)",
            }}
          >
            <span>// NAME</span>
            <span>// EMAIL</span>
            {source === "enquiries" ? <span>// RECEIVED</span> : <span>// PHONE</span>}
            {source === "enquiries" ? <span>// STATUS</span> : <span>// RECEIVED</span>}
          </div>

          {loading && rows === null && <RowMessage text="// LOADING TRANSMISSIONS..." />}
          {!loading && rows !== null && rows.length === 0 && (
            <RowMessage text={q ? "// NO MATCHES FOR YOUR SEARCH" : "// INBOX EMPTY"} />
          )}

          {rows?.map((row) => {
            const meta = row.status ? STATUS_META[row.status] : null;
            return (
              <button
                key={row.id}
                onClick={() => setSelectedId(row.id)}
                className="ctx-focus-ring w-full grid gap-3 px-4 py-3 text-left items-center hover:bg-[rgba(249,115,22,0.05)] transition-colors"
                style={{
                  gridTemplateColumns:
                    source === "enquiries" ? "1.4fr 1.6fr 1.1fr 1fr" : "1.4fr 1.6fr 1fr 1.1fr",
                  borderBottom: "1px solid var(--border-dark)",
                }}
              >
                <span className="font-rajdhani font-semibold text-[14px] text-[var(--text-primary)] truncate">
                  {row.name}
                </span>
                <span className="font-mono text-[12px] text-[var(--text-secondary)] truncate">
                  {row.email}
                </span>
                {source === "enquiries" ? (
                  <span className="font-mono text-[11px] text-[var(--text-dim)]">
                    {formatDate(row.created_at)}
                  </span>
                ) : (
                  <span className="font-mono text-[11px] text-[var(--text-secondary)] truncate">
                    {row.phone || "—"}
                  </span>
                )}
                {source === "enquiries" && meta ? (
                  <span
                    className="font-mono text-[10px] tracking-[0.15em] px-2 py-1 rounded-[2px] w-fit"
                    style={{
                      background: meta.bg,
                      color: meta.color,
                      border: `1px solid ${meta.color}40`,
                    }}
                  >
                    ● {meta.label}
                  </span>
                ) : (
                  <span className="font-mono text-[11px] text-[var(--text-dim)]">
                    {formatDate(row.created_at)}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Pagination */}
        {totalCount > 0 && (
          <div className="flex items-center justify-between mt-4">
            <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--text-dim)]">
              PAGE {page} / {totalPages} · SHOWING {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, totalCount)}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1 || loading}
                onClick={() => setSearch({ page: page - 1 })}
                className="ctx-focus-ring inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.15em] px-3 py-2 rounded-[3px] disabled:opacity-30"
                style={{ border: "1px solid var(--border-mid)", color: "var(--text-secondary)" }}
              >
                <ChevronLeft size={14} /> PREV
              </button>
              <button
                disabled={page >= totalPages || loading}
                onClick={() => setSearch({ page: page + 1 })}
                className="ctx-focus-ring inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.15em] px-3 py-2 rounded-[3px] disabled:opacity-30"
                style={{ border: "1px solid var(--border-mid)", color: "var(--text-secondary)" }}
              >
                NEXT <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      {selected && (
        <DetailDrawer
          submission={selected}
          source={source}
          onClose={() => setSelectedId(null)}
          onStatusChange={updateStatus}
        />
      )}
    </main>
  );
}

function DetailDrawer({
  submission,
  source,
  onClose,
  onStatusChange,
}: {
  submission: Submission;
  source: Source;
  onClose: () => void;
  onStatusChange: (id: string, next: SubmissionStatus) => Promise<void>;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(submission.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  const replySubject = encodeURIComponent(`Re: Your enquiry to Century TechX`);
  const replyBody = encodeURIComponent(
    `Hi ${submission.name},\n\nThank you for reaching out to Century TechX.\n\n— Your message —\n${submission.message}\n\n— Our reply —\n\n\nBest regards,\nCentury TechX Team`
  );
  const mailto = `mailto:${submission.email}?subject=${replySubject}&body=${replyBody}`;

  return (
    <>
      {/* Overlay */}
      <button
        aria-label="Close detail"
        onClick={onClose}
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Submission detail"
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[520px] flex flex-col overflow-hidden"
        style={{
          background: "var(--bg-surface)",
          borderLeft: "1px solid var(--border-mid)",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
        }}
      >
        <header
          className="flex items-start justify-between gap-4 p-5"
          style={{ borderBottom: "1px solid var(--border-mid)" }}
        >
          <div className="min-w-0">
            <p className="font-mono text-[9px] tracking-[0.25em] text-[var(--neon)] mb-1">
              // {source === "enquiries" ? "ENQUIRY" : "CONTACT"} · DETAIL
            </p>
            <h2 className="font-orbitron font-bold text-xl text-[var(--text-primary)] truncate">
              {submission.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ctx-focus-ring p-2 rounded-[3px]"
            style={{ border: "1px solid var(--border-mid)", color: "var(--text-secondary)" }}
          >
            <X size={16} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Meta */}
          <div className="space-y-3">
            <DetailRow icon={<Mail size={13} />} label="EMAIL">
              <div className="flex items-center gap-2 min-w-0">
                <a
                  href={`mailto:${submission.email}`}
                  className="font-mono text-[12px] text-[var(--text-primary)] hover:text-[var(--neon)] truncate"
                >
                  {submission.email}
                </a>
                <button
                  onClick={() => void copyEmail()}
                  aria-label="Copy email"
                  className="ctx-focus-ring p-1 rounded-[2px] shrink-0"
                  style={{ color: copied ? "var(--neon)" : "var(--text-dim)" }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>
            </DetailRow>

            {submission.phone && (
              <DetailRow icon={<Phone size={13} />} label="PHONE">
                <a
                  href={`tel:${submission.phone}`}
                  className="font-mono text-[12px] text-[var(--text-primary)] hover:text-[var(--neon)]"
                >
                  {submission.phone}
                </a>
              </DetailRow>
            )}

            <DetailRow icon={<Calendar size={13} />} label="RECEIVED">
              <span className="font-mono text-[12px] text-[var(--text-secondary)]">
                {formatDate(submission.created_at)}
              </span>
            </DetailRow>
          </div>

          {/* Message */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] text-[var(--text-dim)] mb-2">
              // MESSAGE
            </p>
            <div
              className="font-mono text-[12px] leading-relaxed text-[var(--text-primary)] whitespace-pre-wrap p-4 rounded-[3px]"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-dark)" }}
            >
              {submission.message}
            </div>
          </div>

          {/* Status controls (enquiries only) */}
          {source === "enquiries" && submission.status && (
            <div>
              <p className="font-mono text-[9px] tracking-[0.25em] text-[var(--text-dim)] mb-2">
                // SET STATUS
              </p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(STATUS_META) as SubmissionStatus[]).map((s) => {
                  const isCurrent = submission.status === s;
                  const m = STATUS_META[s];
                  return (
                    <button
                      key={s}
                      onClick={() => void onStatusChange(submission.id, s)}
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

        <footer
          className="p-5 flex gap-2"
          style={{ borderTop: "1px solid var(--border-mid)", background: "var(--bg-elevated)" }}
        >
          <a
            href={mailto}
            className="ctx-focus-ring flex-1 inline-flex items-center justify-center gap-2 font-orbitron font-bold text-[11px] tracking-[0.18em] px-4 py-3 rounded-[3px]"
            style={{ background: "var(--neon)", color: "#FFFFFF" }}
          >
            <Reply size={14} />
            REPLY VIA EMAIL
          </a>
        </footer>
      </aside>
    </>
  );
}

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[var(--text-dim)] shrink-0">{icon}</span>
      <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--text-dim)] w-[70px] shrink-0">
        {label}
      </span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

function RowMessage({ text }: { text: string }) {
  return (
    <div className="px-4 py-12 text-center font-mono text-[11px] tracking-[0.18em] text-[var(--text-dim)]">
      {text}
    </div>
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
            style={{ background: "var(--neon)", color: "#FFFFFF" }}
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
