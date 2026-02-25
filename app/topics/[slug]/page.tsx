import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticlesByTopic, getTopics } from "@/lib/content";

export function generateStaticParams() {
  return getTopics().map((t) => ({ slug: t.slug }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = getArticlesByTopic(slug);
  const topic = getTopics().find((t) => t.slug === slug);

  if (!topic) return notFound();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900 md:px-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700">
          ← Back home
        </Link>
        <h1 className="mt-3 text-3xl font-semibold">{topic.name}</h1>
        <p className="mt-1 text-zinc-600">{topic.count} articles</p>

        <div className="mt-6 space-y-2">
          {articles.map((item) => (
            <Link
              href={`/articles/${item.slug}`}
              key={item.slug}
              className="block rounded-xl border border-zinc-200 bg-white p-4 shadow-sm hover:bg-zinc-100"
            >
              <p className="font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-zinc-500">
                {item.source} · {item.minutes} min
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
