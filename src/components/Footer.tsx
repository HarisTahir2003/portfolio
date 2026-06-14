"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { profile, sectionLinks, routeLinks } from "@/data/portfolio";

export default function Footer() {
  const links = [...sectionLinks, ...routeLinks];

  return (
    <footer className="relative border-t border-border bg-bg pb-24 sm:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
        {/* Branding */}
        <div>
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-ink"
          >
            Haris<span className="text-accent">.</span>
          </Link>
          <p className="mt-2 text-sm text-ink-faint">
            ©{" "}
            <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
            {profile.name}. All rights reserved.
          </p>
        </div>

        {/* Quick links */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-accent"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {profile.social.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="text-ink-muted transition-all hover:scale-110 hover:text-accent"
            >
              <Icon name={s.icon} size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
