"use client";

import { Download, FileText } from "lucide-react";

export default function ResumePage() {
  const resumeUrl = "/Haris_Resume.pdf"; // Path to your file in the public folder

  return (
    <main className="min-h-screen pt-24 pb-12 px-6 bg-slate-950 flex flex-col items-center">
      {/* Header Section */}
      <div className="max-w-4xl w-full flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <FileText className="text-indigo-500" /> Resume
          </h1>
          <p className="text-slate-400 mt-2">
            Senior CS Student | Machine Learning & Data Science
          </p>
        </div>

        <a
          href={resumeUrl}
          download="Haris_Resume.pdf"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          <Download size={20} />
          Download PDF
        </a>
      </div>

      {/* PDF Preview Container */}
      <div className="max-w-5xl w-full h-[75vh] bg-slate-900/50 rounded-2xl border border-slate-800 p-2 overflow-hidden shadow-2xl backdrop-blur-sm">
        <iframe
          src={`${resumeUrl}#view=FitH`}
          className="w-full h-full rounded-xl border-none"
          title="Haris Resume Preview"
        />
      </div>

      {/* Mobile Hint */}
      <p className="mt-4 text-slate-500 text-sm md:hidden">
        Note: If the preview doesn't load on your mobile, please use the download button above.
      </p>
    </main>
  );
}