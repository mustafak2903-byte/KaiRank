import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./experiments.css";

export const metadata: Metadata = {
  title: "KaiRank Art Direction Lab",
  description: "Internal visual-system studies for KaiRank search visibility.",
  robots: { index: false, follow: false, noarchive: true },
};

export default function ExperimentsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
