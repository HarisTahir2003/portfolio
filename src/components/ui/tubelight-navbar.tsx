"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
  /** render this item as a standout CTA (e.g. Contact) */
  cta?: boolean;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  /** optional default active item name (defaults to the first item) */
  defaultActive?: string;
}

export function NavBar({ items, className, defaultActive }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(defaultActive ?? items[0].name);

  // Scroll-spy: highlight the section whose top is nearest a line ~1/3 down
  // the viewport. Position-based (not IntersectionObserver) so it always
  // resolves to exactly one section, even for sections taller than the screen.
  useEffect(() => {
    const anchored = items.filter((i) => i.url.startsWith("/#"));
    if (anchored.length === 0) return;

    const getEl = (item: NavItem) =>
      document.getElementById(item.url.slice(2));

    const onScroll = () => {
      const line = window.innerHeight * 0.33;
      let current = anchored[0];
      let bestDist = Infinity;

      for (const item of anchored) {
        const el = getEl(item);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        // sections at/above the line are candidates; pick the closest one
        if (top - line <= 1) {
          const dist = Math.abs(top - line);
          if (dist <= bestDist) {
            bestDist = dist;
            current = item;
          }
        }
      }

      // near the bottom of the page, force the last anchored item active
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) current = anchored[anchored.length - 1];

      setActiveTab(current.name);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <div
      className={cn(
        // The outer wrapper spans a wide area (centering + padding); make it
        // click-through so its empty space doesn't intercept clicks on the
        // content beneath. Only the inner pill re-enables pointer events.
        "pointer-events-none fixed bottom-0 left-1/2 z-[100] mb-6 -translate-x-1/2 sm:top-0 sm:mb-0 sm:pt-6",
        className
      )}
    >
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-bg/70 px-1 py-1 shadow-lg backdrop-blur-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                "text-ink-muted hover:text-accent",
                isActive && "text-accent",
                // Standout CTA (e.g. Contact): filled accent pill, crisp white text
                item.cta &&
                  "bg-accent !text-white hover:!text-white hover:bg-accent-bright shadow-md shadow-accent/30"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>

              {/* Tubelight indicator — only for non-CTA active items */}
              {isActive && !item.cta && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 -z-10 w-full rounded-full bg-accent/10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-accent">
                    <div className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-accent/20 blur-md" />
                    <div className="absolute -top-1 h-6 w-8 rounded-full bg-accent/20 blur-md" />
                    <div className="absolute left-2 top-0 h-4 w-4 rounded-full bg-accent/20 blur-sm" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
