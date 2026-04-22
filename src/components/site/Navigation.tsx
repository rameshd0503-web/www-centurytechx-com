import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoUrl from "@/assets/ctx-logo.jpeg";

const NAV_ITEMS = [
  { label: "DIVISIONS", href: "#divisions" },
  { label: "PRODUCTS", href: "#products" },
  { label: "SERVICES", href: "#services" },
  { label: "STACK", href: "#stack" },
  { label: "CONTACT", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top accent bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-[100]"
        style={{
          background: "#F5A623",
          animation: "top-bar-pulse 4s ease-in-out infinite",
        }}
      />
      <header
        className="fixed top-[2px] left-0 right-0 z-[99] transition-all duration-300"
        style={{
          height: 70,
          background: scrolled ? "rgba(3,5,6,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(245,166,35,0.15)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div className="h-full max-w-[1440px] mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            className="flex items-center gap-3 group ctx-focus-ring rounded-full"
            aria-label="Century TechX LLP — Return to homepage top"
          >
            <span
              className="relative inline-flex items-center justify-center rounded-full overflow-hidden flicker-on shrink-0"
              style={{
                width: 50,
                height: 50,
                background: "#FFFFFF",
                border: "1px solid rgba(245,166,35,0.45)",
                boxShadow:
                  "0 0 14px rgba(245,166,35,0.35), inset 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <img
                src={logoUrl}
                alt="Century TechX LLP logo"
                className="block w-full h-full object-cover"
                style={{ transform: "scale(1.05)" }}
              />
            </span>
            <span className="sr-only">Century TechX LLP — Home</span>
          </a>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="relative font-rajdhani font-medium text-[13px] tracking-[0.12em] text-[var(--text-secondary)] hover:text-[var(--neon)] transition-colors duration-200 group"
              >
                {n.label}
                <span
                  className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ background: "#F5A623", boxShadow: "0 0 6px #F5A623" }}
                />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center font-orbitron font-bold text-[11px] tracking-[0.15em] text-black px-5 py-[10px] rounded-[3px] transition-all duration-200"
            style={{ background: "#F5A623" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FFB830";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(245,166,35,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#F5A623";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            INITIALIZE //
          </a>

          {/* Hamburger */}
          <button
            className="lg:hidden text-[var(--neon)] p-2"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={2.5} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[200] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(3,5,6,0.98)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-[var(--neon)]">
            <X size={28} />
          </button>
        </div>
        <nav className="flex flex-col items-center gap-6 mt-10">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="font-orbitron font-bold text-2xl tracking-[0.15em] text-[var(--text-primary)] hover:text-[var(--neon)]"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-6 font-orbitron font-bold text-sm tracking-[0.15em] text-black px-6 py-3 rounded-[3px]"
            style={{ background: "#F5A623" }}
          >
            INITIALIZE //
          </a>
        </nav>
      </div>
    </>
  );
}
