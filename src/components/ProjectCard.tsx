"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
  /** importance rank shown as a faint watermark */
  rank: number;
  onClick: () => void;
};

export default function ProjectCard({
  project,
  rank,
  onClick,
}: ProjectCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="group relative flex h-full cursor-pointer flex-col rounded-2xl border border-border bg-bg-card p-6 text-left transition-all duration-300 hover:border-accent hover:shadow-[0_0_0_1px_var(--accent-ring),0_20px_40px_-20px_rgba(0,0,0,0.6)]"
    >
      <div className="flex h-full flex-col">
        <div className="mb-3 flex items-start justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            <span className="text-ink-faint">
              {String(rank).padStart(2, "0")}
            </span>{" "}
            · {project.category}
          </span>
          <span className="rounded-full bg-bg p-2 text-ink-faint transition-all group-hover:bg-accent group-hover:text-bg">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-accent-bright">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-3 flex-grow text-sm leading-relaxed text-ink-muted">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-ink-muted"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-1 py-0.5 text-xs text-ink-faint">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}
