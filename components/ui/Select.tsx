import { forwardRef, type SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  errorMessage?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, errorMessage, options, placeholder, id, className = "", ...rest }, ref) => {
    const errorId = errorMessage ? `${id}-error` : undefined;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-sm font-semibold text-ink-800">
          {label}
        </label>
        <select
          {...rest}
          id={id}
          ref={ref}
          aria-invalid={Boolean(errorMessage) || undefined}
          aria-describedby={errorId}
          className={`min-h-[50px] rounded-xl border bg-white px-3 text-base transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 ${
            errorMessage ? "border-red-600" : "border-ink-200"
          } ${className}`}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage ? (
          <p id={errorId} role="alert" className="text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";
