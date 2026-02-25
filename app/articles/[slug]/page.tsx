import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return notFound();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900 md:px-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700">
          ← Back home
        </Link>

        <article className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">{article.title}</h1>
          <p className="mt-2 text-sm text-zinc-500">
            {article.source} · {article.minutes} min · {article.date}
          </p>
          <p className="mt-4 leading-7 text-zinc-700">{article.summary}</p>

          <div className="mt-4 whitespace-pre-line leading-7 text-zinc-800">
            {article.content}
          </div>

          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
          >
            Open source article
          </a>
        </article>
      </div>
    </main>
  );
}
