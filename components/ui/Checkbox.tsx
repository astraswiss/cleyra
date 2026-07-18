import { forwardRef, type InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errorMessage?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, errorMessage, id, className = "", ...rest }, ref) => {
    const errorId = errorMessage ? `${id}-error` : undefined;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <input
            {...rest}
            type="checkbox"
            id={id}
            ref={ref}
            aria-invalid={Boolean(errorMessage) || undefined}
            aria-describedby={errorId}
            className={`h-5 w-5 rounded border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${className}`}
          />
          <label htmlFor={id} className="text-sm">
            {label}
          </label>
        </div>
        {errorMessage ? (
          <p id={errorId} role="alert" className="text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
