const proof = [
  { value: "8,076", label: "patient calls in one month", context: "South City Hospital" },
  { value: "194", label: "doctor profiles in Google’s top 10", context: "South City Hospital" },
  { value: "682", label: "organic clicks in 90 days", context: "The Recovery Room" },
  { value: "22,100", label: "search impressions in 90 days", context: "The Recovery Room" },
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
