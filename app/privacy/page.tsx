import { MarketingShell } from "@/components/marketing/marketing-shell";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Privacy notice",
  description: "How KaiRank handles website diagnostic, enquiry and booking information.",
  path: "/privacy/",
});

const sections = [
  { title: "Information you choose to provide", body: "When you request a deeper review, KaiRank may receive your email address, clinic name, number of locations, website, location and priority treatment or service. When you book a conversation, Cal.com receives the details you enter into its booking interface." },
  { title: "Public diagnostic information", body: "The Search Visibility Diagnostic requests publicly available website content and technical response information. It does not sign in to your website or request private analytics access. If the optional performance layer is available, the website URL is sent to Google's PageSpeed Insights service." },
  { title: "How information is used", body: "Information is used to deliver the check or review you request, respond to your enquiry, arrange a conversation, secure the service and understand whether the experience is working as intended. KaiRank does not claim a lead, booking or patient outcome merely because a button was clicked." },
  { title: "Service providers", body: "KaiRank may use hosting and infrastructure providers to operate the website, Cal.com to provide booking, Google PageSpeed Insights for optional public performance data, and a configured delivery service to receive review requests. Each provider handles information under its own terms and privacy commitments." },
  { title: "Retention and security", body: "Enquiry and review information is kept only for as long as it is reasonably needed to respond, provide the requested service, maintain necessary business records and protect the service. Reasonable technical and organisational safeguards are used, but no internet transmission can be guaranteed completely secure." },
  { title: "Your choices and rights", body: "You may ask what personal information KaiRank holds about you, request correction or deletion where applicable, or object to certain processing. You can also choose not to submit the deeper-review form and use the public diagnostic without providing an email address." },
  { title: "Browser preferences and measurement", body: "Kai stores a display preference in your browser when you choose an answer style. KaiRank uses Vercel Web Analytics and Speed Insights for anonymous, aggregate visit, interaction and performance measurement. Names, email addresses and booking identifiers are not sent in analytics events." },
] as const;

export default function PrivacyPage() {
  return (
    <MarketingShell>
      <article className="privacy-page">
        <header><div className="container"><span className="data-label">Last updated · 6 September 2026</span><h1>Privacy, stated<br /><em>in plain language.</em></h1><p>This notice explains the information KaiRank handles when you use the public diagnostic, request a deeper review, send an email or open the booking experience.</p></div></header>
        <div className="container privacy-page__body">
          <section><span className="data-label">Who is responsible</span><h2>{siteConfig.legalName}</h2><p>KaiRank is responsible for the information submitted directly through this website. Privacy questions and requests can be sent to <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.</p></section>
          {sections.map((section, index) => <section key={section.title}><span className="data-label">0{index + 1}</span><h2>{section.title}</h2><p>{section.body}</p></section>)}
          <aside><strong>Important production note</strong><p>This notice reflects the current website implementation. It should be reviewed whenever analytics, lead-delivery, hosting or booking providers change, and against the legal requirements of the markets KaiRank serves.</p></aside>
        </div>
      </article>
    </MarketingShell>
  );
}
