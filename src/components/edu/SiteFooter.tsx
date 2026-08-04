import { Mail } from "lucide-react";

function Linkedin({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.4 8.75 22 11.1 22 14.2V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4V9Z" />
    </svg>
  );
}

function Instagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const groups = [
  {
    title: "Product",
    links: [
      { label: "Brand-OS", href: "#product" },
      { label: "Ecosystem Roadmap", href: "#ecosystem" },
      { label: "Book a Demo", href: "#contact" },
    ],
  },
  {
    title: "Institutions",
    links: [
      { label: "Schools", href: "#institutions" },
      { label: "Colleges & Universities", href: "#institutions" },
      { label: "Coaching Institutes", href: "#institutions" },
      { label: "Training Institutes", href: "#institutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Vision & Mission", href: "#company" },
      { label: "Insights", href: "#insights" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer
      className="px-5 md:px-8 pt-20 pb-10"
      style={{ background: "var(--footer-bg)", borderTop: "1px solid var(--border-dark)" }}
    >
      <div className="max-w-[1160px] mx-auto">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                className="grid place-items-center w-8 h-8 rounded-[9px] text-[13px] font-bold text-white"
                style={{ background: "linear-gradient(140deg, var(--accent), #2E3FB8)" }}
              >
                C
              </span>
              <span className="text-[15px] font-semibold text-[var(--text-primary)]">
                Century TechX LLP
              </span>
            </div>
            <p className="mt-4 max-w-[300px] text-[14px] leading-[1.75] text-[var(--text-secondary)]">
              The Operating System for Education. One partner for every system an Indian institution
              needs to run, grow and teach.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/company/centurytechx", label: "LinkedIn" },
                { icon: Instagram, href: "https://www.instagram.com/centurytechx", label: "Instagram" },
                { icon: Mail, href: "mailto:info@centurytechx.com", label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid place-items-center w-9 h-9 rounded-[10px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  style={{ border: "1px solid var(--border-mid)" }}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <div className="text-[12px] font-medium tracking-[0.14em] uppercase text-[var(--text-dim)]">
                {g.title}
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid var(--border-dark)" }}
        >
          <span className="text-[13px] text-[var(--text-dim)]">
            © 2026 Century TechX LLP. Tumkur, Karnataka, India.
          </span>
          <span className="text-[13px] text-[var(--text-dim)]">
            Built exclusively for educational institutions.
          </span>
        </div>
      </div>
    </footer>
  );
}
