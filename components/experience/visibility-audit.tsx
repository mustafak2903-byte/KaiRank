"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { buildVisibilityGap } from "@/lib/competitors/compare";
import type { FastVisibilitySurface } from "@/lib/competitors/types";
import { trackEvent } from "@/lib/analytics";

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

const resultGroups = [
  { title: "Technical access", ids: ["response", "https"] },
  { title: "Page fundamentals", ids: ["title", "description", "h1"] },
  { title: "Indexation signals", ids: ["canonical", "robots", "sitemap"] },
  { title: "Structure", ids: ["structured"] },
  { title: "Mobile readiness", ids: ["viewport"] },
] as const;

function FastResult({ result, state, performance }: { result: FastResponse; state: AuditState; performance: PageSpeed | null }) {
  const passed = result.fast.checks.filter((check) => check.status === "pass").length;
  const needsAttention = result.fast.checks.length - passed;
  const rank = { pass: 0, info: 1, attention: 2, fail: 3 } as const;
  const groups = resultGroups.map((group) => {
    const checks = result.fast.checks.filter((check) => (group.ids as readonly string[]).includes(check.id));
    const status = checks.reduce<(typeof checks)[number]["status"]>(
      (current, check) => rank[check.status] > rank[current] ? check.status : current,
      "pass",
    );
    return { ...group, checks, status, clear: checks.filter((check) => check.status === "pass").length };
  });

  return (
    <div className="fast-result" role="status" aria-live="polite">
      <div className="fast-result__summary">
        <div><span className="data-label">Fast technical check / complete</span><strong>{passed}/{result.fast.checks.length}</strong><small>signals clear</small></div>
        <div><span className="data-label">Public response</span><strong>{result.fast.statusCode}</strong><small>{result.fast.responseMs} ms</small></div>
        <div><span className="data-label">Review next</span><strong>{needsAttention}</strong><small>signal{needsAttention === 1 ? "" : "s"} to inspect</small></div>
      </div>

      <div className="fast-result__groups" aria-label="Grouped website checks">
        {groups.map((group) => (
          <div className={`is-${group.status}`} key={group.title}>
            <i aria-hidden="true" />
            <span>{group.title}</span>
            <strong>{group.clear}/{group.checks.length} clear</strong>
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
            <span className="data-label">PageSpeed / optional enrichment</span>
            <p>{state === "fast-result" ? "Requesting mobile performance data…" : "Google performance data temporarily unavailable. The technical check remains complete."}</p>
          </>
        )}
      </div>

      <details className="fast-result__details">
        <summary>View all 10 technical checks <span aria-hidden="true">+</span></summary>
        <div className="fast-result__checks">
          {result.fast.checks.map((check) => (
            <div className={`is-${check.status}`} key={check.id}>
              <i aria-hidden="true" />
              <span>{check.label}</span>
              <strong>{check.value}</strong>
            </div>
          ))}
        </div>
      </details>
      <p className="fast-result__url">Live audit data · checked <strong>{result.fast.finalUrl}</strong></p>
    </div>
  );
}

function VisibilityGap({ result, location, priorityService }: { result: FastCheck; location: string; priorityService: string }) {
  const gap = useMemo(() => buildVisibilityGap(result, { website: result.finalUrl, location, priorityService }), [result, location, priorityService]);

  return (
    <section className="visibility-gap" aria-labelledby="visibility-gap-title" aria-live="polite">
      <div className="visibility-gap__header">
        <span className="data-label">Visibility Gap / public-signal MVP</span>
        <h3 id="visibility-gap-title">Your clinic’s observable search surface.</h3>
        <p>Useful before email. Honest about what still needs a provider-backed or manual review.</p>
      </div>
      <div className="visibility-gap__context data-label">
        <span>{location}</span><span>{priorityService}</span><span>Website signals only</span>
      </div>
      <div className="visibility-gap__signals">
        {gap.clinic.signals.map((signal) => (
          <details key={signal.id}>
            <summary>
              <span>{signal.label}</span>
              <strong className={`is-${signal.status}`}>{signal.status.replace("-", " ")}</strong>
              <i aria-hidden="true">+</i>
            </summary>
            <p><b>Why am I seeing this?</b> {signal.evidence}</p>
          </details>
        ))}
      </div>
      <div className="visibility-gap__opportunity">
        <span className="data-label">Strongest observed opportunity</span>
        <strong>{gap.strongestOpportunity.label}</strong>
        <p>{gap.strongestOpportunity.evidence}</p>
      </div>
      <div className="visibility-gap__provider">
        <span className="data-label">Competitive comparison / needs provider</span>
        <p>{gap.provider.note}</p>
      </div>
      <p className="visibility-gap__note">{gap.note}</p>
    </section>
  );
}

function FullReviewForm({
  website,
  location,
  priorityService,
  auditResults,
}: {
  website: string;
  location: string;
  priorityService: string;
  auditResults: FastCheck;
}) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");
    trackEvent("full_review_requested", { source: "visibility-gap" });
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/visibility-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website,
          location,
          priorityService,
          email: String(form.get("email") ?? ""),
          businessName: String(form.get("businessName") ?? ""),
          numberOfLocations: String(form.get("numberOfLocations") ?? ""),
          auditResults: {
            statusCode: auditResults.statusCode,
            responseMs: auditResults.responseMs,
            checks: auditResults.checks.map(({ id, status }) => ({ id, status })),
          },
        }),
      });
      const payload = (await response.json()) as ApiError;
      if (!response.ok) throw new Error(payload.message ?? "The review request could not be confirmed.");
      setState("success");
      setMessage("Request confirmed. KaiRank will review the deeper visibility picture.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "The review request could not be confirmed.");
    }
  }

  return (
    <div className="audit-review">
      <div>
        <span className="data-label">Want the deeper visibility breakdown?</span>
        <strong>Review what automation cannot see.</strong>
        <p>Treatment demand, local competition and the wider gaps—without pretending the automated check knows more than it does.</p>
      </div>
      {state === "success" ? (
        <p className="audit-review__success" role="status">{message}</p>
      ) : (
        <form onSubmit={submitReview} noValidate>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="you@yourclinic.com" required /></label>
          <label><span>Clinic <i>optional</i></span><input name="businessName" type="text" autoComplete="organization" placeholder="Clinic name" /></label>
          <label>
            <span>Number of locations <i>optional</i></span>
            <select name="numberOfLocations" defaultValue="">
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2-5">2–5</option>
              <option value="6-20">6–20</option>
              <option value="21+">21+</option>
            </select>
          </label>
          <button type="submit" disabled={state === "sending"}>{state === "sending" ? "Confirming…" : "Request deeper review"}<span aria-hidden="true">↗</span></button>
          {message ? <p className={`audit-review__message is-${state}`} role={state === "error" ? "alert" : "status"}>{message}</p> : null}
        </form>
      )}
    </div>
  );
}

