"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isCurrent = (href: string) => pathname === href
    || pathname.startsWith(`${href}/`)
    || (href === "/services" && siteConfig.serviceRoutes.some((route) => route.href === pathname));

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <Wordmark href="/" />
        <nav className="site-header__navigation" aria-label="Primary navigation">
          {siteConfig.navigation.map((item) => (
            <Link aria-current={isCurrent(item.href) ? "page" : undefined} href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </nav>
        <div className="site-header__actions">
          <BookingTrigger className="site-header__contact" label="Book a clinic visibility review" source="navigation" />
        </div>
        <MobileNavigation />
      </div>
      </header>
    </>
  );
}
