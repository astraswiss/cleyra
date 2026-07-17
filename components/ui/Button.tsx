import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type CommonProps = {
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    isLoading?: boolean;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  isLoading?: undefined;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClasses =
  "inline-flex min-h-[50px] items-center justify-center rounded-full px-7 text-base font-semibold transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary:
    "bg-brand-700 text-white shadow-soft hover:bg-brand-800 hover:shadow-card active:bg-brand-900 focus-visible:outline-brand-700",
  secondary:
    "bg-white text-brand-800 border border-ink-200 hover:border-brand-300 hover:bg-brand-50 focus-visible:outline-brand-700",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", children, className = "" } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { isLoading, disabled, ...buttonProps } =
    props as ButtonAsButton;

  return (
    <button
      {...buttonProps}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={classes}
    >
      {isLoading ? "…" : children}
    </button>
  );
}
