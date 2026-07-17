import { Button } from "@/components/ui/Button";

export function FormNavigation({
  step,
  totalSteps,
  isSubmitting,
  onBack,
  nextLabel,
}: {
  step: number;
  totalSteps: number;
  isSubmitting: boolean;
  onBack: () => void;
  nextLabel: string;
}) {
  const isLastStep = step === totalSteps;

  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      {step > 1 ? (
        <Button
          type="button"
          variant="secondary"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Zurück
        </Button>
      ) : (
        <span />
      )}
      <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
        {isLastStep ? "Kostenlose Anfrage senden" : nextLabel}
      </Button>
    </div>
  );
}
