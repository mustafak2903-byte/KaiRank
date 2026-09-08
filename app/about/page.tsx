import Link from "next/link";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "About the founder-led search practice",
  description: "Meet the accountable search strategist behind KaiRank and the evidence-first operating principles used for private-clinic visibility.",
  path: "/about/",
});

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#founder`,
      name: siteConfig.founder.name,
      jobTitle: "Founder and search strategist",
      worksFor: { "@id": `${siteConfig.url}/#organisation` },
      sameAs: [siteConfig.founder.linkedIn],
    },
  };

  return (
    <MarketingShell structuredData={structuredData}>
      <section className="profile-hero" aria-labelledby="about-title">
        <div className="container profile-hero__grid">
          <div><span className="data-label">Founder-led by design</span><h1 id="about-title">One accountable lead.<br /><em>No strategic hand-off.</em></h1></div>
          <div className="profile-hero__dossier" aria-label={`Profile for ${siteConfig.founder.name}`}><span aria-hidden="true">MK</span><p><strong>{siteConfig.founder.name}</strong><small>{siteConfig.founder.role}</small></p></div>
        </div>
      </section>
      <section className="profile-statement">
        <div className="container profile-statement__grid"><span className="data-label">The operating model</span><div><h2>Diagnosis, priorities and measurement stay connected.</h2><p>KaiRank is a founder-led search visibility practice for private clinics and high-consideration healthcare businesses. Mustafa leads the diagnosis and search strategy, then works directly with the developers, writers, clinicians or existing agency responsible for implementation.</p><p>The work shown here spans a Birmingham private clinic and a multi-specialty hospital with more than 200 consultants. Each case study separates first-party analytics, third-party estimates and booking-intent signals so the result can be read accurately.</p><a href={siteConfig.founder.linkedIn} target="_blank" rel="noreferrer">View Mustafa’s LinkedIn profile <span aria-hidden="true">↗</span></a></div></div>
      </section>
      <section className="profile-principles" aria-labelledby="principles-title"><div className="container"><span className="data-label">Working principles</span><h2 id="principles-title">The standard applied to every engagement.</h2><ol><li><span>01</span><strong>Evidence before activity</strong><p>Establish what is actually suppressing discovery before prescribing output.</p></li><li><span>02</span><strong>Priority before volume</strong><p>Order work around patient demand and commercial value, not a generic monthly checklist.</p></li><li><span>03</span><strong>Clarity before claims</strong><p>Keep rankings, estimates, clicks, enquiries and bookings separate.</p></li><li><span>04</span><strong>One accountable owner</strong><p>Keep strategic reasoning close to delivery and measurement.</p></li></ol></div></section>
      <section className="marketing-conversion" aria-labelledby="about-conversion-title" data-kai-avoid><div className="container marketing-conversion__inner"><span className="data-label">Start with one real constraint</span><h2 id="about-conversion-title">Bring the clinic, location and treatment that matter most.</h2><div className="v3-actions"><Link className="v3-action v3-action--solid" data-event="primary_cta_clicked" data-event-label="about: diagnostic" data-event-source="about-final" href="/#audit">Check my clinic <span aria-hidden="true">↗</span></Link><BookingTrigger className="v3-action v3-action--text" label="Talk through my search strategy" source="about-final" /></div></div></section>
    </MarketingShell>
  );
}
