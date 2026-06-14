import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { Mail } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="05 — Contact"
          title="Let's"
          accent="talk"
          description="Open to roles, collaborations, and interesting problems. Drop a message and I'll get back to you."
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {/* Info */}
          <Reveal>
            <div>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 text-lg text-ink transition-colors hover:text-accent"
              >
                <span className="rounded-lg border border-border bg-bg-card p-2.5 text-accent">
                  <Mail size={20} />
                </span>
                {profile.email}
              </a>

              <div className="mt-8 flex gap-3">
                {profile.social.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="rounded-lg border border-border bg-bg-card p-3 text-ink-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon name={s.icon} size={22} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form */}
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
