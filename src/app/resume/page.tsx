import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `Resume — ${profile.name}`,
  description: `Resume of ${profile.name}, ${profile.title}.`,
};

export default function ResumePage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-16 pt-28">
      {/* Header */}
      <div className="mb-8 flex w-full max-w-5xl flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-display flex items-center gap-3 text-3xl font-semibold text-ink md:text-4xl">
            <FileText className="text-accent" /> Resume
          </h1>
          <p className="mt-2 text-ink-muted">{profile.title}</p>
        </div>

        <a
          href={profile.resumeUrl}
          download="Haris_Resume.pdf"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-bg transition-all hover:bg-accent-bright active:scale-[0.98]"
        >
          <Download size={20} />
          Download PDF
        </a>
      </div>

      {/* Preview */}
      <div className="h-[75vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-bg-card p-2">
        <iframe
          src={`${profile.resumeUrl}#view=FitH`}
          className="h-full w-full rounded-xl border-none"
          title={`${profile.name} resume preview`}
        />
      </div>

      <p className="mt-4 text-sm text-ink-faint md:hidden">
        If the preview doesn&apos;t load on mobile, use the download button
        above.
      </p>
    </main>
  );
}
