"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { FastVisibilitySurface } from "@/lib/competitors/types";
import { trackEvent } from "@/lib/analytics";
import { BookingTrigger } from "@/components/experience/booking-trigger";

type AuditState =
  | "idle"
  | "focus"
  | "validating"
  | "scanning"
  | "fast-result"
  | "full-result"
  | "partial-result"
  | "pagespeed-unavailable"
  | "error"
  | "timeout";

type FastCheck = FastVisibilitySurface & {
  redirects: string[];
};

type FastResponse = {
  kind: "visibility-diagnostic";
  level: "fast";
  generatedAt: string;
  requestedUrl: string;
  fast: FastCheck;
  note: string;
};

type PageSpeedMetric = { value: number | null; display: string; unit: string | null };

type PageSpeed = {
  status: "complete";
  url: string;
  scores: { performance: number | null; seo: number | null; accessibility: number | null };
  metrics: { lcp: PageSpeedMetric; cls: PageSpeedMetric; inp: PageSpeedMetric };
};

type PageSpeedResponse = {
  kind: "visibility-diagnostic";
  level: "pagespeed";
  pageSpeed: PageSpeed | { status: "unavailable"; reason: string };
};

type ApiError = { code?: string; message?: string };

const statusLabel = {
  pass: "Observed",
  attention: "Review",
  fail: "Blocked",
  info: "Information",
} as const;

function displayTimestamp(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(value));
}

function FastResult({
  result,
  state,
  performance,
  performanceMessage,
}: {
  result: FastResponse;
  state: AuditState;
  performance: PageSpeed | null;
  performanceMessage: string;
}) {
  const passed = result.fast.checks.filter((check) => check.status === "pass").length;
  const review = result.fast.checks.filter((check) => check.status === "attention" || check.status === "fail").length;
  const informational = result.fast.checks.filter((check) => check.status === "info").length;

  return (
    <div className="fast-result" role="status" aria-live="polite">
      <div className="fast-result__headline">
        <div><span className="data-label">Public website check complete</span><strong>{result.fast.finalUrl}</strong></div>
        <p>Checked {displayTimestamp(result.generatedAt)}. Each finding below names the public source, what was observed and what the check cannot prove.</p>
      </div>

      <div className="fast-result__boundary">
        <strong>This is not Search Console data.</strong>
        <p>This public check cannot confirm Google index coverage, rankings, traffic, penalties or conversions without authorised Search Console and analytics access.</p>
      </div>

      <dl className="fast-result__summary" aria-label="Check summary">
        <div><dt>Observed</dt><dd>{passed}</dd><small>checks with the expected public signal</small></div>
        <div><dt>Review</dt><dd>{review}</dd><small>checks needing attention or blocked</small></div>
        <div><dt>Information</dt><dd>{informational}</dd><small>neutral observations, not defects</small></div>
      </dl>

      <div className="fast-result__evidence" aria-label="Public technical evidence">
        {result.fast.checks.map((check) => (
          <article className={`is-${check.status}`} key={check.id}>
            <header><i aria-hidden="true" /><span className="data-label">{statusLabel[check.status]}</span><h3>{check.label}</h3></header>
            <strong>{check.value}</strong>
            <dl>
              <div><dt>Source checked</dt><dd>{check.source ?? result.fast.finalUrl}</dd></div>
              <div><dt>Why it matters</dt><dd>{check.why ?? "This public signal helps describe the page’s technical setup."}</dd></div>
              <div><dt>Limit</dt><dd>{check.limitation ?? "This single public check does not establish rankings or index coverage."}</dd></div>
            </dl>
          </article>
        ))}
      </div>

      <div className="fast-result__performance">
        {performance ? (
          <>
            <div className="fast-result__performance-copy"><span className="data-label">Google PageSpeed · mobile lab test</span><p>A separate Google Lighthouse request. These scores are not Search Console or field performance data.</p></div>
            <div><strong>{performance.scores.performance ?? "—"}</strong><small>Performance</small></div>
            <div><strong>{performance.scores.seo ?? "—"}</strong><small>SEO checks</small></div>
            <div><strong>{performance.scores.accessibility ?? "—"}</strong><small>Accessibility</small></div>
          </>
        ) : (
          <>
            <div className="fast-result__performance-copy"><span className="data-label">Google PageSpeed · mobile lab test</span><p>{state === "fast-result" ? "Requesting a separate mobile Lighthouse test…" : performanceMessage || "Google PageSpeed did not return a result. The public checks above remain valid."}</p></div>
          </>
        )}
      </div>
    </div>
  );
}

function ReviewActions() {
  return (
    <div className="audit-review">
      <div className="audit-review__intro">
        <span className="data-label">Your next practical step</span>
        <strong>Connect the website signals to the treatments that matter.</strong>
        <p>A clinic visibility review adds your location, priority treatment and real competitors—without asking for account access first.</p>
      </div>
      <div className="audit-review__actions">
        <BookingTrigger className="audit-review__booking" label="Talk through my findings" source="post-diagnostic" />
        <p>No account access requested. The calendar loads only when you choose to open it.</p>
      </div>
    </div>
  );
}

