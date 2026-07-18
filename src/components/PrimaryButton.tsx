import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type PrimaryButtonProps = ComponentPropsWithoutRef<typeof Link>;

export function PrimaryButton({ className = "", ...props }: PrimaryButtonProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 font-medium text-white transition-colors hover:bg-brand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
      {...props}
    />
  );
}
