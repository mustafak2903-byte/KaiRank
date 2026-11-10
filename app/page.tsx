import VisualSystemPage from "@/app/visual-system/page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Healthcare Search Visibility for UK Private Clinics | KaiRank",
  description:
    "Founder-led healthcare SEO for UK private clinics, strengthening visibility across Google Search and Maps from treatment search to enquiry.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return <VisualSystemPage />;
}
