"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Icon from "@/components/Icon";
import { profile } from "@/data/portfolio";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

function ScrambleText({
  text,
  animate,
  start,
  onDone,
  className,
  scrambleColor,
  finalColor,
  as: Tag = "span",
}: {
  text: string;
  animate: boolean;
  start: boolean;
  onDone?: () => void;
  className?: string;
  scrambleColor: string;
  finalColor: string;
  as?: React.ElementType;
}) {
  const [iterations, setIterations] = useState<number[]>([]);

  useEffect(() => {
    if (!animate || !start) return;

    let isCancelled = false;
    const textArray = Array.from(text);
    const maxIterationsArray = textArray.map((_, i) => 3 + i * 1);
    const currentIterations = textArray.map(() => 0);

    let animationFrameId: number;
    let lastTime = performance.now();

    const tick = (time: number) => {
      if (isCancelled) return;

      if (time - lastTime < 25) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }
      lastTime = time;

      let allDone = true;
      for (let i = 0; i < currentIterations.length; i++) {
        if (currentIterations[i] < maxIterationsArray[i]) {
          currentIterations[i]++;
          allDone = false;
        }
      }

      setIterations([...currentIterations]);

      if (allDone) {
        if (onDone) onDone();
      } else {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, animate, start]);

  if (!animate) {
    return <Tag className={className}>{text}</Tag>;
  }

  if (!start && iterations.length === 0) {
    return <Tag className={className}><span className="opacity-0">{text}</span></Tag>;
  }

  const textArray = Array.from(text);
  const maxIterationsArray = textArray.map((_, i) => 3 + i * 1);

  return (
    <Tag className={className}>
      {textArray.map((char, i) => {
        if (char === " ") return <span key={i}> </span>;
        
        const isDecoded = iterations[i] >= maxIterationsArray[i];
        const displayChar = isDecoded 
          ? char 
          : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          
        return (
          <span 
            key={i} 
            className={isDecoded ? finalColor : scrambleColor}
            style={isDecoded ? { textShadow: "0 0 10px rgba(255,255,255,0.2)" } : undefined}
          >
            {displayChar}
          </span>
        );
      })}
    </Tag>
  );
}

// Decorative, non-interactive code snippets scattered in the background.
const SNIPPETS: { code: string; className: string }[] = [
  {
    code: `BEGIN;
SELECT stock INTO current_stock
FROM inventory
WHERE item_id = $1 FOR UPDATE;

UPDATE inventory
SET stock = current_stock - $2
WHERE item_id = $1;
COMMIT;`,
    className: "right-6 top-28 md:right-16 lg:right-24",
  },
  {
    code: `const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  temperature: 0.1,
  messages: [
    { role: "system", content: "Extract structured data." },
    { role: "user", content: docText }
  ]
});`,
    className: "right-4 bottom-40 md:right-20 lg:right-28",
  },
  {
    code: `const { data, error } = await supabase
  .from('workflows')
  .select('*, steps(*)')
  .eq('status', 'active');

if (error) throw error;
return Response.json(data);`,
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

        <ScrambleText 
          text={profile.name}
          animate={animate}
          start={true}
          onDone={() => setStep("title")}
          as="h1"
          className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl font-mono"
          scrambleColor="text-green-400"
          finalColor="text-white"
        />

        <ScrambleText
          text={profile.title.toUpperCase()}
          animate={animate}
          start={effectiveStep !== "name"}
          onDone={() => setStep("rest")}
          as="p"
          className="mt-5 text-xl tracking-widest font-mono text-center"
          scrambleColor="text-accent"
          finalColor="text-accent-bright"
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
