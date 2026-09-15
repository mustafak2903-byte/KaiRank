import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightPage } from "@/components/marketing/insight-page";
import { getInsight, insights } from "@/lib/insights-content";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return createMetadata({
    title: insight.seoTitle,
    description: insight.description,
    path: `/insights/${insight.slug}`,
    article: {
      publishedTime: insight.published,
      modifiedTime: insight.updated,
      authors: [siteConfig.founder.name],
    },
    image: {
      url: `/og/insight/${insight.slug}`,
      width: 1200,
      height: 630,
      alt: `${insight.title} ${insight.accent} — KaiRank`,
    },
  });
}

export default async function InsightRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();
  return <InsightPage insight={insight} />;
}
