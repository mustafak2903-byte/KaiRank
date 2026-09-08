import type { ReactNode } from "react";
import { AnalyticsEvents } from "@/components/experience/analytics-events";
import { KaiAssistant } from "@/components/experience/kai-assistant";
import { ScrollExperience } from "@/components/experience/scroll-experience";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function MarketingShell({ children, structuredData }: { children: ReactNode; structuredData?: object }) {
  return (
    <div className="v3-experience v6-experience v7-experience v8-experience marketing-experience">
      {structuredData ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /> : null}
      <ScrollExperience />
      <AnalyticsEvents />
      <SiteHeader />
      <main id="main-content" className="marketing-main">{children}</main>
      <SiteFooter />
      <KaiAssistant />
    </div>
  );
}
