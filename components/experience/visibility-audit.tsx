"use client";

import { useState, type CSSProperties, type FormEvent } from "react";

type AuditState = "idle" | "focus" | "scanning" | "result" | "error";

type AuditMetric = {
  value: number | null;
  display: string;
  unit: string | null;
};

type AuditResult = {
  kind: "instant-technical-diagnostic";
  url: string;
  strategy: "mobile";
  generatedAt: string;
  scores: {
    performance: number | null;
    seo: number | null;
    accessibility: number | null;
  };
  metrics: {
    lcp: AuditMetric;
    cls: AuditMetric;
    inp: AuditMetric;
  };
  note: string;
};

type ApiError = { message?: string };

function scoreTone(score: number | null) {
  if (score === null) return "unknown";
  if (score >= 90) return "strong";
  if (score >= 50) return "attention";
  return "weak";
}

function DiagnosticIdle({ state }: { state: AuditState }) {
  return (
    <div className={`audit-idle${state === "focus" ? " is-active" : ""}`}>
      <div className="audit-idle__query data-label">
        <span>URL received</span>
        <span>{state === "focus" ? "Signal active" : "Awaiting input"}</span>
      </div>
      <div className="audit-idle__map" aria-hidden="true">
        <span className="audit-idle__route audit-idle__route--one" />
        <span className="audit-idle__route audit-idle__route--two" />
        <span className="audit-idle__route audit-idle__route--three" />
        <i className="audit-idle__node audit-idle__node--source" />
        <i className="audit-idle__node audit-idle__node--search" />
        <i className="audit-idle__node audit-idle__node--map" />
        <i className="audit-idle__node audit-idle__node--answer" />
        <small className="data-label audit-idle__label audit-idle__label--source">Clinic</small>
        <small className="data-label audit-idle__label audit-idle__label--search">Search</small>
        <small className="data-label audit-idle__label audit-idle__label--map">Maps</small>
        <small className="data-label audit-idle__label audit-idle__label--answer">AI</small>
      </div>
      <p>A real Lighthouse mobile diagnostic. Performance is one part of visibility—not the whole audit.</p>
    </div>
  );
}

function DiagnosticScan({ target }: { target: string }) {
  return (
    <div className="audit-scanning" role="status" aria-live="polite">
      <div className="audit-scanning__beam" aria-hidden="true" />
      <div className="audit-scanning__route" aria-hidden="true"><i /><i /><i /><i /></div>
      <strong>Reading the technical surface</strong>
      <span className="data-label">Mobile strategy / Google Lighthouse</span>
      <small>{target}</small>
    </div>
  );
}

function DiagnosticResult({ result }: { result: AuditResult }) {
  const scores = [
    ["Performance", result.scores.performance],
    ["SEO checks", result.scores.seo],
    ["Accessibility", result.scores.accessibility],
  ] as const;
  const metrics = [
    ["Largest Contentful Paint", result.metrics.lcp],
    ["Cumulative Layout Shift", result.metrics.cls],
    ["Interaction to Next Paint", result.metrics.inp],
  ] as const;

  return (
    <div className="audit-result">
      <div className="audit-result__header">
        <div>
          <span className="data-label">Instant technical diagnostic</span>
          <strong>{result.url}</strong>
        </div>
        <span className="audit-result__status data-label">Scan complete</span>
      </div>
      <div className="audit-result__scores">
        {scores.map(([label, score]) => (
          <div className={`audit-score is-${scoreTone(score)}`} key={label}>
            <div className="audit-score__dial" style={{ "--score": score ?? 0 } as CSSProperties}>
              <strong>{score ?? "—"}</strong>
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <dl className="audit-result__metrics">
        {metrics.map(([label, metric]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{metric.display}</dd>
          </div>
        ))}
      </dl>
      <p className="audit-result__note">{result.note}</p>
    </div>
  );
}

function FullReviewForm({ website }: { website: string }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/visibility-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website,
          email: String(form.get("email") ?? ""),
          businessName: String(form.get("businessName") ?? ""),
        }),
      });
      const payload = (await response.json()) as ApiError;
      if (!response.ok) throw new Error(payload.message ?? "The review request could not be confirmed.");
      setState("success");
      setMessage("Request confirmed. KaiRank will review the wider visibility picture.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "The review request could not be confirmed.");
    }
  }

  return (
    <div className="full-review">
      <div className="full-review__intro">
        <span className="data-label">The technical score is only the surface</span>
        <h3>See what patients find.</h3>
        <p>A full review considers treatment demand, local visibility, content gaps, AI discovery and the actions worth prioritising.</p>
      </div>
      {state === "success" ? (
        <div className="full-review__success" role="status">
          <span className="data-label">Confirmed / 01</span>
          <p>{message}</p>
        </div>
      ) : (
        <form onSubmit={submitReview} noValidate>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" placeholder="you@yourclinic.com" required />
          </label>
          <label>
            <span>Clinic or business <i>optional</i></span>
            <input name="businessName" type="text" autoComplete="organization" placeholder="Clinic name" />
          </label>
          <button type="submit" disabled={state === "sending"}>
            <span>{state === "sending" ? "Confirming request" : "Request the full visibility review"}</span>
            <span aria-hidden="true">↗</span>
          </button>
          <p className={`full-review__message is-${state}`} role={state === "error" ? "alert" : "status"} aria-live="polite">
            {message}
          </p>
        </form>
      )}
    </div>
  );
}

