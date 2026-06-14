"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 3500;

/**
 * Deterministic pseudo-random in [0,1) from an integer seed.
 * Pure (no Math.random), so it's safe to call during render / in useMemo
 * and keeps the particle cloud stable across re-renders.
 */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function ParticleField() {
  const group = useRef<THREE.Group>(null!);
  const points = useRef<THREE.Points>(null!);

  // eased scroll progress (0→1) + cursor position, driven by listeners below
  const scrollTarget = useRef(0);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  // Static base positions: a soft spherical cloud (denser toward the center)
  const { positions, base } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // deterministic direction on a sphere (3 decorrelated seeds per point)
      const theta = 2 * Math.PI * rand(i * 3 + 1);
      const phi = Math.acos(2 * rand(i * 3 + 2) - 1);
      // bias radius inward (cube root → cluster toward center) for a soft volume
      const r = 2.4 * Math.cbrt(rand(i * 3 + 3));
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    // keep an immutable copy to flow around each frame
    return { positions, base: positions.slice() };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      scrollTarget.current = Math.min(1, Math.max(0, window.scrollY / max));
    };
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useFrame((state, delta) => {
    // ease toward the scroll target for smooth, buttery motion
    progress.current += (scrollTarget.current - progress.current) * 0.06;
    const p = progress.current;
    const t = state.clock.elapsedTime;

    if (group.current) {
      // slow continuous drift + scroll-coupled rotation
      group.current.rotation.y += delta * 0.04;
      group.current.rotation.x = p * Math.PI * 0.35 + Math.sin(t * 0.1) * 0.05;

      // subtle parallax toward cursor (eased)
      group.current.position.x +=
        (pointer.current.x * 0.25 - group.current.position.x) * 0.03;
      group.current.position.y +=
        (-pointer.current.y * 0.2 - p * 0.6 - group.current.position.y) * 0.03;

      // gentle push back + scale as you scroll
      group.current.position.z = -p * 1.2;
      group.current.scale.setScalar(1 + p * 0.25);
    }

    // "flow" the points: drift each one along a smooth noise-ish field
    if (points.current) {
      const geo = points.current.geometry;
      const arr = geo.getAttribute("position") as THREE.BufferAttribute;
      const a = arr.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3;
        const bx = base[ix];
        const by = base[ix + 1];
        const bz = base[ix + 2];
        // small sinusoidal offsets keyed off the base position + time
        a[ix] = bx + Math.sin(t * 0.3 + by * 1.5) * 0.06;
        a[ix + 1] = by + Math.cos(t * 0.25 + bz * 1.5) * 0.06;
        a[ix + 2] = bz + Math.sin(t * 0.2 + bx * 1.5) * 0.06;
      }
      arr.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.014}
          sizeAttenuation
          depthWrite={false}
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 h-screen w-full overflow-hidden bg-bg">
      {/* Static grid + radial glow behind the particles */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 35%, rgba(59,130,246,0.12), transparent 70%)",
        }}
      />

      {/* Canvas mounts client-side only (this is a "use client" component) */}
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 50 }}
        style={{ height: "100vh", width: "100%" }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
      >
        <ParticleField />
      </Canvas>

      {/* Bottom fade so content reads cleanly over the scene */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
