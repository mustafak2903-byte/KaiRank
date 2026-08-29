import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  noIndex = false,
}: MetadataInput = {}): Metadata {
  const documentTitle = title ?? siteConfig.title;
  const socialTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title;

  return {
    title: documentTitle,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
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
