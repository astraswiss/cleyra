import { Controller, useFormContext } from "react-hook-form";
import type { LeadFormValues } from "@/lib/lead-schema";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Checkbox } from "@/components/ui/Checkbox";
import { Textarea } from "@/components/ui/Textarea";

const approxSqmRangeOptions = [
  { value: "under_50", label: "unter 50 m²" },
  { value: "50_80", label: "50–80 m²" },
  { value: "81_110", label: "81–110 m²" },
  { value: "over_110", label: "über 110 m²" },
  { value: "unknown", label: "nicht bekannt" },
];

const emptyStateOptions = [
  { value: "empty", label: "Ja" },
  { value: "partial", label: "Teilweise" },
  { value: "furnished", label: "Nein" },
];

const additionalAreaOptions: {
  name: "windows" | "balcony" | "cellar";
  label: string;
}[] = [
  { name: "windows", label: "Fenster" },
  { name: "balcony", label: "Balkon" },
  { name: "cellar", label: "Keller" },
];

export function StepApartment() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<LeadFormValues>();

  const additionalAreas = watch("additionalAreas");
  const noneSelected =
    !additionalAreas?.windows &&
    !additionalAreas?.balcony &&
    !additionalAreas?.cellar;

  function selectNone() {
    setValue("additionalAreas.windows", false);
    setValue("additionalAreas.balcony", false);
    setValue("additionalAreas.cellar", false);
  }

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="text-2xl font-semibold">
        Um welche Wohnung geht es?
      </legend>

      <Input
        id="rooms"
        label="Anzahl Zimmer"
        type="number"
        min={1}
        max={20}
        errorMessage={errors.rooms?.message}
        {...register("rooms", { valueAsNumber: true })}
      />

      <Select
        id="approxSqmRange"
        label="Ungefähre Wohnfläche"
        placeholder="Bitte wählen"
        options={approxSqmRangeOptions}
        errorMessage={errors.approxSqmRange?.message}
        {...register("approxSqmRange")}
      />

      <Controller
        name="emptyState"
        control={control}
        render={({ field }) => (
          <RadioGroup
            legend="Ist die Wohnung bei der Reinigung leer?"
            name="emptyState"
            options={emptyStateOptions}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            errorMessage={errors.emptyState?.message}
          />
        )}
      />

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium">Zusätzliche Bereiche</legend>
        <div className="flex flex-col gap-2">
          {additionalAreaOptions.map((option) => (
            <Checkbox
              key={option.name}
              id={`additionalAreas.${option.name}`}
              label={option.label}
              {...register(`additionalAreas.${option.name}` as const)}
            />
          ))}
          <Checkbox
            id="additionalAreas-none"
            label="Keine"
            checked={noneSelected}
            onChange={selectNone}
          />
        </div>
      </fieldset>

      <Textarea
        id="notes"
        label="Bemerkungen oder besondere Wünsche (optional)"
        maxLength={1500}
        errorMessage={errors.notes?.message}
        {...register("notes")}
      />
    </fieldset>
  );
}

export const stepApartmentFields = [
  "rooms",
  "approxSqmRange",
  "emptyState",
  "additionalAreas",
  "notes",
] as const;
