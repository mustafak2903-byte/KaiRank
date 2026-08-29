import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "quiet";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <button className={`button button--${variant} ${className}`.trim()} {...props}>
      <span>{children}</span>
      {variant !== "quiet" ? <span className="button__arrow" aria-hidden="true">↗</span> : null}
    </button>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonLinkProps) {
  return (
    <Link className={`button button--${variant} ${className}`.trim()} href={href}>
      <span>{children}</span>
      {variant !== "quiet" ? <span className="button__arrow" aria-hidden="true">↗</span> : null}
    </Link>
  );
}
