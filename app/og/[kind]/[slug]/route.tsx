import { ImageResponse } from "next/og";
import { getInsight } from "@/lib/insights-content";
import { getCaseStudy } from "@/lib/marketing-content";

export const runtime = "nodejs";

type Card = {
  eyebrow: string;
  title: string;
  accent: string;
  footer: string;
};

function getCard(kind: string, slug: string): Card | null {
  if (kind === "insight") {
    const insight = getInsight(slug);
    if (!insight) return null;
    return {
      eyebrow: `FIELD NOTE / ${insight.category.toUpperCase()}`,
      title: insight.title,
      accent: insight.accent,
      footer: `${insight.readTime} · Evidence-led guidance`,
    };
  }

  if (kind === "case-study") {
    const study = getCaseStudy(slug);
    if (!study) return null;
    return {
      eyebrow: `VERIFIED CASE STUDY / ${study.client.toUpperCase()}`,
      title: study.title,
      accent: study.accent,
      footer: `${study.market} · ${study.period}`,
    };
  }

  return null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ kind: string; slug: string }> },
) {
  const { kind, slug } = await params;
  const card = getCard(kind, slug);
  if (!card) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "62px 72px",
          color: "#f2eee5",
          background: "#080a0f",
          position: "relative",
          overflow: "hidden",
          fontFamily: "serif",
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", opacity: 0.18, backgroundImage: "linear-gradient(rgba(196,204,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(196,204,255,.12) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        <div style={{ position: "absolute", width: 620, height: 620, right: -80, top: -180, display: "flex", borderRadius: 999, background: "radial-gradient(circle, rgba(120,139,255,.34) 0%, rgba(55,73,175,.12) 42%, transparent 70%)" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "sans-serif", fontSize: 24, fontWeight: 700 }}>
            <div style={{ width: 38, height: 38, display: "flex", border: "2px solid #8ea0ff", position: "relative" }}>
              <div style={{ width: 14, height: 22, position: "absolute", left: 7, top: 6, display: "flex", borderLeft: "3px solid #8ea0ff", borderTop: "3px solid #8ea0ff" }} />
              <div style={{ width: 7, height: 7, position: "absolute", right: 4, bottom: 5, display: "flex", borderRadius: 999, background: "#85b9a1" }} />
            </div>
            <span>KaiRank</span>
          </div>
          <span style={{ fontFamily: "monospace", fontSize: 17, letterSpacing: "0.12em", color: "#aeb5d8" }}>{card.eyebrow}</span>
        </div>

        <div style={{ maxWidth: 1010, display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ fontSize: 70, lineHeight: 1.02, letterSpacing: "-0.035em", display: "flex" }}>{card.title}</div>
          <div style={{ fontSize: 70, lineHeight: 1.02, letterSpacing: "-0.035em", display: "flex", color: "#9eabff", fontStyle: "italic" }}>{card.accent}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative", fontFamily: "monospace", fontSize: 17, color: "#aeb5d8" }}>
          <span>{card.footer}</span>
          <span>GOOGLE / MAPS / AI SEARCH</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800" },
    },
  );
}
