import type { Metadata } from "next";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Blog — Haris Tahir Rana",
  description:
    "Technical writing on Machine Learning, generative AI, and software engineering.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen px-6 pb-20 pt-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-14">
          <span className="eyebrow">Writing</span>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Blog & <span className="text-gradient">Notes</span>
          </h1>
          <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">
            Technical articles where I break down Machine Learning concepts,
            share project post-mortems, and explore the future of AI.
          </p>
        </div>

        <div className="space-y-5">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-border bg-bg-card p-7 transition-all hover:border-accent"
            >
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-ink-faint">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} /> {post.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} /> {post.readingTime}
                </span>
                <span className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-accent">
                      #{tag}
                    </span>
                  ))}
                </span>
              </div>

              <h2 className="font-display mt-3 text-xl font-semibold text-ink transition-colors group-hover:text-accent-bright md:text-2xl">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-2 leading-relaxed text-ink-muted">
                {post.excerpt}
              </p>

              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Read article
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
