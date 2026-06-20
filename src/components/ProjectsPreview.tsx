"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Github,
  X,
  FileText,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Portal from "@/components/Portal";
import type { Project } from "@/data/portfolio";

type LightboxState = { images: string[]; index: number } | null;

/* -------------------------------------------------------------------------- */
/*  One full-detail project panel (mirrors the project-card modal)            */
/* -------------------------------------------------------------------------- */

function Panel({
  project,
  index,
  total,
  onImageClick,
}: {
  project: Project;
  index: number;
  total: number;
  onImageClick: (images: string[], i: number) => void;
}) {
  const hasMedia = project.images.length > 0 || project.pdfs.length > 0;

  return (
    <div className="flex h-screen w-screen shrink-0 items-center px-8 py-16 md:px-16 lg:px-24">
      <div
        className={`mx-auto grid w-full max-w-7xl items-center gap-10 lg:gap-16 ${
          hasMedia ? "lg:grid-cols-2" : "lg:grid-cols-1"
        }`}
      >
        {/* LEFT — text (uses the full panel height, no internal scroll) */}
        <div>
          <span className="font-display text-xs font-semibold tracking-[0.3em] text-accent">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          <span className="eyebrow mt-2 block">{project.category}</span>
          <h2 className="font-display mt-2 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {project.title}
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border bg-accent-soft px-3 py-1 text-xs font-medium text-accent-bright"
                style={{ borderColor: "var(--accent-ring)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h4 className="mt-7 text-xs font-semibold uppercase tracking-wider text-ink-faint">
            Overview
          </h4>
          <p className="mt-2 leading-relaxed text-ink-muted">
            {project.details.overview}
          </p>

          <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-faint">
            Key Contributions
          </h4>
          <ul className="mt-3 space-y-2.5">
            {project.details.contributions.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted md:text-base"
              >
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span>
                  <strong className="text-ink">{item.title}:</strong>{" "}
                  {item.content}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — media: images (click to expand) + PDFs + GitHub */}
        {hasMedia && (
          <div>
            {project.images.length > 0 && (
              <>
                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  <ImageIcon size={15} className="text-accent" /> Gallery
                </h4>
                <div
                  className={`mt-3 grid gap-3 ${
                    project.images.length > 2 ? "grid-cols-3" : "grid-cols-2"
                  }`}
                >
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => onImageClick(project.images, idx)}
                      className="aspect-video overflow-hidden rounded-lg border border-border bg-bg-card transition-opacity hover:opacity-80"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}

            {project.pdfs.length > 0 && (
              <div className={project.images.length > 0 ? "mt-6" : ""}>
                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  <FileText size={15} className="text-accent" /> Documents
                </h4>
                <div className="mt-3 flex flex-wrap gap-3">
                  {project.pdfs.map((pdf, idx) => (
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

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-bright"
            >
              <Github size={18} /> View Source
            </a>
          </div>
        )}

        {/* No media → GitHub link sits under the text */}
        {!hasMedia && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-bright"
          >
            <Github size={18} /> View Source
          </a>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scroll-driven horizontal gallery (mounted only while open)                */
/* -------------------------------------------------------------------------- */

function Gallery({
  projects,
  onClose,
  onImageClick,
}: {
  projects: Project[];
  onClose: () => void;
  onImageClick: (images: string[], i: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const n = projects.length;

  const { scrollYProgress } = useScroll({ container: scrollRef });

  const end = `-${((n - 1) / n) * 100}%`;
  const xRaw = useTransform(scrollYProgress, [0, 1], ["0%", end]);
  const x = useSpring(xRaw, { stiffness: 80, damping: 20, mass: 0.4 });

  return (
    <>
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close full preview"
        className="fixed right-5 top-5 z-[220] rounded-full border border-border bg-bg-card/80 p-2.5 text-ink-muted backdrop-blur transition-colors hover:border-accent hover:text-accent"
      >
        <X size={22} />
      </button>

      {/* Hint */}
      <div className="pointer-events-none fixed left-1/2 top-6 z-[215] -translate-x-1/2 text-xs font-medium uppercase tracking-[0.25em] text-ink-faint">
        Scroll to explore →
      </div>

      {/* Scroll container drives the horizontal track */}
      <div ref={scrollRef} className="fixed inset-0 z-[205] overflow-y-auto">
        <div style={{ height: `${n * 100}vh` }}>
          <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
            <motion.div style={{ x }} className="flex">
              {projects.map((project, i) => (
                <Panel
                  key={project.title}
                  project={project}
                  index={i}
                  total={n}
                  onImageClick={onImageClick}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        className="fixed bottom-0 left-0 z-[220] h-1 w-full bg-accent"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Fullscreen image lightbox (within the preview overlay)                    */
/* -------------------------------------------------------------------------- */

function Lightbox({
  state,
  onClose,
  onPrev,
  onNext,
}: {
  state: NonNullable<LightboxState>;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-xl"
    >
      <button
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-6 top-6 z-50 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20"
      >
        <X size={26} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="absolute left-4 z-50 rounded-full bg-white/10 p-3.5 text-white transition-all hover:bg-accent hover:text-bg md:left-10"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute right-4 z-50 rounded-full bg-white/10 p-3.5 text-white transition-all hover:bg-accent hover:text-bg md:right-10"
      >
        <ChevronRight size={30} />
      </button>

      <motion.img
        key={state.index}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        src={state.images[state.index]}
        alt="Project preview"
        className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      <div className="absolute bottom-6 font-mono text-sm text-ink-faint">
        {state.index + 1} / {state.images.length}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Overlay wrapper                                                           */
/* -------------------------------------------------------------------------- */

export default function ProjectsPreview({
  projects,
  open,
  onClose,
}: {
  projects: Project[];
  open: boolean;
  onClose: () => void;
}) {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const nextImage = useCallback(
    () =>
      setLightbox((s) =>
        s ? { ...s, index: (s.index + 1) % s.images.length } : s
      ),
    []
  );
  const prevImage = useCallback(
    () =>
      setLightbox((s) =>
        s
          ? { ...s, index: s.index === 0 ? s.images.length - 1 : s.index - 1 }
          : s
      ),
    []
  );

  // Close the preview (and any open lightbox with it)
  const handleClose = useCallback(() => {
    setLightbox(null);
    onClose();
  }, [onClose]);

  // Body-scroll lock + key handling (Esc precedence: lightbox first, then preview)
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (lightbox) {
        if (e.key === "Escape") closeLightbox();
        else if (e.key === "ArrowRight") nextImage();
        else if (e.key === "ArrowLeft") prevImage();
        return;
      }
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lightbox, handleClose, closeLightbox, nextImage, prevImage]);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-bg"
          >
            <Gallery
              projects={projects}
              onClose={handleClose}
              onImageClick={(images, index) => setLightbox({ images, index })}
            />
            <AnimatePresence>
              {lightbox && (
                <Lightbox
                  state={lightbox}
                  onClose={closeLightbox}
                  onPrev={prevImage}
                  onNext={nextImage}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
