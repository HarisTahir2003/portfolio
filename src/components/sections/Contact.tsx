import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { Mail, Sparkles } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function Contact() {
  // Email is shown in the Direct Contact card, so exclude it from the social row.
  const socials = profile.social.filter((s) => s.icon !== "mail");

  return (
    <section id="contact" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* LEFT: heading + direct contact + socials */}
          <Reveal>
            <div>
              {/* Heading */}
              <span className="eyebrow">05 — Contact</span>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
                Let&apos;s <span className="text-gradient">talk</span>
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-ink-muted">
                Open to roles, collaborations, and interesting problems. Drop a
                message and I&apos;ll get back to you.
              </p>

              {/* Direct Contact card */}
              <div className="mt-8 rounded-2xl border border-border bg-bg-card p-6 md:p-7">
                <div className="flex items-center gap-2.5">
                  <Sparkles size={18} className="text-accent" />
                  <h3 className="font-semibold text-ink">Direct Contact</h3>
                </div>

                <a
                  href={`mailto:${profile.email}`}
                  className="group mt-6 flex items-center gap-4"
                >
                  <span className="rounded-full bg-accent-soft p-3 text-accent">
                    <Mail size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-ink-faint">
                      Email me at
                    </span>
                    <span className="block truncate font-medium text-ink transition-colors group-hover:text-accent">
                      {profile.email}
                    </span>
                  </span>
                </a>
              </div>

              {/* Connect with me */}
              <div className="mt-8">
                <p className="eyebrow">Connect with me</p>
                <div className="mt-4 flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="rounded-xl border border-border bg-bg-card p-3.5 text-ink-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      <Icon name={s.icon} size={22} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: form card */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-bg-card p-6 md:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
