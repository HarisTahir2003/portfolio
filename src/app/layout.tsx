import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreeScene from "@/components/ThreeScene";
import CursorGlow from "@/components/CursorGlow";
import { profile } from "@/data/portfolio";

// Clean, technical body font
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Refined serif for headings — gives the editorial, "less-AI" feel.
// Fraunces is a variable font; omitting `weight` loads the full axis range.
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.shortBio,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.shortBio,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-ink min-h-screen flex flex-col relative antialiased">
        {/* Fixed 3D background (scroll-reactive, pointer-events disabled) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ThreeScene />
        </div>

        {/* Site-wide cursor glow (above bg, below content, never blocks clicks) */}
        <CursorGlow />

        {/* Content sits above the background */}
        <div className="relative z-10 flex flex-col flex-grow">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
