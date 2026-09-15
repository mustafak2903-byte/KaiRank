import Link from "next/link";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "About KaiRank's UK healthcare SEO practice",
  description: "Meet the accountable search strategist behind KaiRank and the evidence-first operating principles used for UK private-clinic visibility.",
  path: "/about",
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
          <div><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} /><span className="data-label">Founder-led by design</span><h1 id="about-title">One accountable lead.<br /><em>No strategic hand-off.</em></h1></div>
          <div className="profile-hero__dossier" aria-label={`Profile for ${siteConfig.founder.name}`}><span aria-hidden="true">MK</span><p><strong>{siteConfig.founder.name}</strong><small>{siteConfig.founder.role}</small></p></div>
        </div>
      </section>
      <section className="profile-statement">
        <div className="container profile-statement__grid">
          <span className="data-label">The operating model</span>
          <div><h2>Diagnosis, priorities and measurement stay connected.</h2><p>KaiRank is a UK-focused, founder-led search visibility practice for private clinics and high-consideration healthcare businesses. Mustafa leads the diagnosis and search strategy, then works directly with the developers, writers, clinicians or existing agency responsible for implementation.</p><p>The United Kingdom is the primary launch market. KaiRank can also support US healthcare organisations when the research, language, evidence and regulatory context are built specifically for that market—not copied from a UK page.</p><p>The work shown here spans a Birmingham private clinic and a multi-specialty hospital with more than 200 consultants. Each case study separates first-party analytics, third-party estimates and booking-intent signals so the result can be read accurately.</p><a href={siteConfig.founder.linkedIn} target="_blank" rel="noreferrer">View Mustafa’s LinkedIn profile <span aria-hidden="true">↗</span></a></div>
          <figure className="profile-operating-model" aria-label="Founder-led operating model connecting diagnosis, prioritisation and measurement">
            <div className="profile-operating-model__header" aria-hidden="true"><span>Search visibility system</span><small>Founder / 01</small></div>
            <svg viewBox="0 0 560 520" aria-hidden="true">
              <defs>
                <radialGradient id="profile-core" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#c8d0ff" stopOpacity=".22" /><stop offset="100%" stopColor="#6e84ff" stopOpacity="0" /></radialGradient>
                <linearGradient id="profile-route" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#4d60c4" stopOpacity=".3" /><stop offset=".52" stopColor="#6e84ff" /><stop offset="1" stopColor="#74a38f" /></linearGradient>
              </defs>
              <g className="profile-operating-model__gridlines"><path d="M40 80H520M40 170H520M40 260H520M40 350H520M40 440H520" /><path d="M80 40V480M180 40V480M280 40V480M380 40V480M480 40V480" /></g>
              <g className="profile-operating-model__routes"><path d="M38 112C132 112 153 215 243 251" /><path d="M38 208C137 208 162 240 243 258" /><path d="M38 312C132 312 158 278 243 263" /><path d="M38 408C135 408 160 303 243 270" /><path d="M317 260C400 260 431 132 522 132" /><path d="M317 260C406 260 431 260 522 260" /><path d="M317 260C400 260 431 388 522 388" /></g>
              <g className="profile-operating-model__points"><circle cx="38" cy="112" r="5" /><circle cx="38" cy="208" r="5" /><circle cx="38" cy="312" r="5" /><circle cx="38" cy="408" r="5" /><circle cx="522" cy="132" r="5" /><circle cx="522" cy="260" r="5" /><circle cx="522" cy="388" r="5" /></g>
              <circle className="profile-operating-model__halo" cx="280" cy="260" r="114" />
              <circle className="profile-operating-model__orbit" cx="280" cy="260" r="81" />
              <circle className="profile-operating-model__core" cx="280" cy="260" r="38" />
              <text className="profile-operating-model__monogram" x="280" y="272" textAnchor="middle">MK</text>
              <g className="profile-operating-model__labels"><text x="38" y="96">TECHNICAL</text><text x="38" y="192">INTENT</text><text x="38" y="296">LOCAL</text><text x="38" y="392">EVIDENCE</text><text x="522" y="116" textAnchor="end">PRIORITY</text><text x="522" y="244" textAnchor="end">DELIVERY</text><text x="522" y="372" textAnchor="end">MEASURE</text></g>
            </svg>
            <figcaption aria-hidden="true"><span className="data-label">One accountable lead</span><strong>Diagnose <i>→</i> prioritise <i>→</i> measure</strong></figcaption>
          </figure>
        </div>
      </section>
      <section className="profile-principles" aria-labelledby="principles-title"><div className="container"><span className="data-label">Working principles</span><h2 id="principles-title">The standard applied to every engagement.</h2><ol><li><span>01</span><strong>Evidence before activity</strong><p>Establish what is actually suppressing discovery before prescribing output.</p></li><li><span>02</span><strong>Priority before volume</strong><p>Order work around patient demand and commercial value, not a generic monthly checklist.</p></li><li><span>03</span><strong>Clarity before claims</strong><p>Keep rankings, estimates, clicks, enquiries and bookings separate.</p></li><li><span>04</span><strong>One accountable owner</strong><p>Keep strategic reasoning close to delivery and measurement.</p></li></ol></div></section>
      <section className="marketing-conversion" aria-labelledby="about-conversion-title" data-kai-avoid><div className="container marketing-conversion__inner"><span className="data-label">Start with one real constraint</span><h2 id="about-conversion-title">Bring the clinic, location and treatment that matter most.</h2><div className="v3-actions"><Link className="v3-action v3-action--solid" data-event="primary_cta_clicked" data-event-label="about: diagnostic" data-event-source="about-final" href="/search-visibility-diagnostic">Check my clinic <span aria-hidden="true">↗</span></Link><BookingTrigger className="v3-action v3-action--text" label="Talk through my search strategy" source="about-final" /></div></div></section>
    </MarketingShell>
  );
}
