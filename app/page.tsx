import VisualSystemPage from "@/app/visual-system/page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Healthcare SEO Agency for Private Clinics | KaiRank",
  description:
    "A healthcare SEO agency for private clinics, connecting technical SEO, local search, medical content and AI search visibility to patient demand.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return <VisualSystemPage />;
}
