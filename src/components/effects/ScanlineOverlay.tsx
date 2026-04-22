export function ScanlineOverlay() {
  return (
    <>
      {/* Scanlines */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none scanline-bg"
        style={{ zIndex: 9999 }}
      />
      {/* Film grain SVG */}
      <svg
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        className="fixed inset-0 pointer-events-none w-full h-full"
        style={{ zIndex: 9998, opacity: "var(--grain-opacity)" }}
      >
        <defs>
          <filter id="ctx-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 0.65  0 0 0 0 0.14  0 0 0 0.4 0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#ctx-grain)" />
      </svg>
    </>
  );
}
