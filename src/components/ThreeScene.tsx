/**
 * Static hero backdrop: a subtle grid + radial glow + bottom fade.
 * (The animated 3D particle field was removed per design — this keeps the
 *  quiet background it sat on.)
 */
export default function ThreeScene() {
  return (
    <div className="absolute inset-0 h-screen w-full overflow-hidden bg-bg">
      {/* Static grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Soft radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 35%, rgba(59,130,246,0.12), transparent 70%)",
        }}
      />

      {/* Bottom fade so content reads cleanly over the scene */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
