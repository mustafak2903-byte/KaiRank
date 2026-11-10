import Link from "next/link";

const moments = [
  {
    index: "01",
    label: "Surface area",
    value: "+500%",
    title: "Search impressions",
    body: "Impressions increased from 8.5K to 51K when the first and latest 28 days of the six-month Search Console dataset are compared.",
  },
  {
    index: "02",
    label: "Organic discovery",
    value: "+204%",
    title: "Organic clicks",
    body: "Google Search clicks increased from 271 to 825 across the same first-versus-latest 28-day comparison.",
  },
  {
    index: "03",
    label: "Commercial intent",
    value: "#1",
    title: "High-intent treatment search",
    body: "“Deep tissue massage Birmingham” reached first position during the documented case-study period.",
  },
] as const;

export function RecoveryProgress() {
  return (
    <div className="recovery-progress v8-recovery" data-reveal>
      <div className="recovery-progress__sticky v8-recovery__ledger">
        <div className="recovery-progress__narrative v8-recovery__metrics">
          {moments.map((moment, phase) => (
            <article data-stage={phase} key={moment.index}>
              <div><span className="data-label">{moment.index} / {moment.label}</span><strong>{moment.value}</strong></div>
              <div><h3>{moment.title}</h3><p>{moment.body}</p></div>
            </article>
          ))}
        </div>

        <div className="recovery-progress__evidence">
          <div className="v8-recovery__status data-label"><span><i aria-hidden="true" /> Verified project evidence</span><span>Source linked</span></div>
          <div className="recovery-query"><span className="data-label">Commercial-intent query</span><strong>deep tissue massage birmingham</strong></div>
          <div className="recovery-result"><span>01</span><div><strong>The Recovery Room</strong><small>Organic result · Birmingham</small></div><i /></div>
          <dl>
            <div><dt>3.03K</dt><dd>Google Search clicks / six months</dd></div>
            <div><dt>180K</dt><dd>search impressions / six months</dd></div>
            <div><dt>629</dt><dd>sitewide Treatwell-link clicks / 90 days</dd></div>
          </dl>
          <p className="v8-recovery__method">Technical repairs, local search work and treatment-page architecture expanded measurable discovery. The 629 Treatwell-link clicks indicate booking intent—not confirmed appointments or organic-attributed revenue.</p>
          <div className="v9-recovery__links">
            <Link className="recovery-source-link" data-event="evidence_opened" data-event-label="The Recovery Room case study" href="/case-studies/the-recovery-room">Read the evidence ledger <span aria-hidden="true">↗</span></Link>
            <a className="recovery-source-link recovery-source-link--quiet" data-event="evidence_opened" data-event-label="The Recovery Room source report" href="https://drive.google.com/file/d/1J4ZsFBqIM2yaaLEP7uJljvjyYRoD-cLO/view?usp=sharing" target="_blank" rel="noreferrer">Open source report <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </div>
  );
}
