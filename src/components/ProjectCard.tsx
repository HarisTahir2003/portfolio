import { Github, ExternalLink } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
}

const ProjectCard = ({ title, description, tags, githubUrl, demoUrl }: ProjectProps) => {
  return (
    <div className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <div className="flex gap-3 text-slate-400">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Github size={20} />
          </a>
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
      
      <p className="text-slate-400 text-sm mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span 
            key={tag} 
            className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;