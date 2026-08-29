import Link from "next/link";
import { SignalMark } from "@/components/brand/signal-mark";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Rebuild foundation",
  description: "The KaiRank rebuild foundation is in review.",
  noIndex: true,
});

export default function FoundationPage() {
  return (
    <main className="foundation-page">
      <div className="foundation-page__grid" aria-hidden="true" />
      <div className="foundation-page__content">
        <SignalMark className="foundation-page__mark" />
        <span className="data-label">KaiRank / rebuild foundation</span>
        <h1>The homepage has not been built yet.</h1>
        <p>The visual language is isolated for review before the next implementation milestone.</p>
        <Link className="button button--primary" href="/visual-system/">
          <span>Review the visual system</span><span className="button__arrow" aria-hidden="true">↗</span>
        </Link>
      </div>
    </main>
  );
}
