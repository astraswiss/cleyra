import { forwardRef, type TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  errorMessage?: string;
  hint?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, errorMessage, hint, id, className = "", ...rest }, ref) => {
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = errorMessage ? `${id}-error` : undefined;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {hint ? (
          <p id={hintId} className="text-sm text-slate-600">
            {hint}
          </p>
        ) : null}
        <textarea
          {...rest}
          id={id}
          ref={ref}
          rows={rest.rows ?? 4}
          aria-invalid={Boolean(errorMessage) || undefined}
          aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
          className={`rounded-md border px-3 py-2 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
            errorMessage ? "border-red-600" : "border-slate-300"
          } ${className}`}
        />
        {errorMessage ? (
          <p id={errorId} role="alert" className="text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
