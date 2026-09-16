"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { FastVisibilitySurface } from "@/lib/competitors/types";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";
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
        <div><span className="data-label">Public technical check</span><strong>{passed} / {result.fast.checks.length}</strong><small>checks passed</small></div>
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
            <span className="data-label">Mobile performance</span>
            <p>{state === "fast-result" ? "Requesting mobile performance data…" : "Google performance data temporarily unavailable."}</p>
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
      <p className="fast-result__url">Checked live: <strong>{result.fast.finalUrl}</strong></p>
    </div>
  );
}

function ReviewContext({ location, priorityService }: { location: string; priorityService: string }) {
  return (
    <div className="audit-context-ready" aria-live="polite">
      <div>
        <span className="data-label">Search context added</span>
        <h3>Now the competitive landscape has a useful frame.</h3>
      </div>
      <div className="audit-context-ready__query">
        <span>{priorityService}</span><i aria-hidden="true" /><span>{location}</span>
      </div>
      <p>A deeper review examines the real clinics and pages surfacing for this treatment and location.</p>
    </div>
  );
}

function ReviewActions({
  website,
  location,
  priorityService,
}: {
  website: string;
  location: string;
  priorityService: string;
}) {
  const subject = encodeURIComponent(`Search visibility context: ${priorityService} in ${location}`);
  const body = encodeURIComponent([
    "Hello KaiRank,",
    "",
    "I would like to discuss this search visibility context:",
    `Website: ${website}`,
    `Clinic location: ${location}`,
    `Priority treatment or service: ${priorityService}`,
  ].join("\n"));
  const emailHref = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;

  return (
    <div className="audit-review">
      <div className="audit-review__intro">
        <span className="data-label">Want the deeper search picture?</span>
        <strong>Turn these signals into a focused search conversation.</strong>
        <p>The public check shows the surface. A strategy conversation connects it to treatment demand, nearby competition and the pages that should work hardest.</p>
      </div>
      <div className="audit-review__actions">
        <BookingTrigger className="audit-review__booking" label="Talk through my findings" source="post-diagnostic" />
        <a className="audit-review__email" href={emailHref} onClick={() => trackEvent("diagnostic_email_clicked", { source: "post-diagnostic" })}>
          Email this context instead <span aria-hidden="true">↗</span>
        </a>
        <p>No account access requested. The calendar loads only when you choose to open it.</p>
      </div>
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
  const websiteRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLInputElement>(null);

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
      window.requestAnimationFrame(() => websiteRef.current?.focus());
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
      window.dispatchEvent(new CustomEvent("kairank:diagnostic-complete", { detail: { checks: fast.fast.checks } }));

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
      window.dispatchEvent(new CustomEvent("kairank:diagnostic-error"));
    }
  }

  function findVisibilityGap(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clinicLocation = location.trim();
    const service = priorityService.trim();
    trackEvent("visibility_gap_started", { source: "post-diagnostic" });
    if (!clinicLocation || !service) {
      setGapError("Add your clinic location and priority treatment or service.");
      window.requestAnimationFrame(() => (!clinicLocation ? locationRef.current : serviceRef.current)?.focus());
      return;
    }
    setGapError("");
    setGapReady(true);
    trackEvent("visibility_gap_completed", { result: "search-context-ready" });
  }

  const isBusy = state === "validating" || state === "scanning";
  const hasResult = fastResult !== null;

  return (
    <section className={`visibility-audit is-${state}`} id="audit" aria-labelledby="audit-title">
      <div className="visibility-audit__lead">
        <span className="data-label">Clinic search visibility diagnostic</span>
        <h2 id="audit-title">Let’s check your clinic.</h2>
        <p>Enter your website. We’ll check the public technical signals that can help—or hinder—discovery.</p>
      </div>

      <form className="visibility-audit__form visibility-audit__form--technical" onSubmit={runAudit} noValidate>
        <label>
          <span>Step 1 / Website</span>
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
        <button type="submit" disabled={isBusy}><span>{isBusy ? "Reading signal…" : "Run technical check"}</span><i aria-hidden="true">↗</i></button>
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

      {hasResult ? <FastResult result={fastResult} state={state} performance={performance} /> : null}

      {hasResult ? (
        <div className="audit-next">
        <div>
          <span className="data-label">Add search context</span>
          <strong>Now see which clinics are winning the searches that matter.</strong>
          <p>Add your location and priority treatment. KaiRank will frame the businesses appearing around that demand and where their visibility is stronger.</p>
        </div>
          <form onSubmit={findVisibilityGap} noValidate>
            <label><span>Location</span><input ref={locationRef} name="location" type="text" autoComplete="address-level2" placeholder="Birmingham" value={location} aria-invalid={Boolean(gapError && !location.trim())} aria-describedby={gapError ? "audit-gap-error" : undefined} onChange={(event) => { setLocation(event.target.value); setGapReady(false); setGapError(""); }} /></label>
            <label><span>Priority treatment or service</span><input ref={serviceRef} name="priorityService" type="text" placeholder="Deep tissue massage" value={priorityService} aria-invalid={Boolean(gapError && !priorityService.trim())} aria-describedby={gapError ? "audit-gap-error" : undefined} onChange={(event) => { setPriorityService(event.target.value); setGapReady(false); setGapError(""); }} /></label>
            <button type="submit">Add search context <span aria-hidden="true">↗</span></button>
          </form>
          {gapError ? <p className="audit-next__error" id="audit-gap-error" role="alert">{gapError}</p> : null}
        </div>
      ) : null}

      {hasResult && gapReady ? <ReviewContext location={location.trim()} priorityService={priorityService.trim()} /> : null}
      {hasResult && gapReady ? (
        <ReviewActions website={fastResult.fast.finalUrl} location={location.trim()} priorityService={priorityService.trim()} />
      ) : null}
    </section>
  );
}
