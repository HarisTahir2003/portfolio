"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Award, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Portal from "@/components/Portal";
import TechMarquee from "@/components/TechMarquee";
import {
  skillCategories,
  certificates,
  type Certificate,
} from "@/data/portfolio";

export default function Skills() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedCert ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  return (
    <section id="skills" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="05 — Skills"
          title="Technical"
          accent="toolkit"
          description="The languages, frameworks, and concepts I work with day to day."
        />

        {/* Sliding tech-logo marquee */}
        <Reveal>
          <div className="mb-16 rounded-2xl border border-border bg-bg-card/50 py-6">
            <TechMarquee />
          </div>
        </Reveal>

        {/* Skill groups */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, index) => (
            <Reveal key={cat.title} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-bg-card p-6 transition-colors hover:border-border-strong">
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-accent">
                    <Icon name={cat.icon} size={22} />
                  </span>
                  <h3 className="font-semibold text-ink">{cat.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 text-sm text-ink-muted"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Certificates */}
        <div className="mt-20">
          <Reveal>
            <h3 className="font-display mb-8 flex items-center gap-3 text-2xl font-semibold text-ink">
              <Award className="text-accent" /> Certifications
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {certificates.map((cert, index) => (
              <Reveal key={cert.title} delay={index * 0.05}>
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="group w-full rounded-2xl border border-border bg-bg-card p-4 text-left transition-colors hover:border-border-strong"
                >
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-bg">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 90vw, 360px"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-bg/60 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-bg">
                        View
                      </span>
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-ink">{cert.title}</h4>
                  <p className="text-xs text-ink-faint">{cert.issuer}</p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate modal (portaled to body) */}
      <Portal>
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-2xl border border-border bg-bg-elevated p-2 shadow-2xl"
            >
              <button
                onClick={() => setSelectedCert(null)}
                aria-label="Close"
                className="absolute -top-12 right-0 p-2 text-white hover:text-accent"
              >
                <X size={28} />
              </button>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <div className="p-5 text-center">
                <h4 className="text-lg font-semibold text-ink">
                  {selectedCert.title}
                </h4>
                <p className="text-sm text-ink-muted">{selectedCert.issuer}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </Portal>
    </section>
  );
}
