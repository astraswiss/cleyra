import { useFormContext } from "react-hook-form";
import type { LeadFormValues } from "@/lib/lead-schema";
import { Checkbox } from "@/components/ui/Checkbox";
import { Textarea } from "@/components/ui/Textarea";
import { PhotoUploader } from "@/components/lead-form/PhotoUploader";

const extraOptions: { name: keyof LeadFormValues["extras"]; label: string }[] = [
  { name: "windows", label: "Fenster und Fensterrahmen" },
  { name: "balconyTerrace", label: "Balkon oder Terrasse" },
  { name: "cellar", label: "Kellerabteil" },
  { name: "oven", label: "Backofen" },
  { name: "fridge", label: "Kühlschrank" },
  { name: "blindsShutters", label: "Storen / Fensterläden" },
  { name: "garage", label: "Garage" },
  { name: "otherAreas", label: "Weitere Bereiche" },
];

export function StepExtras({
  photos,
  onPhotosChange,
}: {
  photos: File[];
  onPhotosChange: (files: File[]) => void;
}) {
  const { register, formState: { errors } } = useFormContext<LeadFormValues>();

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="font-display text-2xl font-bold tracking-tight text-ink-900">
        Was soll berücksichtigt werden?
      </legend>

      <div className="flex flex-col gap-3">
        {extraOptions.map((option) => (
          <Checkbox
            key={option.name}
            id={`extras.${option.name}`}
            label={option.label}
            {...register(`extras.${option.name}` as const)}
          />
        ))}
      </div>

      <Textarea
        id="notes"
        label="Anmerkungen (optional)"
        maxLength={1500}
        errorMessage={errors.notes?.message}
        {...register("notes")}
      />

      <PhotoUploader files={photos} onChange={onPhotosChange} />
    </fieldset>
  );
}

export const stepExtrasFields = ["extras", "notes"] as const;
