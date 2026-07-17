export function ProgressBar({
  step,
  totalSteps,
}: {
  step: number;
  totalSteps: number;
}) {
  const percent = Math.round((step / totalSteps) * 100);

  return (
    <div className="mb-6">
      <p className="mb-2 text-sm font-medium">
        Schritt {step} von {totalSteps}
      </p>
      <div
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Schritt ${step} von ${totalSteps}`}
        className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
      >
        <div
          className="h-full rounded-full bg-slate-900 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
