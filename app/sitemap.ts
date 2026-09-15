import type { MetadataRoute } from "next";
import { insights } from "@/lib/insights-content";
import { caseStudies, services } from "@/lib/marketing-content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUpdated = "2026-09-15";
  const routes = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const, lastModified: siteUpdated },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const, lastModified: siteUpdated },
    ...services.map((service) => ({ path: `/${service.slug}`, priority: 0.85, changeFrequency: "monthly" as const, lastModified: service.updated })),
    { path: "/case-studies", priority: 0.85, changeFrequency: "monthly" as const, lastModified: siteUpdated },
    ...caseStudies.map((study) => ({ path: `/case-studies/${study.slug}`, priority: 0.8, changeFrequency: "monthly" as const, lastModified: siteUpdated })),
    { path: "/search-visibility-diagnostic", priority: 0.9, changeFrequency: "monthly" as const, lastModified: siteUpdated },
    { path: "/insights", priority: 0.8, changeFrequency: "weekly" as const, lastModified: siteUpdated },
    ...insights.map((insight) => ({ path: `/insights/${insight.slug}`, priority: 0.72, changeFrequency: "monthly" as const, lastModified: insight.updated })),
    { path: "/about", priority: 0.6, changeFrequency: "yearly" as const, lastModified: siteUpdated },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const, lastModified: siteUpdated },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const, lastModified: siteUpdated },
  ];

  return routes.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: path === "/" ? siteConfig.url : new URL(path, siteConfig.url).toString(),
    changeFrequency,
    priority,
    lastModified,
  }));
}
