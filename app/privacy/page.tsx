import { MarketingShell } from "@/components/marketing/marketing-shell";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Privacy notice",
  description: "How KaiRank handles website diagnostic, enquiry and booking information.",
  path: "/privacy",
});

const sections = [
  { title: "Information you choose to provide", body: "When you book a conversation, Cal.com receives the name, contact details and answers you enter into its booking interface. KaiRank receives the information needed to arrange and respond to that request. A written introduction sent through LinkedIn is handled under LinkedIn's own privacy terms." },
  { title: "Public diagnostic information", body: "The Search Visibility Diagnostic requests publicly available website content and technical response information for the URL you submit. It does not sign in to your website or request private analytics access. If the optional performance layer is available, the website URL is sent to Google's PageSpeed Insights service. Results are returned to your browser and are not stored in a KaiRank customer database." },
  { title: "Purposes and lawful bases", body: "KaiRank uses information to take steps you request before a possible engagement, arrange and deliver a conversation, respond to a message, secure the service and keep necessary business records. These activities rely on steps taken at your request, legitimate interests in operating and protecting the service, and legal obligations where applicable. Optional third-party experiences load only when you choose to open or use them." },
  { title: "Service providers and international processing", body: "Vercel provides hosting, performance and aggregate website measurement; Cal.com provides booking; Google PageSpeed Insights provides optional public performance data; and LinkedIn provides the written messaging channel. These providers may process information outside the United Kingdom under their own applicable transfer safeguards and privacy commitments. KaiRank does not sell personal information." },
  { title: "Retention and security", body: "Public diagnostic results are not retained in an application database. Enquiry and booking records are reviewed at least annually and are normally deleted within 24 months of the last substantive contact unless an active engagement, legal obligation or dispute requires longer retention. Infrastructure security logs follow the hosting provider's configured retention. Reasonable technical and organisational safeguards are used, but no internet transmission can be guaranteed completely secure." },
  { title: "Your choices and rights", body: "Depending on the circumstances, you may request access, correction, deletion, restriction or portability of your personal information, object to processing based on legitimate interests, or withdraw consent where consent applies. The public diagnostic works without contact details; opening the booking experience or messaging through LinkedIn is optional. KaiRank may need to verify identity before completing a rights request." },
  { title: "Browser preferences and measurement", body: "Kai stores a display preference in your browser when you choose an answer style. KaiRank uses Vercel Web Analytics and Speed Insights for anonymous, aggregate visit, interaction and performance measurement. Names, email addresses, submitted website URLs and Cal.com booking identifiers are not sent in KaiRank analytics events." },
] as const;

export default function PrivacyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/privacy#page`,
    name: "KaiRank privacy notice",
    description: "How KaiRank handles website diagnostic, enquiry and booking information.",
    url: `${siteConfig.url}/privacy`,
    dateModified: "2026-11-10",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  };

  return (
    <MarketingShell structuredData={structuredData}>
      <article className="privacy-page">
        <header><div className="container"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy", href: "/privacy" }]} /><span className="data-label">Last updated · 10 November 2026</span><h1>Privacy, stated<br /><em>in plain language.</em></h1><p>This notice explains the information KaiRank handles when you use the public website health check, message the founder or open the booking experience.</p></div></header>
        <div className="container privacy-page__body">
          <section><span className="data-label">Who is responsible</span><h2>{siteConfig.legalName}</h2><p>KaiRank, operated by {siteConfig.founder.name}, is responsible for information submitted directly through this website. Until the permanent business mailbox is configured, privacy questions and rights requests can be sent through the founder&apos;s <a href={siteConfig.founder.linkedIn} target="_blank" rel="noreferrer">verified LinkedIn profile</a>.</p></section>
          {sections.map((section, index) => <section key={section.title}><span className="data-label">0{index + 1}</span><h2>{section.title}</h2><p>{section.body}</p></section>)}
          <section><span className="data-label">08</span><h2>Questions and complaints</h2><p>Raise a question or rights request through the contact method above. If a data-protection concern is not resolved, people in the United Kingdom may complain to the <a href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/" target="_blank" rel="noreferrer">Information Commissioner&apos;s Office</a>. You can also contact the relevant supervisory authority where you live or work.</p></section>
          <aside><strong>Current implementation</strong><p>This notice describes the website as deployed on 10 November 2026. It will be reviewed when the business mailbox, analytics, lead-delivery, hosting or booking providers change. It is an operational privacy notice, not a substitute for independent legal advice.</p></aside>
        </div>
      </article>
    </MarketingShell>
  );
}
