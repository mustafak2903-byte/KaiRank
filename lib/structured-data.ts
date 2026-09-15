import { siteConfig } from "@/lib/site";

export const organisationEntity = {
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organisation`,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.svg`,
  email: siteConfig.contact.email,
  description: siteConfig.description,
  founder: { "@id": `${siteConfig.url}/#founder` },
  areaServed: siteConfig.serviceMarkets.map((market) => ({ "@type": "Country", name: market })),
  knowsAbout: [
    "Technical SEO",
    "Clinic SEO strategy",
    "Local SEO for medical clinics",
    "Healthcare SEO",
    "AI search optimisation",
  ],
};

export const founderEntity = {
  "@type": "Person",
  "@id": `${siteConfig.url}/#founder`,
  name: siteConfig.founder.name,
  jobTitle: "Founder and search strategist",
  url: `${siteConfig.url}/about`,
  sameAs: [siteConfig.founder.linkedIn],
  worksFor: { "@id": `${siteConfig.url}/#organisation` },
};

export const websiteEntity = {
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  publisher: { "@id": `${siteConfig.url}/#organisation` },
  audience: {
    "@type": "Audience",
    audienceType: "Private clinics and healthcare organisations in the United Kingdom and United States",
  },
  inLanguage: "en-GB",
};

export const siteEntityGraph = {
  "@context": "https://schema.org",
  "@graph": [organisationEntity, founderEntity, websiteEntity],
};

export const organisationReference = {
  "@type": "Organization",
  "@id": organisationEntity["@id"],
  name: siteConfig.name,
  url: siteConfig.url,
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/icon.svg`,
  },
};

export const founderReference = {
  "@type": "Person",
  "@id": founderEntity["@id"],
  name: siteConfig.founder.name,
  url: `${siteConfig.url}/about`,
  sameAs: [siteConfig.founder.linkedIn],
};

export function createFaqEntity(
  url: string,
  faqs: readonly { question: string; answer: string }[],
) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
