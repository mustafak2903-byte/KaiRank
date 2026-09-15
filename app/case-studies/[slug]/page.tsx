import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/marketing/case-study-page";
import { caseStudies, getCaseStudy } from "@/lib/marketing-content";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return createMetadata({
    title: `${study.client} SEO case study`,
    description: study.description,
    path: `/case-studies/${study.slug}`,
    article: {
      publishedTime: study.published,
      modifiedTime: study.updated,
      authors: [siteConfig.founder.name],
    },
    image: {
      url: `/og/case-study/${study.slug}`,
      width: 1200,
      height: 630,
      alt: `${study.client} SEO case study — KaiRank`,
    },
  });
}

export default async function CaseStudyRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyPage study={study} />;
}
