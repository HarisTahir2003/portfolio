"use client";

import { MapPin, GraduationCap } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProfileCard from "@/components/ProfileCard";
import { profile } from "@/data/portfolio";

export default function About() {
  const linkedIn = profile.social.find((s) => s.icon === "linkedin")?.href;
  // LinkedIn vanity slug → shown as @handle on the card
  const handle = linkedIn
    ? linkedIn.replace(/\/+$/, "").split("/").pop() || "haristahirrana"
    : "haristahirrana";

  const scrollToContact = () =>
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="about" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="01 — About" title="A bit" accent="about me" />

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-5 md:gap-16">
          {/* Profile card */}
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
    </section>
  );
}
