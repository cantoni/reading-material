import Link from "next/link";
import { getResearchPosts } from "@/lib/research";

export default function ResearchPage() {
  const posts = getResearchPosts();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700">
          ← Back home
        </Link>

        <h1 className="mt-3 text-3xl font-semibold">Research Updates</h1>
        <p className="mt-1 text-zinc-600">
          Daily AI workflow updates and Polymarket paper picks.
        </p>

        <div className="mt-6 space-y-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/research/${post.slug}`}
              className="block rounded-xl border border-zinc-200 bg-white p-4 shadow-sm hover:bg-zinc-100"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">{post.title}</p>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                  {post.kind === "ai" ? "AI" : "Polymarket"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
