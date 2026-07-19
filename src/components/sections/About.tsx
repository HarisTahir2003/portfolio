"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, X } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Portal from "@/components/Portal";
import { profile } from "@/data/portfolio";

export default function About() {
  const [cvOpen, setCvOpen] = useState(false);

  // Lock body scroll while the CV modal is open
  useEffect(() => {
    document.body.style.overflow = cvOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cvOpen]);

  // Close on Escape
  useEffect(() => {
    if (!cvOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCvOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cvOpen]);

  return (
    <section id="about" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="01 — About" title="A bit" accent="about me" />

        <div className="mt-12 grid grid-cols-1 items-stretch gap-10 md:grid-cols-3">
          {/* Portrait */}
          <div className="md:col-span-1">
            <Reveal className="h-full">
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-card p-2 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.photo}
                  className="h-full w-full flex-1 rounded-xl object-cover grayscale transition duration-500 hover:grayscale-0"
                  alt={profile.name}
                />
              </div>
            </Reveal>
          </div>
          
          {/* IDE Window */}
          <div className="md:col-span-2">
            <Reveal delay={0.1} className="h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-[#0f172a] shadow-2xl">
                {/* Window Header */}
                <div className="flex items-center gap-2 border-b border-border bg-bg-card px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 font-sans text-xs text-ink-muted">about.py — portfolio</span>
                </div>
                {/* Code Content */}
                <div className="flex-1 overflow-x-auto whitespace-nowrap p-6 font-mono text-sm leading-relaxed text-white md:p-8 md:text-base">
                  <p><span className="text-blue-400">developer</span> <span className="text-purple-400">=</span> {"{"}</p>
                  <p className="ml-4"><span className="text-green-400">&quot;name&quot;</span>: <span className="text-green-400">&quot;{profile.name}&quot;</span>,</p>
                  <p className="ml-4"><span className="text-green-400">&quot;role&quot;</span>: <span className="text-green-400">&quot;{profile.education}&quot;</span>,</p>
                  <p className="ml-4"><span className="text-green-400">&quot;focus&quot;</span>: [<span className="text-green-400">&quot;Software Engineering&quot;</span>, <span className="text-green-400">&quot;AI Automation&quot;</span>],</p>
                  <p className="ml-4 flex whitespace-normal">
                    <span className="shrink-0 text-green-400">&quot;bio&quot;:&nbsp;</span>
                    <span className="text-green-400">&quot;{profile.longBio[0]}&quot;,</span>
                  </p>
                <p className="ml-4"><span className="text-green-400">&quot;location&quot;</span>: <span className="text-green-400">&quot;{profile.location}&quot;</span>,</p>
                <p className="ml-4"><span className="text-green-400">&quot;resume&quot;</span>: <span className="text-purple-400">lambda</span>: <span className="text-yellow-300">download</span>(<span className="text-green-400">&quot;Haris_Resume.pdf&quot;</span>)</p>
                <p>{"}"}</p>
                <br />
                <button 
                  onClick={() => setCvOpen(true)} 
                  className="mt-4 rounded border border-green-500/30 bg-slate-800 px-6 py-3 text-green-400 shadow-lg transition hover:bg-slate-700"
                >
                  &gt;_ python -c &quot;developer[&apos;resume&apos;]()&quot;
                </button>
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* CV modal (portaled to body) */}
      <Portal>
        <AnimatePresence>
          {cvOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCvOpen(false)}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                onClick={(e) => e.stopPropagation()}
                className="flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-2xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-4 border-b border-border bg-bg-card px-5 py-4">
                  <h3 className="font-display flex items-center gap-2 text-lg font-semibold text-ink">
                    <FileText size={20} className="text-accent" />
                    Curriculum Vitae
                  </h3>
                  <div className="flex items-center gap-2">
                    <a
                      href={profile.resumeUrl}
                      download="Haris_Resume.pdf"
                      className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
                    >
                      <Download size={16} />
                      Download
                    </a>
                    <button
                      onClick={() => setCvOpen(false)}
                      aria-label="Close"
                      className="rounded-full bg-bg p-2 text-ink-muted transition-colors hover:text-ink"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* PDF preview */}
                <iframe
                  src={`${profile.resumeUrl}#view=FitH`}
                  className="h-full w-full border-none bg-bg"
                  title={`${profile.name} CV`}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </section>
  );
}
