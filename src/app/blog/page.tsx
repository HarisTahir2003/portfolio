import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    title: "Understanding RAG: Improving LLM Accuracy with Context",
    excerpt: "A deep dive into Retrieval-Augmented Generation and how it solves the 'hallucination' problem in large language models.",
    date: "Dec 15, 2025",
    readingTime: "8 min read",
    tags: ["LLM", "RAG", "AI"],
    slug: "understanding-rag"
  },
  {
    title: "Fine-tuning LoRA Models on a MacBook Pro",
    excerpt: "A guide on optimizing memory usage and managing disk space when fine-tuning small language models locally.",
    date: "Dec 05, 2025",
    readingTime: "6 min read",
    tags: ["MLOps", "Fine-tuning", "Python"],
    slug: "lora-finetuning-guide"
  },
  {
    title: "The Power of Multi-Agent Systems in Software Dev",
    excerpt: "Exploring how multiple AI agents can debate and refine ideas to reach a consensus in complex project environments.",
    date: "Nov 28, 2025",
    readingTime: "10 min read",
    tags: ["Multi-Agent", "Architecture", "Design"],
    slug: "multi-agent-systems"
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 bg-slate-950 text-slate-50">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Blog & <span className="text-indigo-500">Writings</span>
          </h2>
          <p className="text-slate-400 max-w-2xl">
            Technical articles where I break down complex Machine Learning concepts, 
            share project post-mortems, and explore the future of AI.
          </p>
        </div>

        {/* Blog Posts List */}
        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <article 
              key={index} 
              className="group relative p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-col gap-4">
                {/* Meta Data */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {post.readingTime}
                  </span>
                  <div className="flex gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-indigo-400">#{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read More Link */}
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="flex items-center gap-2 text-indigo-400 font-semibold group/link"
                >
                  Read Article 
                  <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}