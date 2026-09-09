import type { MetadataRoute } from "next";
import { insights } from "@/lib/insights-content";
import { caseStudies, services } from "@/lib/marketing-content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    ...services.map((service) => ({ path: `/${service.slug}`, priority: 0.85, changeFrequency: "monthly" as const })),
    { path: "/case-studies", priority: 0.85, changeFrequency: "monthly" as const },
    ...caseStudies.map((study) => ({ path: `/case-studies/${study.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    { path: "/search-visibility-diagnostic", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/insights", priority: 0.75, changeFrequency: "weekly" as const },
    ...insights.map((insight) => ({ path: `/insights/${insight.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
    { path: "/about", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: path === "/" ? siteConfig.url : new URL(path, siteConfig.url).toString(),
    changeFrequency,
    priority,
  }));
}