export function VisibilityAudit() {
  const [state, setState] = useState<AuditState>("idle");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [priorityService, setPriorityService] = useState("");
  const [target, setTarget] = useState("");
  const [error, setError] = useState("");
  const [gapError, setGapError] = useState("");
  const [gapReady, setGapReady] = useState(false);
  const [fastResult, setFastResult] = useState<FastResponse | null>(null);
  const [performance, setPerformance] = useState<PageSpeed | null>(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("kairank:diagnostic-context", {
      detail: { website, location, priorityService, scanning: state === "scanning" },
    }));
  }, [website, location, priorityService, state]);

  useEffect(() => {
    if (!fastResult) return;
    window.dispatchEvent(new CustomEvent("kairank:diagnostic-state", { detail: { gapReady } }));
  }, [fastResult, gapReady]);

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
    setGapReady(false);
    setGapError("");
    trackEvent("diagnostic_started", { source: "homepage" });

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
      setWebsite(fast.fast.finalUrl);
      setState("fast-result");
      trackEvent("diagnostic_completed", { status: fast.fast.statusCode });

      try {
        const secondLayer = await post<PageSpeedResponse>(fast.fast.finalUrl, "pagespeed");
        if (secondLayer.pageSpeed.status === "complete") {
          setPerformance(secondLayer.pageSpeed);
          setState("full-result");
        } else {
          setState("pagespeed-unavailable");
          trackEvent("diagnostic_partial", { reason: "pagespeed-unavailable" });
        }
      } catch {
        setState("partial-result");
        trackEvent("diagnostic_partial", { reason: "pagespeed-request-failed" });
      }
    } catch (auditError) {
      const timedOut = auditError instanceof Error && auditError.name === "TimeoutError";
      setError(auditError instanceof Error ? auditError.message : "The technical check could not be completed.");
      setState(timedOut ? "timeout" : "error");
    }
  }

  function findVisibilityGap(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clinicLocation = location.trim();
    const service = priorityService.trim();
    trackEvent("visibility_gap_started", { source: "post-diagnostic" });
    if (!clinicLocation || !service) {
      setGapError("Add your clinic location and priority treatment or service.");
      return;
    }
    setGapError("");
    setGapReady(true);
    trackEvent("visibility_gap_completed", { provider: "website-signals-only" });
  }

  const isBusy = state === "validating" || state === "scanning";
  const hasResult = fastResult !== null;

  return (
    <section className={`visibility-audit is-${state}`} id="audit" aria-labelledby="audit-title">
      <div className="visibility-audit__lead">
        <span className="data-label">Clinic search visibility diagnostic</span>
        <h2 id="audit-title">See the public signals first.</h2>
        <p>Start with a live technical check. Then add your location and priority treatment to uncover the deeper visibility gap.</p>
      </div>

      <form className="visibility-audit__form visibility-audit__form--technical" onSubmit={runAudit} noValidate>
        <label>
          <span>Step 1 / Website</span>
          <input
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck="false"
            placeholder="yourclinic.com"
            aria-describedby={state === "error" || state === "timeout" ? "audit-error" : "audit-detail"}
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            onFocus={() => state === "idle" && setState("focus")}
          />
        </label>
        <button type="submit" disabled={isBusy}><span>{isBusy ? "Reading signal…" : "Run technical check"}</span><i aria-hidden="true">↗</i></button>
      </form>
      <p className="visibility-audit__detail data-label" id="audit-detail">Public fetch · safe redirects · on-page signals · optional PageSpeed</p>

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

      {hasResult ? <FastResult result={fastResult} state={state} performance={performance} /> : null}

      {hasResult ? (
        <div className="audit-next">
          <div>
            <span className="data-label">Step 2 / Visibility Gap</span>
            <strong>Technical foundation checked. Now let’s look at the search opportunity.</strong>
          </div>
          <form onSubmit={findVisibilityGap} noValidate>
            <label><span>Location</span><input name="location" type="text" autoComplete="address-level2" placeholder="Birmingham" value={location} onChange={(event) => { setLocation(event.target.value); setGapReady(false); }} /></label>
            <label><span>Priority treatment or service</span><input name="priorityService" type="text" placeholder="Deep tissue massage" value={priorityService} onChange={(event) => { setPriorityService(event.target.value); setGapReady(false); }} /></label>
            <button type="submit">Find my visibility gap <span aria-hidden="true">↗</span></button>
          </form>
          {gapError ? <p className="audit-next__error" role="alert">{gapError}</p> : null}
        </div>
      ) : null}

      {hasResult && gapReady ? <VisibilityGap result={fastResult.fast} location={location.trim()} priorityService={priorityService.trim()} /> : null}
      {hasResult && gapReady ? (
        <FullReviewForm website={fastResult.fast.finalUrl} location={location.trim()} priorityService={priorityService.trim()} auditResults={fastResult.fast} />
      ) : null}
    </section>
  );
}
