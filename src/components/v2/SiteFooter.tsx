import { Linkedin, Instagram, Twitter, Youtube } from "lucide-react";

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
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "X" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
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
