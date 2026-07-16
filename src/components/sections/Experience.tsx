"use client";

import { useState } from "react";
import { Briefcase, MapPin, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { experiences, type Experience as ExperienceType } from "@/data/portfolio";

function ExperienceItem({ exp }: { exp: ExperienceType }) {
  const [open, setOpen] = useState(false);
  const hasBullets = exp.description.length > 0 || Boolean(exp.summary);

  return (
    <div className="relative">
      {/* Date pill — sits in the left gutter, right-aligned with a clear gap
          before the timeline line (desktop). On mobile it stacks above the
          header (no room in the gutter). */}
      <div className="mb-3 sm:absolute sm:left-0 sm:top-0.5 sm:mb-0 sm:w-[8.25rem] sm:text-right md:w-[9.25rem]">
        <span className="inline-flex items-center rounded-full border border-border bg-bg-card px-3 py-1 text-[11px] font-medium text-ink-muted whitespace-nowrap">
          {exp.duration}
        </span>
      </div>

      {/* Timeline node dot, centered on the line */}
      <span
        className={`absolute left-0 top-1.5 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 sm:block ${
          exp.featured
            ? "border-accent bg-accent shadow-[0_0_12px_var(--accent-ring)]"
            : "border-border-strong bg-bg"
        }`}
        style={{ left: "var(--line-x)" }}
        aria-hidden
      />

      {/* Content (right of the line) */}
      <div className="sm:pl-[calc(var(--line-x)+1.5rem)]">
        {/* Clickable header toggles the bullets */}
        <button
          type="button"
          onClick={() => hasBullets && setOpen((v) => !v)}
          aria-expanded={hasBullets ? open : undefined}
          className={`group flex w-full items-start justify-between gap-4 text-left ${
            hasBullets ? "cursor-pointer" : "cursor-default"
          }`}
        >
          <span className="min-w-0">
            <h3 className="text-xl font-semibold text-ink md:text-2xl">
              {exp.role}
            </h3>
            <span className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
              <span className="inline-flex items-center gap-1.5 font-medium text-accent">
                <Briefcase size={14} /> {exp.company}
              </span>
              <span className="inline-flex items-center gap-1.5 text-ink-faint">
                <MapPin size={14} /> {exp.location}
              </span>
            </span>
          </span>

          {hasBullets && (
            <span className="mt-1 shrink-0 rounded-full border border-border p-1.5 text-ink-muted transition-colors group-hover:border-accent group-hover:text-accent">
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </span>
          )}
        </button>

        {/* Collapsible bullets */}
        <AnimatePresence initial={false}>
          {open && hasBullets && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden"
            >
              {/* Lead paragraph (LinkedIn "Description") — no bullet, brighter
                  than the list below so it reads as an intro. */}
              {exp.summary && (
                <p className="mt-4 border-l-2 border-border pl-4 leading-relaxed text-ink">
                  {exp.summary}
                </p>
              )}

              {exp.description.length > 0 && (
                <ul className="mt-4 space-y-2.5">
                  {exp.description.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex gap-3 leading-relaxed text-ink-muted"
                    >
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="02 — Experience"
          title="Where I've"
          accent="worked"
          description="Research, engineering, and analysis roles across medical imaging, web development, finance, and sustainability."
        />

        {/* `--line-x` is where the vertical timeline line sits (left gutter
            holds the date pills). The line is drawn as an absolute element. */}
        <div
          className="relative [--line-x:9.5rem] md:[--line-x:10.5rem]"
        >
          {/* Vertical timeline line (desktop only) */}
          <span
            className="absolute top-1 bottom-1 hidden w-px bg-border sm:block"
            style={{ left: "var(--line-x)" }}
            aria-hidden
          />

          {/* Vertical spacing between entries lives here (space-y), so it
              applies BETWEEN items and nothing after the last one. */}
          <div className="space-y-20 md:space-y-24">
            {experiences.map((exp, index) => (
              <Reveal key={`${exp.company}-${index}`} delay={index * 0.05}>
                <ExperienceItem exp={exp} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
