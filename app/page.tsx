import VisualSystemPage from "@/app/visual-system/page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Search visibility for private clinics — KaiRank",
  description:
    "KaiRank helps private clinics improve discovery across Google, Maps and AI search through technical SEO, local SEO, search strategy and evidence-led content.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return <VisualSystemPage />;
}
