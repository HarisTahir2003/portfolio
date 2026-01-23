"use client";

import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectProps {
  project: any;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectProps) => {
  return (
    <motion.div
      layoutId={`card-${project.title}`}
      onClick={onClick}
      className="group relative cursor-pointer p-6 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/60 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>
        <div className="p-2 rounded-full bg-slate-800 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
          <ArrowUpRight size={20} />
        </div>
      </div>
      
      <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag: string) => (
          <span 
            key={tag} 
            className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="px-3 py-1 text-xs font-medium rounded-full text-slate-500">
            +{project.tags.length - 3} more
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;