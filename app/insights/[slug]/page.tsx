import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightPage } from "@/components/marketing/insight-page";
import { getInsight, insights } from "@/lib/insights-content";
import { createMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return createMetadata({ title: insight.seoTitle, description: insight.description, path: `/insights/${insight.slug}` });
}

export default async function InsightRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();
  return <InsightPage insight={insight} />;
}
