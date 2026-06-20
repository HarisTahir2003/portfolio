"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Icon from "@/components/Icon";
import { profile } from "@/data/portfolio";

// --- Hero text animation ---
const NAME_CHARS = Array.from(profile.name); // Array.from = surrogate-safe split
const BLUR_LETTERS = true; // kill-switch for WebKit clip+blur quirks

const nameContainer: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.15, staggerChildren: 0.045 } },
};
const nameLetter: Variants = {
  hidden: {
    opacity: 0,
    y: "0.45em",
    filter: BLUR_LETTERS ? "blur(6px)" : "blur(0px)",
  },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: {
      y: { type: "spring", stiffness: 380, damping: 30, mass: 0.7 },
      opacity: { duration: 0.35, ease: "easeOut" },
      filter: { duration: 0.4, ease: "easeOut" },
    },
  },
};

/** Per-letter staggered metallic reveal + one shine sweep. Calls onDone when
 *  the last letter has settled (or immediately when animation is skipped). */
function AnimatedName({ animate, onDone }: { animate: boolean; onDone: () => void }) {
  const [shineOn, setShineOn] = useState(false);

  // Not animating (SSR/first paint/reduced motion) → plain visible heading.
  if (!animate) {
    return (
      <h1 className="font-display text-metallic mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
        {profile.name}
      </h1>
    );
  }

  const lastIndex = NAME_CHARS.length - 1;
  return (
    <motion.h1
      variants={nameContainer}
      initial="hidden"
      animate="visible"
      aria-label={profile.name}
      className={`name-metallic font-display relative mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl ${
        shineOn ? "is-shining" : ""
      }`}
    >
      {NAME_CHARS.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          variants={nameLetter}
          onAnimationComplete={
            i === lastIndex
              ? () => {
                  setShineOn(true);
                  onDone();
                }
              : undefined
          }
          className="name-letter inline-block whitespace-pre will-change-transform"
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </motion.h1>
  );
}

const TITLE_CHARS = Array.from(profile.title);
const TITLE_STAGGER = 0.065; // ~65ms per character

/** Per-character title reveal. The gradient lives on the parent (so it stays
 *  whole — slicing a clipped gradient per-char would break it); each character
 *  is an inline span whose opacity is staggered in left-to-right, with a caret
 *  riding the reveal edge. Fires onDone when the last char appears. */
function Typewriter({
  animate,
  start,
  onDone,
}: {
  animate: boolean;
  start: boolean;
  onDone: () => void;
}) {
  const [done, setDone] = useState(false);

  // Static (SSR / first paint / reduced motion): full title, no animation.
  if (!animate) {
    return (
      <p className="text-gradient mt-5 text-xl font-medium md:text-3xl">
        {profile.title}
      </p>
    );
  }

  const lastIndex = TITLE_CHARS.length - 1;
  return (
    <p
      aria-label={profile.title}
      className="mt-5 inline-flex items-center justify-center text-xl font-medium md:text-3xl"
    >
      <motion.span
        className="text-gradient"
        initial="hidden"
        animate={start ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: TITLE_STAGGER } },
        }}
      >
        {TITLE_CHARS.map((ch, i) => (
          <motion.span
            key={i}
            aria-hidden
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.01 } },
            }}
            onAnimationComplete={
              i === lastIndex
                ? () => {
                    setDone(true);
                    onDone();
                  }
                : undefined
            }
            className="whitespace-pre"
          >
            {ch}
          </motion.span>
        ))}
      </motion.span>
      {!done && (
        <span
          aria-hidden
          className="animate-caret-blink ml-0.5 inline-block h-[1em] w-[0.08em] bg-accent-bright align-middle"
        />
      )}
    </p>
  );
}

// Decorative, non-interactive code snippets scattered in the background.
const SNIPPETS: { code: string; className: string }[] = [
  {
    code: `import torch
import torch.nn as nn

class ResNet(nn.Module):
    def __init__(self):
        super(ResNet, self).__init__()`,
    className: "right-6 top-28 md:right-16 lg:right-24",
  },
  {
    code: `# Analyzing fiscal impact
df['growth_rate'] = df['gdp'].pct_change()
model.fit(X_train, y_train)`,
    className: "right-4 bottom-40 md:right-20 lg:right-28",
  },
  {
    code: `model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)`,
    className: "left-4 bottom-28 md:left-12 lg:left-20",
  },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  // Sequence steps: name → title → rest. When not animating, jump straight to "rest".
  const [step, setStep] = useState<"name" | "title" | "rest">("name");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- post-hydration mount gate: SSR/first paint render the static (non-animated) hero; animation begins only client-side to avoid a hydration mismatch
    setMounted(true);
  }, []);

  const animate = mounted && !reduce;
  // When animation is off, everything is shown at once (rest = all visible).
  const effectiveStep = animate ? step : "rest";
  const showRest = effectiveStep === "rest";

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-6"
    >
      {/* Decorative background layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
      >
        {/* faint code snippets */}
        {SNIPPETS.map((s, i) => (
          <pre
            key={i}
            className={`absolute hidden whitespace-pre font-mono text-[11px] leading-relaxed text-accent/15 md:block md:text-xs ${s.className}`}
          >
            {s.code}
          </pre>
        ))}

        {/* circuit line + dots (top-left) */}
        <svg
          className="absolute left-0 top-24 h-40 w-80 text-accent/20"
          viewBox="0 0 320 160"
          fill="none"
        >
          <path
            d="M0 40 H120 L160 80 H320"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="120" cy="40" r="2.5" className="fill-accent/50" />
          <circle cx="160" cy="80" r="2.5" className="fill-accent/50" />
        </svg>

        {/* glowing dots */}
        <span className="absolute left-1/4 top-1/3 h-1.5 w-1.5 rounded-full bg-accent/60 blur-[1px]" />
        <span className="absolute right-1/4 bottom-1/3 h-2 w-2 rounded-full bg-accent/40 blur-[2px]" />
        <span className="absolute right-[18%] top-1/2 h-1 w-1 rounded-full bg-accent/50 blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
        >
          {profile.education} · {profile.location}
        </motion.p>

        <AnimatedName animate={animate} onDone={() => setStep("title")} />

        <Typewriter
          animate={animate}
          start={effectiveStep !== "name"}
          onDone={() => setStep("rest")}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={showRest ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-muted"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showRest ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-white transition-all hover:bg-accent-bright"
          >
            View Work
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <Link
            href="/#contact"
            className="rounded-full border border-border-strong px-7 py-3.5 font-semibold text-ink transition-all hover:border-accent hover:text-accent"
          >
            Get in Touch
          </Link>

          {/* divider before socials */}
          <span className="ml-1 hidden h-px w-10 bg-border sm:block" />

          <div className="flex items-center gap-1">
            {profile.social.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="rounded-full p-2.5 text-ink-muted transition-colors hover:text-accent"
              >
                <Icon name={s.icon} size={20} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
