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
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  noIndex = false,
  absoluteTitle = false,
  article,
  image = {
    url: "/og.png",
    width: 1734,
    height: 907,
    alt: "KaiRank — Search visibility, engineered.",
  },
}: MetadataInput = {}): Metadata {
  const documentTitle = title ?? siteConfig.title;
  const socialTitle = absoluteTitle ? documentTitle : title ? `${title} — ${siteConfig.name}` : siteConfig.title;
  const pageUrl = new URL(path, siteConfig.url).toString();
  const socialImage = { ...image, url: new URL(image.url, siteConfig.url).toString() };

  return {
    title: absoluteTitle ? { absolute: documentTitle } : documentTitle,
    description,
    alternates: { canonical: pageUrl },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: article ? {
      type: "article",
      locale: siteConfig.locale,
      url: pageUrl,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      publishedTime: article.publishedTime,
      modifiedTime: article.modifiedTime,
      authors: [...article.authors],
      images: [
        socialImage,
      ],
    } : {
      type: "website",
      locale: siteConfig.locale,
      url: pageUrl,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      images: [
        socialImage,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage.url],
    },
  };
}
