"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Github,
  FileText,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import Portal from "@/components/Portal";
import { projects, projectCategories, type Project } from "@/data/portfolio";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredProjects = projects.filter((p) =>
    activeFilter === "All" ? true : p.category === activeFilter
  );

  /* ---------------- Lightbox ---------------- */
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = useCallback(() => {
    if (selectedProject && lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % selectedProject.images.length);
    }
  }, [selectedProject, lightboxIndex]);

  const prevImage = useCallback(() => {
    if (selectedProject && lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev! === 0 ? selectedProject.images.length - 1 : prev! - 1
      );
    }
  }, [selectedProject, lightboxIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, nextImage, prevImage]);

  // Lock body scroll while modal/lightbox is open
  useEffect(() => {
    const open = selectedProject !== null;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeading
              eyebrow="03 — Projects"
              title="Selected"
              accent="work"
              description="Machine learning, generative AI, and full-stack engineering."
            />
          </div>

          {/* Filters */}
          <div className="mb-12 flex flex-wrap gap-2 md:mb-16">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  activeFilter === cat
                    ? "border-accent bg-accent text-bg"
                    : "border-border text-ink-muted hover:border-border-strong hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                rank={index + 1}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ---------------- Detail modal (portaled to body) ---------------- */}
      <Portal>
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={(e) => e.stopPropagation()}
              className="relative my-8 w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-2xl"
            >
              {/* Header */}
              <div className="relative border-b border-border bg-bg-card p-7 md:p-8">
                <button
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close"
                  className="absolute right-5 top-5 rounded-full bg-bg p-2 text-ink-muted transition-colors hover:text-ink"
                >
                  <X size={20} />
                </button>
                <span className="eyebrow">{selectedProject.category}</span>
                <h3 className="font-display mt-2 text-2xl font-semibold text-ink md:text-3xl">
                  {selectedProject.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-accent-soft px-3 py-1 text-xs font-medium text-accent-bright"
                      style={{ borderColor: "var(--accent-ring)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="custom-scrollbar max-h-[68vh] overflow-y-auto p-7 md:p-8">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
                  Overview
                </h4>
                <p className="mt-2 leading-relaxed text-ink-muted">
                  {selectedProject.details.overview}
                </p>

                <h4 className="mt-8 text-sm font-semibold uppercase tracking-wider text-ink-faint">
                  Key Contributions
                </h4>
                <ul className="mt-3 space-y-3">
                  {selectedProject.details.contributions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-ink-muted">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <span>
                        <strong className="text-ink">{item.title}:</strong>{" "}
                        {item.content}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Gallery */}
                {selectedProject.images.length > 0 && (
                  <div className="mt-8">
                    <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-faint">
                      <ImageIcon size={16} className="text-accent" /> Gallery
                    </h4>
                    <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
                      {selectedProject.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setLightboxIndex(idx)}
                          className="aspect-video overflow-hidden rounded-lg border border-border bg-bg-card transition-opacity hover:opacity-80"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img}
                            alt={`${selectedProject.title} screenshot ${idx + 1}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* PDFs */}
                {selectedProject.pdfs.length > 0 && (
                  <div className="mt-8">
                    <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-faint">
                      <FileText size={16} className="text-accent" /> Documents
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {selectedProject.pdfs.map((pdf, idx) => (
                        <a
                          key={idx}
                          href={pdf.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 rounded-xl border border-border bg-bg-card p-3.5 transition-all hover:border-accent"
                        >
                          <span className="rounded-lg bg-bg p-2 text-accent transition-colors group-hover:bg-accent group-hover:text-bg">
                            <FileText size={20} />
                          </span>
                          <span>
                            <span className="block text-sm font-medium text-ink">
                              {pdf.name}
                            </span>
                            <span className="block text-xs text-ink-faint">
                              View PDF
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-8 border-t border-border pt-6">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-bg transition-colors hover:bg-accent-bright"
                  >
                    <Github size={18} /> View Source
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </Portal>

      {/* ---------------- Lightbox (portaled to body) ---------------- */}
      <Portal>
      <AnimatePresence>
        {lightboxIndex !== null && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-xl"
          >
            <button
              aria-label="Close"
              className="absolute right-6 top-6 z-50 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20"
            >
              <X size={26} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
              className="absolute left-4 z-50 rounded-full bg-white/10 p-3.5 text-white transition-all hover:bg-accent hover:text-bg md:left-10"
            >
              <ChevronLeft size={30} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
              className="absolute right-4 z-50 rounded-full bg-white/10 p-3.5 text-white transition-all hover:bg-accent hover:text-bg md:right-10"
            >
              <ChevronRight size={30} />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedProject.images[lightboxIndex]}
              alt="Project preview"
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 font-mono text-sm text-ink-faint">
              {lightboxIndex + 1} / {selectedProject.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </Portal>
    </section>
  );
}
