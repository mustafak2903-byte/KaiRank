import type { MetadataRoute } from "next";
import { caseStudies, services } from "@/lib/marketing-content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    ...services.map((service) => ({ path: `/${service.slug}/`, priority: 0.8, changeFrequency: "monthly" as const })),
    { path: "/case-studies/", priority: 0.85, changeFrequency: "monthly" as const },
    ...caseStudies.map((study) => ({ path: `/case-studies/${study.slug}/`, priority: 0.8, changeFrequency: "monthly" as const })),
    { path: "/about/", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/contact/", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/privacy/", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency,
    priority,
  }));
}
