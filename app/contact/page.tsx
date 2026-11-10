import Link from "next/link";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Talk through your clinic's search strategy",
  description: "Start a focused conversation about the search constraints affecting a UK private clinic across Google, Maps and AI discovery.",
  path: "/contact",
});

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteConfig.url}/contact#page`,
    name: "Talk through your clinic's search strategy",
    description: "Book a focused clinic visibility review with KaiRank.",
    url: `${siteConfig.url}/contact`,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organisation` },
  };

  return (
    <MarketingShell structuredData={structuredData}>
      <section className="contact-hero" aria-labelledby="contact-title" data-kai-avoid>
        <div className="container contact-hero__grid">
          <div><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]} /><span className="data-label">Strategy conversation</span><h1 id="contact-title">Start with the clinic.<br /><em>Not a sales deck.</em></h1><p>Bring one website, location and priority treatment. The conversation will focus on the first search constraint worth verifying and whether KaiRank is the right fit to help.</p></div>
          <div className="contact-actions"><div><span className="data-label">Live conversation</span><strong>Clinic visibility review</strong><p>Choose an available time without leaving KaiRank. Bring your website, location and one priority treatment.</p><BookingTrigger className="v3-action v3-action--solid" label="Book a clinic visibility review" source="contact-page" /></div><div><span className="data-label">Write first</span><strong>Message Mustafa directly</strong><p>Prefer a written introduction? Send the clinic website, location and priority treatment through the founder&apos;s verified LinkedIn profile.</p><a data-event="contact_clicked" data-event-label="contact: linkedin message" href={siteConfig.founder.linkedIn} target="_blank" rel="noreferrer">Message on LinkedIn <span aria-hidden="true">↗</span></a></div><div><span className="data-label">Optional first step</span><strong>Free website health check</strong><p>Review public technical signals before sharing any account access.</p><Link href="/search-visibility-diagnostic">Check my website <span aria-hidden="true">↘</span></Link></div></div>
        </div>
      </section>
      <section className="contact-expectations" aria-labelledby="expect-title"><div className="container"><span className="data-label">What to expect</span><h2 id="expect-title">A useful first conversation should establish three things.</h2><ol><li><span>01</span><strong>What matters commercially?</strong><p>The treatment, location and patient demand the clinic most needs to improve.</p></li><li><span>02</span><strong>What needs evidence?</strong><p>The technical, local, content or entity constraint that should be verified first.</p></li><li><span>03</span><strong>What is the right next step?</strong><p>A focused review, implementation sequence, team collaboration—or an honest decision not to proceed.</p></li></ol></div></section>
    </MarketingShell>
  );
}
