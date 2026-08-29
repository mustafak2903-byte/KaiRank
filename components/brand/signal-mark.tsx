type SignalMarkProps = {
  className?: string;
  title?: string;
};

export function SignalMark({ className, title }: SignalMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 42 42"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path className="signal-mark__frame" d="M4 7.5h34v27H4z" />
      <path className="signal-mark__path" d="M8 29h7V13h11v10h8" />
      <circle className="signal-mark__node" cx="34" cy="23" r="3" />
      <path className="signal-mark__axis" d="M4 34.5h34M3.5 7.5v27" />
    </svg>
  );
}
