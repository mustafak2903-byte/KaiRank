const proof = [
  { value: "40.5K", label: "Google Search clicks in August 2026", context: "South City Hospital" },
  { value: "8,801", label: "profile call actions in July 2026", context: "South City Hospital" },
  { value: "3,027", label: "Google Search clicks in six months", context: "The Recovery Room" },
  { value: "180,419", label: "search impressions in six months", context: "The Recovery Room" },
] as const;

export function ProofLedger() {
  return (
    <div className="proof-ledger">
      <div className="proof-ledger__header data-label">
        <span>Verified result</span><span>Measure</span><span>Context</span>
      </div>
      {proof.map((item, index) => (
        <div className="proof-ledger__row" key={item.label}>
          <span className="proof-ledger__index data-label">0{index + 1}</span>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
          <small>{item.context}</small>
        </div>
      ))}
    </div>
  );
}
