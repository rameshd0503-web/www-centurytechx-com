/**
 * HeroFX — Light-theme VFX layer for the hero:
 *   • Two soft, slowly drifting blue/navy gradient blobs
 *   • Subtle dotted grid
 *   • A faint conic shimmer
 * Pure CSS animations, GPU-friendly, pointer-events: none.
 */
export function HeroFX() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Dotted grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(30,58,95,0.10) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, #000 35%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, #000 35%, transparent 75%)",
        }}
      />

      {/* Blob 1 — vibrant blue */}
      <div
        className="absolute rounded-full"
        style={{
          width: 520,
          height: 520,
          left: "-8%",
          top: "10%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.28) 0%, rgba(37,99,235,0) 65%)",
          filter: "blur(20px)",
          animation: "blob-drift-a 18s ease-in-out infinite",
        }}
      />

      {/* Blob 2 — navy */}
      <div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          right: "-10%",
          top: "30%",
          background:
            "radial-gradient(circle, rgba(30,58,95,0.22) 0%, rgba(30,58,95,0) 65%)",
          filter: "blur(24px)",
          animation: "blob-drift-b 22s ease-in-out infinite",
        }}
      />

      {/* Blob 3 — sky accent */}
      <div
        className="absolute rounded-full"
        style={{
          width: 380,
          height: 380,
          left: "45%",
          top: "55%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0) 65%)",
          filter: "blur(18px)",
          animation: "blob-drift-c 26s ease-in-out infinite",
        }}
      />

      {/* Conic shimmer line */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: 1200,
          height: 1200,
          marginLeft: -600,
          marginTop: -600,
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(37,99,235,0.08) 25deg, transparent 50deg, transparent 360deg)",
          animation: "shimmer-rotate 28s linear infinite",
          opacity: 0.6,
          maskImage:
            "radial-gradient(circle, transparent 35%, #000 55%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 35%, #000 55%, transparent 75%)",
        }}
      />
    </div>
  );
}
