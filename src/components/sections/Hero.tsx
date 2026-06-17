"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Icon from "@/components/Icon";
import { profile } from "@/data/portfolio";

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

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display text-metallic mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-gradient mt-5 text-xl font-medium md:text-3xl"
        >
          {profile.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-muted"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
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
