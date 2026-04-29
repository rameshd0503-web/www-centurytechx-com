import logoUrl from "@/assets/ctx-logo.jpeg";

const QUICK_LINKS = [
  { label: "Divisions", href: "#divisions" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer
      className="relative px-5 md:px-8 pt-16 pb-6"
      style={{
        background: "#000",
        borderTop: "2px solid #F5A623",
        boxShadow: "0 -4px 40px rgba(245,166,35,0.10)",
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
                  background: "#FFFFFF",
                  border: "1px solid rgba(245,166,35,0.5)",
                  boxShadow: "0 0 20px rgba(245,166,35,0.3)",
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
            <div className="font-rajdhani font-semibold text-white text-[16px] tracking-[0.08em] mb-2">
              CENTURY TECHX LLP
            </div>
            <div className="font-mono text-[11px] text-[var(--neon)] tracking-[0.15em] mb-5">
              Empowering Growth
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
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3 pt-5"
          style={{ borderTop: "1px solid rgba(245,166,35,0.15)" }}
        >
          <span className="font-mono text-[9px] tracking-[0.18em] text-[var(--text-dim)]">
            © 2025 CENTURY TECHX LLP · ALL RIGHTS RESERVED
          </span>
          <span className="font-mono text-[9px] tracking-[0.18em] text-[var(--neon)]">
            BUILD · LAUNCH · AUTOMATE
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] text-[var(--text-dim)]">
            ALL SYSTEMS OPERATIONAL
            <span
              className="w-[6px] h-[6px] rounded-full"
              style={{ background: "#00FF88", boxShadow: "0 0 6px #00FF88", animation: "blink 1.4s steps(2) infinite" }}
            />
          </span>
        </div>
      </div>
    </footer>
  );
}
