import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { StatsBar } from "./StatsBar";

const institutions = [
  "Schools",
  "Colleges & Universities",
  "Coaching Institutes",
  "Training Institutes",
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link =
    "text-[14px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <StatsBar />
      <nav
        className="w-full transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.72)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--border-dark)",
          boxShadow: scrolled ? "0 6px 24px rgba(20,24,31,0.06)" : "none",
        }}
      >
        <div className="max-w-[1180px] mx-auto px-5 md:px-8 flex items-center justify-between h-[68px]">
          <a href="#top" className="flex items-center gap-2.5">
            <img src="/favicon-32x32.png" alt="Century TechX logo" width={30} height={30} className="rounded-full" />
            <span className="font-extrabold tracking-[-0.02em] text-[17px] text-[var(--text-primary)]">
              Century TechX
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#top" className={link}>Product</a>
            <a href="#roadmap" className={link}>Ecosystem</a>
            <div
              className="relative"
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
            >
              <button className={`${link} inline-flex items-center gap-1`}>
                For Institutions <ChevronDown size={14} />
              </button>
              {dropdown && (
                <div
                  className="absolute left-0 top-full pt-3 w-[250px]"
                >
                  <div
                    className="rounded-[14px] p-2"
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid var(--border-dark)",
                      boxShadow: "var(--shadow-card)",
                    }}
                  >
                    {institutions.map((i) => (
                      <a
                        key={i}
                        href="#serve"
                        className="block rounded-[10px] px-3 py-2.5 text-[13.5px] text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] transition-colors"
                      >
                        {i}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <a href="#insights" className={link}>Insights</a>
            <a href="#contact" className={link}>Company</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center rounded-full px-5 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-200 active:scale-95 hover:brightness-110"
              style={{ background: "var(--accent)", boxShadow: "0 8px 20px rgba(232,148,15,0.28)" }}
            >
              Book a Demo
            </a>
            <button
              className="lg:hidden text-[var(--text-primary)]"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden px-5 pb-5 flex flex-col gap-1" style={{ background: "#FFFFFF" }}>
            {[
              ["Product", "#solutions"],
              ["Ecosystem", "#roadmap"],
              ["For Institutions", "#serve"],
              ["Insights", "#insights"],
              ["Company", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-[15px] text-[var(--text-secondary)] border-b border-[var(--border-dark)]"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
