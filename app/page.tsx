import VisualSystemPage from "@/app/visual-system/page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "KaiRank | SEO & Search Visibility for Private Clinics",
  description:
    "Healthcare SEO, technical SEO, local search and AI search optimisation for private clinics. Become easier to find across Google, Maps and AI search.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return <VisualSystemPage />;
}
