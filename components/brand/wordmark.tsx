import Link from "next/link";
import { SignalMark } from "@/components/brand/signal-mark";

type WordmarkProps = {
  href?: string;
  quiet?: boolean;
};

export function Wordmark({ href = "/", quiet = false }: WordmarkProps) {
  return (
    <Link className={`wordmark${quiet ? " wordmark--quiet" : ""}`} href={href} aria-label="KaiRank home">
      <SignalMark className="wordmark__mark" />
      <span className="wordmark__name">KaiRank</span>
    </Link>
  );
}
