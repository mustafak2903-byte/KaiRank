import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/visual-system/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
