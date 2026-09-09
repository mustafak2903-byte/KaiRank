import Link from "next/link";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Talk through your clinic's search strategy",
  description: "Start a focused conversation about the search constraints affecting a private clinic across Google, Maps and AI discovery.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <MarketingShell>
      <section className="contact-hero" aria-labelledby="contact-title" data-kai-avoid>
        <div className="container contact-hero__grid">
          <div><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]} /><span className="data-label">Strategy conversation</span><h1 id="contact-title">Start with the clinic.<br /><em>Not a sales deck.</em></h1><p>Bring one website, location and priority treatment. The conversation will focus on the first search constraint worth verifying and whether KaiRank is the right fit to help.</p></div>
          <div className="contact-actions"><div><span className="data-label">Live conversation</span><strong>Talk through my search strategy</strong><p>Use Cal.com to choose an available time without leaving KaiRank.</p><BookingTrigger className="v3-action v3-action--solid" label="Open the strategy calendar" source="contact-page" /></div><div><span className="data-label">Email</span><strong>{siteConfig.contact.email}</strong><p>Useful for project context, collaboration questions or accessibility support.</p><a href={`mailto:${siteConfig.contact.email}`}>Email KaiRank <span aria-hidden="true">↗</span></a></div><div><span className="data-label">Public first step</span><strong>Search Visibility Diagnostic</strong><p>Check the public technical surface before sharing contact details.</p><Link href="/search-visibility-diagnostic">Check my clinic <span aria-hidden="true">↘</span></Link></div></div>
        </div>
      </section>
      <section className="contact-expectations" aria-labelledby="expect-title"><div className="container"><span className="data-label">What to expect</span><h2 id="expect-title">A useful first conversation should establish three things.</h2><ol><li><span>01</span><strong>What matters commercially?</strong><p>The treatment, location and patient demand the clinic most needs to improve.</p></li><li><span>02</span><strong>What needs evidence?</strong><p>The technical, local, content or entity constraint that should be verified first.</p></li><li><span>03</span><strong>What is the right next step?</strong><p>A focused review, implementation sequence, team collaboration—or an honest decision not to proceed.</p></li></ol></div></section>
    </MarketingShell>
  );
}
