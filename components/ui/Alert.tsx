import type { ReactNode } from "react";

const variantClasses = {
  error: "border-red-300 bg-red-50 text-red-800",
  info: "border-slate-300 bg-slate-50 text-slate-800",
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
      className={`rounded-md border p-4 text-sm ${variantClasses[variant]}`}
    >
      {children}
    </div>
  );
}
