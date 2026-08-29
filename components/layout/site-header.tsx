import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Wordmark />
        <nav className="site-header__navigation" aria-label="Primary navigation">
          {siteConfig.navigation.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </nav>
        <Link className="site-header__contact" href="/contact/">
          Start a project <span aria-hidden="true">↗</span>
        </Link>
        <MobileNavigation />
      </div>
    </header>
  );
}
