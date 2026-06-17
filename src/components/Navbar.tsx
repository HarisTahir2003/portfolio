"use client";

import Link from "next/link";
import { User, Briefcase, FolderGit2, Cpu, Mail } from "lucide-react";
import { NavBar, type NavItem } from "@/components/ui/tubelight-navbar";

// Section links + Resume route + a standout Contact CTA.
// Icons are shown on mobile (labels on desktop).
const navItems: NavItem[] = [
  { name: "About", url: "/#about", icon: User },
  { name: "Experience", url: "/#experience", icon: Briefcase },
  { name: "Projects", url: "/#projects", icon: FolderGit2 },
  { name: "Skills", url: "/#skills", icon: Cpu },
  { name: "Contact", url: "/#contact", icon: Mail, cta: true },
];

export default function Navbar() {
  return (
    <>
      {/* Logo — fixed top-left, above the floating bar */}
      <Link
        href="/"
        className="font-display fixed left-6 top-5 z-[110] text-lg font-semibold tracking-tight text-ink md:left-10"
      >
        Haris<span className="text-accent">.</span>
      </Link>

      {/* Tubelight navigation bar (bottom on mobile, top-center on desktop) */}
      <NavBar items={navItems} defaultActive="About" />
    </>
  );
}
