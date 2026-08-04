import { Linkedin, Instagram, Mail } from "lucide-react";

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
