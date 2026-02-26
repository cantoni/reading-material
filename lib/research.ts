import fs from "node:fs";
import path from "node:path";

export type ResearchPost = {
  slug: string;
  title: string;
  kind: "ai" | "polymarket";
  date: string;
  content: string;
};

const deepDivesDir = "/home/om/.openclaw/workspace/public-research/content/deep-dives";

function listFiles() {
  if (!fs.existsSync(deepDivesDir)) return [];
  return fs.readdirSync(deepDivesDir).filter((f) => f.endsWith(".md"));
}

function parsePost(file: string): ResearchPost | null {
  const fullPath = path.join(deepDivesDir, file);
  const content = fs.readFileSync(fullPath, "utf8").trim();

  if (file.startsWith("ai-workflow-digest-")) {
    const date = file.replace("ai-workflow-digest-", "").replace(".md", "");
    return {
      slug: `ai-${date}`,
      title: `AI Workflow Digest — ${date}`,
      kind: "ai",
      date,
      content,
    };
  }

  if (file.startsWith("polymarket-picks-")) {
    const date = file.replace("polymarket-picks-", "").replace(".md", "");
    return {
      slug: `polymarket-${date}`,
      title: `Polymarket Paper Picks — ${date}`,
      kind: "polymarket",
      date,
      content,
    };
  }

  return null;
}

export function getResearchPosts(): ResearchPost[] {
  return listFiles()
    .map(parsePost)
    .filter((p): p is ResearchPost => Boolean(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getResearchPostBySlug(slug: string): ResearchPost | undefined {
  return getResearchPosts().find((p) => p.slug === slug);
}
