import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    authors: readonly string[];
  };
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  noIndex = false,
  absoluteTitle = false,
  article,
}: MetadataInput = {}): Metadata {
  const documentTitle = title ?? siteConfig.title;
  const socialTitle = absoluteTitle ? documentTitle : title ? `${title} — ${siteConfig.name}` : siteConfig.title;

  return {
    title: absoluteTitle ? { absolute: documentTitle } : documentTitle,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: article ? {
      type: "article",
      locale: siteConfig.locale,
      url: path,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      publishedTime: article.publishedTime,
      modifiedTime: article.modifiedTime,
      authors: [...article.authors],
      images: [
        {
          url: "/og.png",
          width: 1734,
          height: 907,
          alt: "KaiRank — Search visibility, engineered.",
        },
      ],
    } : {
      type: "website",
      locale: siteConfig.locale,
      url: path,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      images: [
        {
          url: "/og.png",
          width: 1734,
          height: 907,
          alt: "KaiRank — Search visibility, engineered.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/og.png"],
    },
  };
}