export function VisibilityAudit() {
  const [state, setState] = useState<AuditState>("idle");
  const [target, setTarget] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);

  async function runAudit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const url = String(form.get("url") ?? "").trim();

    if (!url) {
      setError("Add your website address—for example, yourclinic.com.");
      setState("error");
      return;
    }

    setTarget(url);
    setError("");
    setResult(null);
    setState("scanning");

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const payload = (await response.json()) as AuditResult | ApiError;
      if (!response.ok || !("kind" in payload)) {
        throw new Error("message" in payload && payload.message ? payload.message : "The diagnostic could not be completed.");
      }
      setResult(payload);
      setState("result");
    } catch (auditError) {
      setError(auditError instanceof Error ? auditError.message : "The diagnostic could not be completed.");
      setState("error");
    }
  }

  return (
    <section className={`visibility-audit is-${state}`} id="audit" aria-labelledby="audit-title">
      <div className="visibility-audit__chrome data-label">
        <span>KR / Diagnostic 01</span>
        <span>Google Lighthouse / mobile</span>
        <span className="visibility-audit__online"><i /> Endpoint ready</span>
      </div>
      <div className="visibility-audit__heading">
        <div>
          <span className="data-label">Instant technical diagnostic</span>
          <h2 id="audit-title">Start with the site patients reach.</h2>
        </div>
        <p>No email wall. See the immediate technical signal first.</p>
      </div>
      <form className="visibility-audit__form" onSubmit={runAudit} noValidate>
        <label>
          <span className="data-label">Website address</span>
          <span className="visibility-audit__input">
            <i aria-hidden="true">URL</i>
            <input
              name="url"
              type="text"
              inputMode="url"
              autoComplete="url"
              spellCheck="false"
              placeholder="yourclinic.com"
              aria-describedby={state === "error" ? "audit-error" : "audit-note"}
              onFocus={() => state === "idle" && setState("focus")}
              onBlur={(event) => state === "focus" && !event.currentTarget.value && setState("idle")}
            />
          </span>
        </label>
        <button type="submit" disabled={state === "scanning"}>
          <span>{state === "scanning" ? "Running diagnostic" : "Run my visibility audit"}</span>
          <span aria-hidden="true">↗</span>
        </button>
      </form>
      <p className="visibility-audit__note data-label" id="audit-note">Real PageSpeed data / mobile strategy / no email required</p>

      <div className="visibility-audit__stage" aria-busy={state === "scanning"}>
        {(state === "idle" || state === "focus") && <DiagnosticIdle state={state} />}
        {state === "scanning" && <DiagnosticScan target={target} />}
        {state === "error" && (
          <div className="audit-error" id="audit-error" role="alert">
            <span className="data-label">Diagnostic not completed</span>
            <strong>{error}</strong>
            <button type="button" onClick={() => setState("idle")}>Try another address</button>
          </div>
        )}
        {state === "result" && result && <DiagnosticResult result={result} />}
      </div>

      {state === "result" && result ? <FullReviewForm website={result.url} /> : null}
    </section>
  );
}
