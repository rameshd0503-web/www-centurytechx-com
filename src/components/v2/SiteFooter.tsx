function Icon({ path, size = 15 }: { path: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={path} />
    </svg>
  );
}

const BRAND = {
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.4 8.75 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.3-2.02-3.3-2.02 0-2.33 1.57-2.33 3.2V21h-4V9z",
  instagram:
    "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38zm6.99-11.4a1.58 1.58 0 1 1-1.58-1.57 1.58 1.58 0 0 1 1.58 1.57z",
  x: "M17.53 3H21l-7.19 8.21L22 21h-6.56l-4.28-5.6L6.2 21H2.73l7.7-8.79L2 3h6.72l3.87 5.12L17.53 3zm-1.15 16h1.92L7.7 4.9H5.64L16.38 19z",
  youtube:
    "M21.58 7.2a2.51 2.51 0 0 0-1.77-1.78C18.25 5 12 5 12 5s-6.25 0-7.81.42A2.51 2.51 0 0 0 2.42 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .42 4.8 2.51 2.51 0 0 0 1.77 1.78C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.51 2.51 0 0 0 1.77-1.78A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.42-4.8zM10 15.02V8.98L15.2 12 10 15.02z",
};

const columns = [
  {
    title: "Product",
    links: [
      ["Brand-OS", "#solutions"],
      ["AI Automation Suite", "#solutions"],
      ["Exam-OS", "#solutions"],
      ["Institution ERP", "#solutions"],
    ],
  },
  {
    title: "Ecosystem",
    links: [
      ["Roadmap", "#roadmap"],
      ["Student Network", "#roadmap"],
      ["Marketplace", "#roadmap"],
      ["Education Intelligence", "#roadmap"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Who we serve", "#serve"],
      ["Insights", "#insights"],
      ["Enquiry", "/enquiry"],
      ["Book a Demo", "#contact"],
    ],
  },
];

const socials = [
  { path: BRAND.linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { path: BRAND.instagram, href: "https://instagram.com", label: "Instagram" },
  { path: BRAND.x, href: "https://twitter.com", label: "X" },
  { path: BRAND.youtube, href: "https://youtube.com", label: "YouTube" },
];

export function SiteFooter() {
  return (
    <footer style={{ background: "#FFFFFF", borderTop: "1px solid var(--border-dark)" }}>
      <div className="max-w-[1180px] mx-auto px-5 md:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/favicon-32x32.png" alt="Century TechX logo" width={32} height={32} className="rounded-full" />
              <span className="font-extrabold tracking-[-0.02em] text-[17px] text-[var(--text-primary)]">
                Century TechX
              </span>
            </div>
            <p className="mt-3 text-[14px] text-[var(--accent)] font-medium">Empowering Growth</p>
            <address className="mt-4 not-italic text-[13.5px] leading-[1.7] text-[var(--text-secondary)] max-w-[300px]">
              Plot No. 119, KIADB Industrial Area, 1st Phase, Vasanthanarasapura, Tumkur — 572 137,
              Karnataka, India
            </address>
            <div className="mt-5 flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full grid place-items-center transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    border: "1px solid var(--border-mid)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--text-primary)]">
                {c.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[var(--text-dim)]"
          style={{ borderTop: "1px solid var(--border-dark)" }}
        >
          <span>© 2026 Century TechX LLP. All rights reserved.</span>
          <a href="mailto:info@centurytechx.com" className="hover:text-[var(--accent)] transition-colors">
            info@centurytechx.com
          </a>
        </div>
      </div>
    </footer>
  );
}
