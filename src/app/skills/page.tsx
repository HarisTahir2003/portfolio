"use client";
import { useState } from "react";
import { Code2, Terminal, Cpu, Database, Award, X } from "lucide-react";
import Image from "next/image";

const skillCategories = [
  {
    title: "Languages",
    icon: <Code2 className="text-indigo-500" />,
    skills: ["Python (Primary)", "SQL", "C++", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frameworks",
    icon: <Cpu className="text-indigo-500" />,
    skills: ["PyTorch", "LangChain", "HuggingFace", "Pandas", "NumPy", "Scikit-Learn"],
  },
  {
    title: "Tools",
    icon: <Terminal className="text-indigo-500" />,
    skills: ["Git", "STATA", "Power BI", "MS Excel"],
  },
  {
    title: "Concepts",
    icon: <Database className="text-indigo-500" />,
    skills: ["Deep Learning", "Natural Language Processing", "Feature Engineering", "RAG Systems", "Multi-Agent Systems"],
  },
];

const certificates = [
  {
    title: "Data Analytics Essentials",
    issuer: "Cisco",
    image: "/certificate1.jpg", // Replace with your file in /public
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    image: "/certificate2.jpg", // Replace with your file in /public
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco",
    image: "/certificate3.jpg", // Replace with your file in /public
  },
];

export default function SkillsPage() {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  return (
    <main className="min-h-screen pt-32 pb-16 px-6 bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-indigo-500">Skills</span>
          </h2>
          <p className="text-slate-400 max-w-2xl">
            A breakdown of my technical toolkit, categorized by languages, frameworks, and core ML concepts.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {skillCategories.map((cat, index) => (
            <div key={index} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-all">
              <div className="flex items-center gap-3 mb-6">
                {cat.icon}
                <h3 className="text-lg font-bold">{cat.title}</h3>
              </div>
              <ul className="space-y-3">
                {cat.skills.map((skill) => (
                  <li key={skill} className="text-slate-400 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certificates Section */}
        <div>
          <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
            <Award className="text-indigo-500" /> Professional Certificates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <div 
                key={index}
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all"
              >
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-slate-800">
                  <Image 
                    src={cert.image} 
                    alt={cert.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-slate-950 px-4 py-2 rounded-full text-xs font-bold">View Certificate</span>
                  </div>
                </div>
                <h4 className="font-bold text-sm mb-1">{cert.title}</h4>
                <p className="text-xs text-slate-500">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Pop-up */}
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl p-2 shadow-2xl border border-slate-800">
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 text-white hover:text-indigo-400 p-2"
              >
                <X size={32} />
              </button>
              <div className="relative aspect-[4/3] w-full">
                <Image 
                  src={selectedCert.image} 
                  alt={selectedCert.title} 
                  fill 
                  className="object-contain"
                />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold mb-1">{selectedCert.title}</h4>
                <p className="text-slate-400">{selectedCert.issuer}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}