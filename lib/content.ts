import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Article = {
  title: string;
  slug: string;
  topic: string;
  source: string;
  url: string;
  minutes: number;
  summary: string;
  date: string;
  content: string;
};

const contentDir = path.join(process.cwd(), "content", "articles");

function readMarkdownFiles() {
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));
}

export function getAllArticles(): Article[] {
  return readMarkdownFiles()
    .map((file) => {
      const fullPath = path.join(contentDir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      return {
        title: String(data.title ?? "Untitled"),
        slug: String(data.slug ?? file.replace(/\.md$/, "")),
        topic: String(data.topic ?? "general"),
        source: String(data.source ?? "Unknown"),
        url: String(data.url ?? "#"),
        minutes: Number(data.minutes ?? 5),
        summary: String(data.summary ?? ""),
        date: String(data.date ?? "1970-01-01"),
        content: content.trim(),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getTopics() {
  const counts = new Map<string, number>();
  for (const article of getAllArticles()) {
    counts.set(article.topic, (counts.get(article.topic) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([slug, count]) => ({
      slug,
      name: slug
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" "),
      count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getArticlesByTopic(topicSlug: string) {
  return getAllArticles().filter((a) => a.topic === topicSlug);
}
