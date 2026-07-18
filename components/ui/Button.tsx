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
  "inline-flex min-h-[50px] items-center justify-center rounded-md px-6 text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-700 focus-visible:outline-slate-900",
  secondary:
    "bg-white text-slate-900 border border-slate-300 hover:bg-slate-50 focus-visible:outline-slate-900",
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
