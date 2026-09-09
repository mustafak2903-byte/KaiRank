import Link from "next/link";
import { siteConfig } from "@/lib/site";

type BreadcrumbItem = {
  label: string;
  href: string;
};

export function Breadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href, siteConfig.url).toString(),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className="marketing-breadcrumbs data-label" aria-label="Breadcrumb">
        <ol>
          {items.map((item, index) => {
            const current = index === items.length - 1;
            return (
              <li key={item.href}>
                {current ? <span aria-current="page">{item.label}</span> : <Link href={item.href}>{item.label}</Link>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
