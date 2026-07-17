type FieldError = { name: string; label: string; message: string };

export function FormErrorSummary({ errors }: { errors: FieldError[] }) {
  if (errors.length === 0) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="mb-6 rounded-md border border-red-300 bg-red-50 p-4"
    >
      <p className="font-medium text-red-800">
        Bitte korrigieren Sie folgende Angaben:
      </p>
      <ul className="mt-2 list-disc pl-5 text-sm text-red-800">
        {errors.map((error) => (
          <li key={error.name}>
            <a href={`#${error.name}`} className="underline">
              {error.label}: {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
