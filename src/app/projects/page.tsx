"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, FileText, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

// --- TYPE DEFINITIONS ---
type Contribution = {
  title: string;
  content: string;
};

type ProjectDetails = {
  overview: string;
  contributions: Contribution[];
};

type Project = {
  category: string;
  title: string;
  description: string;
  details: ProjectDetails;
  tags: string[];
  githubUrl: string;
  images: string[];
  pdfs: { name: string; url: string }[];
};

// --- DATA ---
const projects: Project[] = [
  // Project 1
  {
    category: "Software Engineering",
    title: "HealthSync - Mobile Healthcare Platform",
    description: "Mobile app simplifying hospital appointments by connecting patients directly with verified doctors.",
    details: {
      overview: "Led a team of five in the end-to-end development of HealthSync, a mobile application designed to democratize healthcare access by eliminating third-party intermediaries and connecting patients directly with verified doctors.",
      contributions: [
        {
          title: "Full-Stack Architecture",
          content: "Developed a cross-platform mobile experience using React Native (TypeScript) for the frontend and Django (Python) with MongoDB for the backend."
        },
        {
          title: "Real-Time Communication",
          content: "Integrated live chat and automated email notifications to facilitate seamless, real-time interactions between medical professionals and patients."
        },
        {
          title: "Secure Infrastructure",
          content: "Implemented a robust doctor verification system using Firebase Storage for secure credential management and DeepSeek API for intelligent system features."
        },
        {
          title: "Deployment & Impact",
          content: "Engineered features for appointment booking and API-based messaging, aiming to provide a scalable solution for underserved communities."
        }
      ]
    },
    tags: ["React Native", "Firebase", "Django", "MongoDB", "Software Project Management", "TypeScript", "Android Mobile Development"],
    githubUrl: "https://github.com/HarisTahir2003/SE-Project-Group-9",
    images: [
      "/healthsync-1.png", 
      "/healthsync-2.png",
      "/healthsync-3.png",
      "/healthsync-4.png", 
      "/healthsync-5.png",
      "/healthsync-6.png"
    ], 
    pdfs: [ { name: "Project Report", url: "/HealthSync_Report.pdf" } ]
  },

  // Project 2
  {
    category: "DL/GenAI",
    title: "Multi-Stage Financial Intelligence System",
    description: "Agentic system for automated extraction, summarization, and cross-document analysis of SEC 10-K filings.",
    details: {
      overview: "Designed and implemented a modular agentic NLP system for high-fidelity financial intelligence over dense SEC 10-K filings, enabling automated QnA, summarization, and multi-year trend inference.",
      contributions: [
        {
          title: "RAG-based Financial QnA",
          content: "Built a Retrieval-Augmented Generation pipeline using Gemini 2.0 Flash and ChromaDB, significantly improving factual faithfulness using prompt chaining and few-shot strategies.",
        },
        {
          title: "Earnings Call Summarization",
          content: "Engineered an LLM-powered summarization engine achieving a 4.39/5.0 G-Eval coherence score for professional investment memos.",
        },
        {
          title: "Agentic Financial Analysis",
          content: "Designed a Plan-and-Execute agent capable of multi-year cross-document financial analysis with custom Python calculator tools.",
        },
        {
          title: "Document Engineering",
          content: "Implemented semantic chunking and HTML-to-Markdown table conversion to preserve complex financial tables.",
        },
      ],
    },
    tags: ["RAG", "LangChain", "ChromaDB", "Gemini", "Financial Analysis", "Prompt Engineering"],
    githubUrl: "https://github.com/HarisTahir2003/NLP_Applications_for_Financial_Reports",
    images: ["Fin-1.png", "Fin-2.png", "Fin-3.png"],
    pdfs: [ { name: "Project Report", url: "/Finance_Project_Report.pdf" } ],
  },

  // Project 3
  {
    category: "AI/ML",
    title: "Urdu Text Classification using Machine Learning models",
    description: "End-to-end NLP pipeline for classifying Urdu news articles across multiple categories.",
    details: {
      overview: "Developed a comprehensive NLP pipeline for Urdu-language news classification, addressing challenges of low-resource language processing.",
      contributions: [
        {
          title: "Data Collection",
          content: "Scraped and curated 2,750+ Urdu news articles from multiple websites using custom Python scrapers.",
        },
        {
          title: "Linguistic Preprocessing",
          content: "Applied Urdu-specific normalization, stemming, lemmatization, and stopword removal using the LughaatNLP library.",
        },
        {
          title: "Model Benchmarking",
          content: "Evaluated Naive Bayes, Logistic Regression, and Neural Network models for multi-class classification.",
        },
        {
          title: "Performance Optimization",
          content: "Achieved a top accuracy of 97.45% and a 0.97 F1-score using the feedforward neural network model.",
        },
      ],
    },
    tags: ["Machine Learning", "NLP", "Naive Bayes", "Neural Networks", "Logistic Regression", "Web Scraping"],
    githubUrl: "https://github.com/HarisTahir2003/Machine-Learning-Project",
    images: [],
    pdfs: [ { name: "Project Report", url: "/ML_Project_Report.pdf" } ],
  },

  // Project 4
  {
    category: "AI/ML",
    title: "Micro-Robot Motion Trajectory Prediction",
    description: "Predictive modeling of micro-robot trajectories in obstacle-dense environments.",
    details: {
      overview: "Built a machine learning system to forecast micro-robot motion paths using temporal feature engineering and classical regression techniques.",
      contributions: [
        {
          title: "Algorithm Design",
          content: "Implemented a K-Nearest Neighbors (KNN) model from scratch with custom distance metrics.",
        },
        {
          title: "Time-Series Engineering",
          content: "Designed lookback-window feature extraction to model temporal dependencies in motion data.",
        },
        {
          title: "Model Evaluation",
          content: "Analyzed RMSE trends across varying hyperparameters to optimize prediction accuracy.",
        },
        {
          title: "Visualization",
          content: "Built trajectory visualizations to compare predicted vs actual robot motion paths.",
        },
      ],
    },
    tags: ["Machine Learning", "Time Series", "KNN", "Regression Trees", "Scikit-Learn", "Data Visualization",],
    githubUrl: "https://github.com/HarisTahir2003/AI_Project",
    images: ["AIProj-1.png", "AIProj-2.png"],
    pdfs: [],
  },
  // ... Add other projects here with the same structure
];

