import type { ReactNode } from "react";

const variantClasses = {
  error: "border-red-300 bg-red-50 text-red-800",
  info: "border-ink-200 bg-ink-50 text-ink-800",
};

export function Alert({
  variant = "info",
  children,
}: {
  variant?: "error" | "info";
  children: ReactNode;
}) {
  return (
    <div
      role="alert"
      className={`rounded-xl border p-4 text-sm ${variantClasses[variant]}`}
    >
      {children}
    </div>
  );
}
