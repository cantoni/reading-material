import Link from "next/link";
import { getAllArticles, getTopics } from "@/lib/content";
import { getResearchPosts } from "@/lib/research";

export default function Home() {
  const articles = getAllArticles();
  const topics = getTopics();
  const todaysReading = articles[0];
  const researchPosts = getResearchPosts().slice(0, 4);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10 md:px-10">
        <header className="space-y-3">
          <p className="text-sm font-medium text-zinc-500">reading-material</p>
          <h1 className="text-3xl font-semibold tracking-tight">Bob’s Reading + Research Hub</h1>
          <p className="max-w-2xl text-zinc-600">
            One site for curated reading and daily research updates.
          </p>
          <nav className="flex gap-2 text-sm">
            <Link href="/research" className="rounded-full border border-zinc-300 px-3 py-1 hover:bg-zinc-100">
              Research Updates
            </Link>
            <Link href="/topics/ai-workflows" className="rounded-full border border-zinc-300 px-3 py-1 hover:bg-zinc-100">
              Reading Library
            </Link>
          </nav>
        </header>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-500">Latest research updates</p>
            <Link href="/research" className="text-sm text-zinc-600 hover:text-zinc-900">
              View all →
            </Link>
          </div>
          <div className="space-y-2">
            {researchPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/research/${post.slug}`}
                className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 hover:bg-zinc-100"
              >
                <p className="font-medium">{post.title}</p>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                  {post.kind === "ai" ? "AI" : "Polymarket"}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {todaysReading && (
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm font-medium text-zinc-500">Today’s reading</p>
            <h2 className="text-2xl font-semibold">{todaysReading.title}</h2>
            <p className="mt-2 text-zinc-600">{todaysReading.summary}</p>
            <p className="mt-3 text-sm text-zinc-500">
              {todaysReading.source} · {todaysReading.minutes} min read
            </p>
            <div className="mt-4 flex gap-2">
              <Link
                href={`/articles/${todaysReading.slug}`}
                className="inline-flex rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
              >
                Read in hub
              </Link>
              <a
                href={todaysReading.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
              >
                Open source
              </a>
            </div>
          </section>
        )}

        <section>
          <h3 className="mb-3 text-lg font-semibold">Topics</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {topics.map((topic) => (
              <Link
                href={`/topics/${topic.slug}`}
                key={topic.slug}
                className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm hover:bg-zinc-100"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{topic.name}</h4>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                    {topic.count} saved
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-lg font-semibold">Reading queue</h3>
          <div className="space-y-2">
            {articles.map((item) => (
              <Link
                href={`/articles/${item.slug}`}
                key={item.slug}
                className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm hover:bg-zinc-100"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-zinc-500">{item.source}</p>
                </div>
                <p className="text-sm text-zinc-500">{item.minutes} min</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
