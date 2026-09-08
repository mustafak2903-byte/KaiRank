import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { services } from "@/lib/marketing-content";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="v3-footer" data-kai-avoid>
      <div className="container v3-footer__grid">
        <div className="v3-footer__brand">
          <Wordmark quiet />
          <p>Search visibility for private clinics across Google, Maps and AI search.</p>
        </div>
        <nav aria-label="Services">
          <strong>Services</strong>
          {services.slice(0, 5).map((service) => <Link href={`/${service.slug}/`} key={service.slug}>{service.navLabel}</Link>)}
        </nav>
        <nav aria-label="Results">
          <strong>Results</strong>
          <Link href="/case-studies/the-recovery-room/">The Recovery Room</Link>
          <Link href="/case-studies/south-city-hospital/">South City Hospital</Link>
          <Link href="/#audit">Visibility Diagnostic</Link>
        </nav>
        <nav aria-label="Company">
          <strong>Company</strong>
          <Link href="/about/">About</Link>
          <Link href="/#process">How We Work</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/contact/">Contact</Link>
        </nav>
      </div>
      <div className="container v7-footer__privacy">
        <span className="data-label">Privacy</span>
        <p>The diagnostic reads public website signals. Contact and booking details are used only to respond to the action you request.</p>
        <Link className="v9-footer-link" href="/privacy/">Read the privacy notice <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="container v3-footer__base data-label">
        <span>© 2026 {siteConfig.name}</span>
        <Link href="/privacy/">Privacy</Link>
        <Link href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</Link>
        <span>Search visibility for private clinics</span>
      </div>
    </footer>
  );
}
