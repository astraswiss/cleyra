import type { ComponentPropsWithoutRef } from "react";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  muted?: boolean;
};

export function Section({
  className = "",
  muted = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={muted ? "bg-zinc-50" : undefined} {...props}>
      <div className={`mx-auto max-w-3xl px-6 py-12 sm:py-16 ${className}`}>
        {children}
      </div>
    </section>
  );
}
