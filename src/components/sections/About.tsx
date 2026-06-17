"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, GraduationCap, FileText, Download, X } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProfileCard from "@/components/ProfileCard";
import Portal from "@/components/Portal";
import { profile } from "@/data/portfolio";

export default function About() {
  const linkedIn = profile.social.find((s) => s.icon === "linkedin")?.href;
  // LinkedIn vanity slug → shown as @handle on the card
  const handle = linkedIn
    ? linkedIn.replace(/\/+$/, "").split("/").pop() || "haristahirrana"
    : "haristahirrana";

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

  const scrollToContact = () =>
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="about" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="01 — About" title="A bit" accent="about me" />

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-5 md:gap-16">
          {/* Profile card + View CV */}
          <div className="md:col-span-2">
            <Reveal>
              <div className="mx-auto w-full max-w-[360px]">
                <ProfileCard
                  name={profile.name}
                  title={profile.title}
                  handle={handle}
                  handleUrl={linkedIn}
                  status="Building things"
                  contactText="Contact Me"
                  avatarUrl={profile.avatar}
                  avatarFallbackUrl={profile.photo}
                  miniAvatarUrl={profile.photo}
                  showUserInfo
                  enableTilt
                  enableMobileTilt
                  onContactClick={scrollToContact}
                />

                <button
                  type="button"
                  onClick={() => setCvOpen(true)}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-bg-card px-5 py-3 font-semibold text-ink transition-all hover:border-accent hover:text-accent"
                >
                  <FileText size={18} />
                  View CV
                </button>
              </div>
            </Reveal>
          </div>

          {/* Bio */}
          <div className="md:col-span-3">
            <Reveal delay={0.1}>
              <div className="space-y-5 text-lg leading-relaxed text-ink-muted">
                {profile.longBio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-4 py-2 text-sm text-ink">
                  <MapPin size={16} className="text-accent" />
                  {profile.location}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-4 py-2 text-sm text-ink">
                  <GraduationCap size={16} className="text-accent" />
                  {profile.education}
                </span>
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
