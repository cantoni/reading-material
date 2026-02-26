import Link from "next/link";
import { notFound } from "next/navigation";
import { getResearchPostBySlug, getResearchPosts } from "@/lib/research";

export function generateStaticParams() {
  return getResearchPosts().map((p) => ({ slug: p.slug }));
}

export default async function ResearchPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getResearchPostBySlug(slug);

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900 md:px-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/research" className="text-sm text-zinc-500 hover:text-zinc-700">
          ← Back to research updates
        </Link>

        <article className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-2">
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
              {post.kind === "ai" ? "AI Workflow" : "Polymarket"}
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
          <div className="mt-4 whitespace-pre-line leading-7 text-zinc-800">
            {post.content}
          </div>
        </article>
      </div>
    </main>
  );
}
