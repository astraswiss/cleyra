import { useFormContext } from "react-hook-form";
import type { LeadFormValues } from "@/lib/lead-schema";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";

const propertyTypeOptions = [
  { value: "apartment", label: "Wohnung" },
  { value: "house", label: "Haus" },
];

const furnishedStateOptions = [
  { value: "empty", label: "Leer" },
  { value: "furnished", label: "Möbliert" },
  { value: "partially_furnished", label: "Teilweise möbliert" },
];

export function StepProperty() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LeadFormValues>();

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="text-2xl font-semibold">
        Um welche Wohnung geht es?
      </legend>

      <Select
        id="propertyType"
        label="Art der Immobilie"
        placeholder="Bitte wählen"
        options={propertyTypeOptions}
        errorMessage={errors.propertyType?.message}
        {...register("propertyType")}
      />

      <Input
        id="rooms"
        label="Anzahl Zimmer"
        type="number"
        min={1}
        max={20}
        errorMessage={errors.rooms?.message}
        {...register("rooms", { valueAsNumber: true })}
      />

      <Input
        id="approxSqm"
        label="Fläche (ca. m²)"
        type="number"
        min={10}
        max={2000}
        errorMessage={errors.approxSqm?.message}
        {...register("approxSqm", { valueAsNumber: true })}
      />

      <Select
        id="furnishedState"
        label="Möblierungszustand"
        placeholder="Bitte wählen"
        options={furnishedStateOptions}
        errorMessage={errors.furnishedState?.message}
        {...register("furnishedState")}
      />

      <Input
        id="floor"
        label="Stockwerk (optional)"
        errorMessage={errors.floor?.message}
        {...register("floor")}
      />

      <Checkbox
        id="elevator"
        label="Lift vorhanden"
        errorMessage={errors.elevator?.message}
        {...register("elevator")}
      />
    </fieldset>
  );
}

export const stepPropertyFields = [
  "propertyType",
  "rooms",
  "approxSqm",
  "furnishedState",
  "floor",
  "elevator",
] as const;
