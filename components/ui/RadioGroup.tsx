import type { InputHTMLAttributes } from "react";

type RadioOption = { value: string; label: string };

type RadioGroupProps = {
  legend: string;
  name: string;
  options: RadioOption[];
  value?: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "value" | "onChange">;

export function RadioGroup({
  legend,
  name,
  options,
  value,
  errorMessage,
  onChange,
  onBlur,
}: RadioGroupProps) {
  const errorId = errorMessage ? `${name}-error` : undefined;

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-semibold text-ink-800">{legend}</legend>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          return (
            <div key={option.value} className="flex items-center gap-2">
              <input
                type="radio"
                id={id}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange?.(option.value)}
                onBlur={onBlur}
                aria-describedby={errorId}
                className="h-5 w-5 border-ink-300 text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
              />
              <label htmlFor={id} className="text-sm text-ink-700">
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
      {errorMessage ? (
        <p id={errorId} role="alert" className="text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}
    </fieldset>
  );
}
