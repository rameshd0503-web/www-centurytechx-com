import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Product", href: "#product" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "For Institutions", href: "#institutions" },
  { label: "Insights", href: "#insights" },
  { label: "Company", href: "#company" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "var(--bg-glass)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-dark)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-[1240px] mx-auto px-5 md:px-8 h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className="grid place-items-center w-8 h-8 rounded-[9px] text-[13px] font-bold text-white"
            style={{ background: "linear-gradient(140deg, var(--accent), #2E3FB8)" }}
          >
            C
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--text-primary)]">
            Century TechX <span className="text-[var(--text-dim)] font-normal">LLP</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center rounded-[10px] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-200 hover:brightness-110"
            style={{ background: "var(--accent)", boxShadow: "0 6px 20px var(--neon-glow)" }}
          >
            Book a Demo
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            className="lg:hidden text-[var(--text-primary)]"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="lg:hidden px-5 pb-5 flex flex-col gap-1"
          style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border-dark)" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-[15px] text-[var(--text-secondary)]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 text-center rounded-[10px] px-5 py-3 text-[14px] font-semibold text-white"
            style={{ background: "var(--accent)" }}
          >
            Book a Demo
          </a>
        </div>
      )}
    </header>
  );
}
