import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";

type ExperimentFrameProps = {
  current?: "index" | "atlas" | "editorial" | "prism";
};

const experiments = [
  { id: "atlas", label: "A", href: "/experiments/atlas" },
  { id: "editorial", label: "B", href: "/experiments/editorial" },
  { id: "prism", label: "C", href: "/experiments/prism" },
] as const;

export function ExperimentFrame({ current = "index" }: ExperimentFrameProps) {
  return (
    <header className="exp-frame">
      <Wordmark href="/experiments" />
      <p className="exp-frame__label">
        <span>Internal art direction lab</span>
        <span aria-hidden="true">/</span>
        <strong>{current === "index" ? "Review index" : `Study ${experiments.find((item) => item.id === current)?.label}`}</strong>
      </p>
      <nav className="exp-frame__nav" aria-label="Art direction experiments">
        {experiments.map((item) => (
          <Link
            aria-current={current === item.id ? "page" : undefined}
            href={item.href}
            key={item.id}
          >
            {item.label}
            <span className="sr-only"> — {item.id}</span>
          </Link>
        ))}
        <Link className="exp-frame__baseline" href="/visual-system">
          V6 <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
