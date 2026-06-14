"use client";

import { useEffect, useRef } from "react";

/**
 * A soft blue radial glow that follows the cursor across the whole page.
 * Fixed, behind content, and strictly pointer-events-none so it never
 * intercepts clicks.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = "1";
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    apply();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(59,130,246,0.10), transparent 70%)",
      }}
    />
  );
}
