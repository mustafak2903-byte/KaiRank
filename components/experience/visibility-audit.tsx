"use client";

import { useState, type FormEvent } from "react";

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

type FastCheck = {
  finalUrl: string;
  statusCode: number;
  responseMs: number;
  redirects: string[];
  checks: Array<{
    id: string;
    label: string;
    status: "pass" | "attention" | "fail" | "info";
    value: string;
  }>;
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

function FastResult({ result, state, performance }: { result: FastResponse; state: AuditState; performance: PageSpeed | null }) {
  const passed = result.fast.checks.filter((check) => check.status === "pass").length;
  const needsAttention = result.fast.checks.length - passed;

  return (
    <div className="fast-result" role="status" aria-live="polite">
      <div className="fast-result__summary">
        <div><span className="data-label">Fast Check / complete</span><strong>{passed}/{result.fast.checks.length}</strong><small>signals clear</small></div>
        <div><span className="data-label">Public response</span><strong>{result.fast.statusCode}</strong><small>{result.fast.responseMs} ms</small></div>
        <div><span className="data-label">Review next</span><strong>{needsAttention}</strong><small>signal{needsAttention === 1 ? "" : "s"} to inspect</small></div>
      </div>
      <div className="fast-result__checks">
        {result.fast.checks.map((check) => (
          <div className={`is-${check.status}`} key={check.id}>
            <i aria-hidden="true" />
            <span>{check.label}</span>
            <strong>{check.value}</strong>
          </div>
        ))}
      </div>
      <div className="fast-result__performance">
        {performance ? (
          <>
            <span className="data-label">PageSpeed / mobile</span>
            <div><strong>{performance.scores.performance ?? "—"}</strong><small>Performance</small></div>
            <div><strong>{performance.scores.seo ?? "—"}</strong><small>SEO checks</small></div>
            <div><strong>{performance.scores.accessibility ?? "—"}</strong><small>Accessibility</small></div>
          </>
        ) : (
          <>
            <span className="data-label">PageSpeed / optional layer</span>
            <p>{state === "fast-result" ? "Fast Check ready. Requesting mobile performance data…" : "Performance data unavailable. Your Fast Check remains complete."}</p>
          </>
        )}
      </div>
      <p className="fast-result__url">Checked <strong>{result.fast.finalUrl}</strong></p>
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
    <div className="audit-review">
      <div><span className="data-label">Go beyond the public surface</span><strong>Request the full visibility review.</strong><p>Treatment demand, Maps, content gaps and AI discovery—reviewed together.</p></div>
      {state === "success" ? (
        <p className="audit-review__success" role="status">{message}</p>
      ) : (
        <form onSubmit={submitReview} noValidate>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="you@yourclinic.com" required /></label>
          <label><span>Clinic <i>optional</i></span><input name="businessName" type="text" autoComplete="organization" placeholder="Clinic name" /></label>
          <button type="submit" disabled={state === "sending"}>{state === "sending" ? "Confirming…" : "Request review"}<span aria-hidden="true">↗</span></button>
          {message ? <p className={`audit-review__message is-${state}`} role={state === "error" ? "alert" : "status"}>{message}</p> : null}
        </form>
      )}
    </div>
  );
}

export function VisibilityAudit() {
  const [state, setState] = useState<AuditState>("idle");
  const [target, setTarget] = useState("");
  const [error, setError] = useState("");
  const [fastResult, setFastResult] = useState<FastResponse | null>(null);
  const [performance, setPerformance] = useState<PageSpeed | null>(null);

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
    const form = new FormData(event.currentTarget);
    const url = String(form.get("url") ?? "").trim();

    setState("validating");
    if (!url) {
      setError("Add your website address—for example, yourclinic.com.");
      setState("error");
      return;
    }

    setTarget(url);
    setError("");
    setFastResult(null);
    setPerformance(null);
    setState("scanning");

    try {
      const fast = await post<FastResponse>(url, "fast");
      setFastResult(fast);
      setState("fast-result");

      try {
        const secondLayer = await post<PageSpeedResponse>(fast.fast.finalUrl, "pagespeed");
        if (secondLayer.pageSpeed.status === "complete") {
          setPerformance(secondLayer.pageSpeed);
          setState("full-result");
        } else {
          setState("pagespeed-unavailable");
        }
      } catch {
        setState("partial-result");
      }
    } catch (auditError) {
      const timedOut = auditError instanceof Error && auditError.name === "TimeoutError";
      setError(auditError instanceof Error ? auditError.message : "The Fast Check could not be completed.");
      setState(timedOut ? "timeout" : "error");
    }
  }

  const isBusy = state === "validating" || state === "scanning";
  const hasResult = fastResult !== null;

  return (
    <section className={`visibility-audit is-${state}`} id="audit" aria-labelledby="audit-title">
      <div className="visibility-audit__lead">
        <span className="data-label">Fast Check / no email wall</span>
        <h2 id="audit-title">See the public signal first.</h2>
        <p>Technical essentials now. PageSpeed if available.</p>
      </div>
      <form className="visibility-audit__form" onSubmit={runAudit} noValidate>
        <label>
          <span className="sr-only">Website address</span>
          <i aria-hidden="true">https://</i>
          <input
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck="false"
            placeholder="yourclinic.com"
            aria-describedby={state === "error" || state === "timeout" ? "audit-error" : "audit-detail"}
            onFocus={() => state === "idle" && setState("focus")}
            onBlur={(event) => state === "focus" && !event.currentTarget.value && setState("idle")}
          />
        </label>
        <button type="submit" disabled={isBusy}><span>{isBusy ? "Reading signal…" : "Run Fast Check"}</span><i aria-hidden="true">↗</i></button>
      </form>
      <p className="visibility-audit__detail data-label" id="audit-detail">Public fetch · safe redirects · on-page signals · optional PageSpeed</p>

      {isBusy ? (
        <div className="audit-scan" aria-live="polite" role="status">
          <i aria-hidden="true" /><span>{state === "validating" ? "Validating the destination" : "Reading the public technical surface"}</span><small>{target}</small>
        </div>
      ) : null}

      {(state === "error" || state === "timeout") ? (
        <div className="audit-error" id="audit-error" role="alert">
          <span className="data-label">{state === "timeout" ? "Fast Check timed out" : "Fast Check stopped"}</span>
          <strong>{error}</strong>
          <button type="button" onClick={() => setState("idle")}>Try another address</button>
        </div>
      ) : null}

      {hasResult ? <FastResult result={fastResult} state={state} performance={performance} /> : null}
      {hasResult ? <FullReviewForm website={fastResult.fast.finalUrl} /> : null}
    </section>
  );
}
