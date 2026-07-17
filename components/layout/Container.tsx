import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-content px-4 sm:px-6">{children}</div>;
}
