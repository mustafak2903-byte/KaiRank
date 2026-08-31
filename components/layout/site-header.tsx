"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <Wordmark href="/visual-system/" />
        <nav className="site-header__navigation" aria-label="Primary navigation">
          {siteConfig.navigation.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </nav>
        <Link className="site-header__contact" href="#audit">
          Run my visibility audit <span aria-hidden="true">↘</span>
        </Link>
        <MobileNavigation />
      </div>
    </header>
  );
}
