import {
  siTypescript,
  siReact,
  siHtml5,
  siCss,
  siSupabase,
  siVercel,
  siPytorch,
  siPython,
  siLangchain,
  siHuggingface,
  siScikitlearn,
  siPandas,
  siNumpy,
  siGit,
} from "simple-icons";
import { BarChart3, type LucideIcon } from "lucide-react";

type SI = { title: string; hex: string; path: string };

// slug (from portfolio.ts) → simple-icons object
const ICONS: Record<string, SI> = {
  typescript: siTypescript,
  react: siReact,
  html5: siHtml5,
  css: siCss,
  supabase: siSupabase,
  vercel: siVercel,
  pytorch: siPytorch,
  python: siPython,
  langchain: siLangchain,
  huggingface: siHuggingface,
  scikitlearn: siScikitlearn,
  pandas: siPandas,
  numpy: siNumpy,
  git: siGit,
};

// Lighten brand colors that are too dark to read on a dark background.
const COLOR_OVERRIDES: Record<string, string> = {
  vercel: "#ffffff",
  pandas: "#A371F7", // pandas' navy → its lighter purple accent
  numpy: "#4DABCF", // NumPy's navy → its lighter blue accent
  git: "#F03C2E",
};

// Fallback (lucide) icons for brands simple-icons doesn't ship.
const FALLBACK: Record<string, { icon: LucideIcon; color: string }> = {
  STATA: { icon: BarChart3, color: "#5DA9E9" },
  "Power BI": { icon: BarChart3, color: "#F2C811" },
};

export function getBrandColor(slug: string | null, name: string): string {
  if (slug && COLOR_OVERRIDES[slug]) return COLOR_OVERRIDES[slug];
  if (slug && ICONS[slug]) return `#${ICONS[slug].hex}`;
  if (FALLBACK[name]) return FALLBACK[name].color;
  return "#94a3b8"; // ink-muted fallback
}

export default function SimpleIcon({
  slug,
  name,
  size = 24,
  className,
}: {
  slug: string | null;
  name: string;
  size?: number;
  className?: string;
}) {
  // Brand we have a real SVG for
  if (slug && ICONS[slug]) {
    const icon = ICONS[slug];
    return (
      <svg
        role="img"
        aria-label={name}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        className={className}
      >
        <path d={icon.path} />
      </svg>
    );
  }

  // Fallback: lucide icon (STATA, Power BI, or anything unknown)
  const Fb = FALLBACK[name]?.icon ?? BarChart3;
  return <Fb size={size} className={className} aria-label={name} />;
}
