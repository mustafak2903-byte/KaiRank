import type { CSSProperties } from "react";

const points = [
  { x: 24, y: 252, label: "Jul 2025", value: "~250" },
  { x: 144, y: 238, label: "Dec 2025", value: "400+ top 10" },
  { x: 280, y: 194, label: "Mar 2026", value: "600–700" },
  { x: 420, y: 126, label: "Apr 2026", value: "~800 top 10" },
  { x: 580, y: 42, label: "May 2026", value: "3,900 total" },
] as const;

export function RankingTrajectory() {
  return (
    <figure className="trajectory">
      <figcaption className="trajectory__caption">
        <div>
          <span className="data-label">South City Hospital / ranking trajectory</span>
          <strong>~250 <i>to</i> 3,900</strong>
        </div>
        <p>Ranking keywords from July 2025 to May 2026.</p>
      </figcaption>

      <div className="trajectory__chart">
        <div className="trajectory__axis trajectory__axis--y" aria-hidden="true">
          <span>4K</span><span>2K</span><span>0</span>
        </div>
        <svg viewBox="0 0 620 290" role="img" aria-labelledby="trajectory-title trajectory-description">
          <title id="trajectory-title">South City Hospital ranking keyword growth</title>
          <desc id="trajectory-description">Ranking keywords grew from about 250 in July 2025 to 3,900 in May 2026.</desc>
          <defs>
            <linearGradient id="trajectory-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--color-signal)" stopOpacity="0.2" />
              <stop offset="1" stopColor="var(--color-signal)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="trajectory__grid" aria-hidden="true">
            <path d="M24 42H580M24 147H580M24 252H580" />
            <path d="M24 30V252M164 30V252M304 30V252M444 30V252M580 30V252" />
          </g>
          <path className="trajectory__area" d="M24 252L144 238L280 194L420 126L580 42L580 252Z" />
          <path className="trajectory__line" pathLength="1" d="M24 252L144 238L280 194L420 126L580 42" />
          {points.map((point, index) => (
            <g className="trajectory__point" key={point.label} style={{ "--point-index": index } as CSSProperties}>
              <circle cx={point.x} cy={point.y} r="5" />
              <circle className="trajectory__point-ring" cx={point.x} cy={point.y} r="10" />
            </g>
          ))}
        </svg>
        <div className="trajectory__labels">
          {points.map((point) => (
            <div key={point.label}>
              <span>{point.label}</span>
              <strong>{point.value}</strong>
            </div>
          ))}
        </div>
      </div>
      <p className="trajectory__source data-label">Source / legacy KaiRank case-study evidence</p>
    </figure>
  );
}
