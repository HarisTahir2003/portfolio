import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/portfolio";

type Params = { slug: string };

// Pre-render every known post at build time
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — Haris Tahir Rana`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen px-6 pb-20 pt-32">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} /> All posts
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-medium text-ink-faint">
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

        <h1 className="font-display mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
          {post.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          {post.excerpt}
        </p>

        <div className="mt-10 space-y-5 leading-relaxed text-ink-muted">
          {post.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
