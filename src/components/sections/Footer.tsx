import logoUrl from "@/assets/ctx-logo.jpeg";

const QUICK_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "For Institutions", href: "#institutions" },
  { label: "Insights", href: "#automations" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer
      className="relative px-5 md:px-8 pt-16 pb-6"
      style={{
        background: "var(--footer-bg)",
        borderTop: "1px solid rgba(154,52,18,0.10)",
      }}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
          {/* Left */}
          <div>
            <a
              href="#top"
              aria-label="Century TechX LLP — Return to homepage top"
              className="ctx-focus-ring inline-block rounded-full mb-5"
            >
              <span
                className="relative inline-flex items-center justify-center rounded-full overflow-hidden"
                style={{
                  width: 80,
                  height: 80,
                 background: "var(--bg-elevated)",
                  border: "1px solid rgba(249,115,22,0.5)",
                  boxShadow: "0 0 20px rgba(249,115,22,0.3)",
                }}
              >
                <img
                  src={logoUrl}
                  alt="Century TechX LLP logo"
                  className="block w-full h-full object-cover"
                  style={{ transform: "scale(1.05)" }}
                />
              </span>
            </a>
             <div className="font-rajdhani font-semibold text-[var(--text-primary)] text-[16px] tracking-[0.08em] mb-2">
              CENTURY TECHX LLP
            </div>
            <div className="font-mono text-[11px] text-[var(--neon)] tracking-[0.15em] mb-5">
               THE OPERATING SYSTEM FOR EDUCATION
            </div>
            <address className="not-italic font-mono text-[10px] leading-[1.7] text-[var(--text-dim)]">
              Plot No. 119, KIADB Industrial Area<br />
              1st Phase, Vasanthanarasapura Industrial Area<br />
              Tumkur — 572 137, Karnataka, India
            </address>
          </div>

          {/* Center */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--neon)] mb-5">
              // QUICK LINKS
            </div>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-rajdhani font-medium text-[13px] tracking-[0.1em] text-[var(--text-secondary)] hover:text-[var(--neon)] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--neon)] mb-5">
              // CONNECT
            </div>
            <ul className="space-y-3 font-mono text-[11px]">
              <li>
                <a href="tel:+918073092082" className="text-[var(--text-secondary)] hover:text-[var(--neon)]">
                  📞 +91 80730 92082
                </a>
              </li>
              <li>
                <a href="mailto:info@centurytechx.com" className="text-[var(--text-secondary)] hover:text-[var(--neon)]">
                  ✉️ info@centurytechx.com
                </a>
              </li>
              <li>
                <a href="https://centurytechx.com" className="text-[var(--text-secondary)] hover:text-[var(--neon)]">
                  🌐 centurytechx.com
                </a>
              </li>
            </ul>

            <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--neon)] mt-7 mb-4">
              // SOCIALS
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center w-9 h-9 rounded-[3px] text-[var(--text-secondary)] hover:text-[var(--neon)] transition-colors"
                style={{ border: "1px solid rgba(249,115,22,0.25)", background: "rgba(249,115,22,0.04)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 11.01-4.12 2.06 2.06 0 01-.01 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex items-center justify-center w-9 h-9 rounded-[3px] text-[var(--text-secondary)] hover:text-[var(--neon)] transition-colors"
                style={{ border: "1px solid rgba(249,115,22,0.25)", background: "rgba(249,115,22,0.04)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.71 3.71 0 01-1.38-.9 3.71 3.71 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.94c-3.14 0-3.51.01-4.75.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.26.82-.38.38-.62.75-.82 1.26-.15.39-.33.97-.38 2.04-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.07.23 1.65.38 2.04.2.51.44.88.82 1.26.38.38.75.62 1.26.82.39.15.97.33 2.04.38 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.26-.82.38-.38.62-.75.82-1.26.15-.39.33-.97.38-2.04.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.07-.23-1.65-.38-2.04-.2-.51-.44-.88-.82-1.26a3.39 3.39 0 00-1.26-.82c-.39-.15-.97-.33-2.04-.38-1.24-.06-1.61-.07-4.75-.07zm0 3.3a4.6 4.6 0 110 9.2 4.6 4.6 0 010-9.2zm0 1.94a2.66 2.66 0 100 5.32 2.66 2.66 0 000-5.32zm5.85-2.16a1.08 1.08 0 11-2.16 0 1.08 1.08 0 012.16 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3 pt-5"
          style={{ borderTop: "1px solid rgba(249,115,22,0.15)" }}
        >
          <span className="font-mono text-[9px] tracking-[0.18em] text-[var(--text-dim)]">
            © 2026 CENTURY TECHX LLP · ALL RIGHTS RESERVED
          </span>
          <span className="font-mono text-[9px] tracking-[0.18em] text-[var(--neon)]">
             RUN · GROW · TEACH
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] text-[var(--text-dim)]">
            ALL SYSTEMS OPERATIONAL
            <span
              className="w-[6px] h-[6px] rounded-full"
              style={{ background: "#16A34A", boxShadow: "0 0 6px #16A34A", animation: "blink 1.4s steps(2) infinite" }}
            />
          </span>
        </div>
      </div>
    </footer>
  );
}