export function VisibilityAudit() {
  const [state, setState] = useState<AuditState>("idle");
  const [website, setWebsite] = useState("");
  const [target, setTarget] = useState("");
  const [error, setError] = useState("");
  const [fastResult, setFastResult] = useState<FastResponse | null>(null);
  const [performance, setPerformance] = useState<PageSpeed | null>(null);
  const [performanceMessage, setPerformanceMessage] = useState("");
  const websiteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("kairank:diagnostic-context", {
      detail: { website, scanning: state === "scanning" },
    }));
  }, [website, state]);

  async function post<T>(url: string, level: "fast" | "pagespeed") {
    const response = await fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, level }),
    });
    const payload = (await response.json()) as T | ApiError;
    if (!response.ok) {
      const apiError = payload as ApiError;
      const requestError = new Error(apiError.message ?? "The diagnostic could not be completed.");
      requestError.name = apiError.code === "timeout" ? "TimeoutError" : "AuditError";
      throw requestError;
    }
    return payload as T;
  }

  async function runAudit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = website.trim();
    setState("validating");
    trackEvent("diagnostic_started", { source: "homepage" });

    if (!url) {
      setError("Add your website address—for example, yourclinic.com.");
      setState("error");
      window.requestAnimationFrame(() => websiteRef.current?.focus());
      return;
    }

    setTarget(url);
    setError("");
    setFastResult(null);
    setPerformance(null);
    setPerformanceMessage("");
    setState("scanning");

    try {
      const fast = await post<FastResponse>(url, "fast");
      setFastResult(fast);
      setWebsite(fast.fast.finalUrl);
      setState("fast-result");
      trackEvent("diagnostic_completed", { status: fast.fast.statusCode });
      window.dispatchEvent(new CustomEvent("kairank:diagnostic-complete", { detail: { checks: fast.fast.checks } }));

      try {
        const secondLayer = await post<PageSpeedResponse>(fast.fast.finalUrl, "pagespeed");
        if (secondLayer.pageSpeed.status === "complete") {
          setPerformance(secondLayer.pageSpeed);
          setState("full-result");
        } else {
          setPerformanceMessage(secondLayer.pageSpeed.reason);
          setState("pagespeed-unavailable");
          trackEvent("diagnostic_partial", { reason: "pagespeed-unavailable" });
        }
      } catch {
        setPerformanceMessage("Google PageSpeed did not return a result. The public checks above remain valid.");
        setState("partial-result");
        trackEvent("diagnostic_partial", { reason: "pagespeed-request-failed" });
      }
    } catch (auditError) {
      const timedOut = auditError instanceof Error && auditError.name === "TimeoutError";
      setError(auditError instanceof Error ? auditError.message : "The technical check could not be completed.");
      setState(timedOut ? "timeout" : "error");
      window.dispatchEvent(new CustomEvent("kairank:diagnostic-error"));
    }
  }

  const isBusy = state === "validating" || state === "scanning";
  const hasResult = fastResult !== null;

  return (
    <section className={`visibility-audit is-${state}`} id="audit" aria-labelledby="audit-title">
      <div className="visibility-audit__lead">
        <span className="data-label">Free website health check</span>
        <h2 id="audit-title">Check the public health of your website.</h2>
        <p>Enter your website to review the technical signals that can help—or hinder—search visibility.</p>
      </div>

      <form className="visibility-audit__form visibility-audit__form--technical" onSubmit={runAudit} noValidate>
        <label>
          <span>Your website</span>
          <input
            ref={websiteRef}
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck="false"
            placeholder="yourclinic.com"
            aria-describedby={state === "error" || state === "timeout" ? "audit-error" : "audit-detail"}
            aria-invalid={state === "error" || state === "timeout"}
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            onFocus={() => state === "idle" && setState("focus")}
          />
        </label>
        <button type="submit" disabled={isBusy}><span>{isBusy ? "Checking website…" : "Check my website"}</span><i aria-hidden="true">↗</i></button>
      </form>
      <p className="visibility-audit__detail data-label" id="audit-detail">Public signals only · no account or website access</p>

      {isBusy ? (
        <div className="audit-scan" aria-live="polite" role="status">
          <i aria-hidden="true" /><span>{state === "validating" ? "Validating the destination" : "Reading the public technical surface"}</span><small>{target}</small>
        </div>
      ) : null}

      {(state === "error" || state === "timeout") ? (
        <div className="audit-error" id="audit-error" role="alert">
          <span className="data-label">{state === "timeout" ? "Technical check timed out" : "Technical check stopped"}</span>
          <strong>{error}</strong>
          <button type="button" onClick={() => setState("idle")}>Check the address</button>
        </div>
      ) : null}

      {hasResult ? <FastResult result={fastResult} state={state} performance={performance} performanceMessage={performanceMessage} /> : null}

      {hasResult ? <ReviewActions /> : null}
    </section>
  );
}