const categories = ["All", "AI/ML", "DL/GenAI", "Software Engineering"];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter Logic
  const filteredProjects = projects.filter((project) => 
    activeFilter === "All" ? true : project.category === activeFilter
  );

  // --- LIGHTBOX LOGIC ---
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = useCallback(() => {
    if (selectedProject && lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % selectedProject.images.length);
    }
  }, [selectedProject, lightboxIndex]);

  const prevImage = useCallback(() => {
    if (selectedProject && lightboxIndex !== null) {
      setLightboxIndex((prev) => 
        prev! === 0 ? selectedProject.images.length - 1 : prev! - 1
      );
    }
  }, [selectedProject, lightboxIndex]);

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);


  return (
    <main className="min-h-screen pt-32 pb-16 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header & Filters (Same as before) */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Featured <span className="text-indigo-500">Projects</span>
            </h2>
            <p className="text-slate-400 max-w-xl font-mono text-sm">
              Machine Learning, GenAI & Full Stack Software Engineering
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                  activeFilter === cat 
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-lg" 
                    : "bg-slate-900/50 text-slate-400 border-slate-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.title} 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- DETAILED MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto"
          >
            <motion.div
              layoutId={`card-${selectedProject.title}`}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-950 border border-slate-800 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative my-8"
            >
              {/* Modal Header */}
              <div className="bg-slate-900/50 p-8 border-b border-slate-800 relative">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
                <span className="text-indigo-400 font-mono text-xs uppercase tracking-widest mb-2 block">
                  {selectedProject.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white">{selectedProject.title}</h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-indigo-500/10 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {/* Description & Key Contributions */}
                <div className="prose prose-invert max-w-none mb-10">
                  <h4 className="text-xl font-bold text-white mb-2">Description</h4>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    {selectedProject.details.overview}
                  </p>
                  
                  <h4 className="text-xl font-bold text-white mb-4">Key Contributions & Technical Stack</h4>
                  <ul className="space-y-3">
                    {selectedProject.details.contributions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                        <span>
                          <strong className="text-white">{item.title}:</strong> {item.content}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image Gallery Thumbnails */}
                {selectedProject.images.length > 0 && (
                  <div className="mb-10">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <ImageIcon size={20} className="text-indigo-400"/> Project Gallery
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedProject.images.map((img, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => openLightbox(idx)}
                          className="aspect-video rounded-xl bg-slate-800 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-slate-700"
                        >
                          <img src={img} alt="Project screenshot" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PDF Documents */}
                {selectedProject.pdfs.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <FileText size={20} className="text-indigo-400"/> Documents
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {selectedProject.pdfs.map((pdf, idx) => (
                        <a 
                          key={idx}
                          href={pdf.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-slate-900 border border-slate-700 rounded-xl hover:border-indigo-500 hover:bg-slate-800 transition-all group"
                        >
                          <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-indigo-600 transition-colors">
                            <FileText size={24} className="text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{pdf.name}</p>
                            <p className="text-xs text-slate-500">View PDF</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-6 border-t border-slate-800">
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                  >
                    <Github size={20} /> View Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LIGHTBOX OVERLAY --- */}
      <AnimatePresence>
        {lightboxIndex !== null && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center backdrop-blur-xl"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-50">
              <X size={28} />
            </button>

            {/* Navigation Buttons */}
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-10 p-4 rounded-full bg-white/10 text-white hover:bg-indigo-600 hover:scale-110 transition-all z-50"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-10 p-4 rounded-full bg-white/10 text-white hover:bg-indigo-600 hover:scale-110 transition-all z-50"
            >
              <ChevronRight size={32} />
            </button>

            {/* The Image */}
            <motion.img 
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedProject.images[lightboxIndex]}
              alt="Full screen project preview"
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
            
            {/* Counter */}
            <div className="absolute bottom-6 text-slate-400 font-mono text-sm">
              {lightboxIndex + 1} / {selectedProject.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}