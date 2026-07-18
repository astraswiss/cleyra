import { useFormContext } from "react-hook-form";
import type { LeadFormValues } from "@/lib/lead-schema";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const serviceTypeOptions = [
  { value: "end_cleaning", label: "Endreinigung zur Wohnungsabgabe" },
  { value: "moving_cleaning", label: "Umzugsreinigung" },
  { value: "other", label: "Andere Reinigung" },
];

export function StepLocationService() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LeadFormValues>();

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="text-2xl font-semibold">
        Wo soll gereinigt werden?
      </legend>

      <Input
        id="postalCode"
        label="Postleitzahl"
        inputMode="numeric"
        errorMessage={errors.postalCode?.message}
        {...register("postalCode")}
      />

      <Input
        id="city"
        label="Ort"
        errorMessage={errors.city?.message}
        {...register("city")}
      />

      <Select
        id="serviceType"
        label="Art der Reinigung"
        placeholder="Bitte wählen"
        options={serviceTypeOptions}
        errorMessage={errors.serviceType?.message}
        {...register("serviceType")}
      />

      <Input
        id="desiredDate"
        label="Gewünschter Termin"
        type="date"
        errorMessage={errors.desiredDate?.message}
        {...register("desiredDate")}
      />
    </fieldset>
  );
}

export const stepLocationServiceFields = [
  "postalCode",
  "city",
  "serviceType",
  "desiredDate",
] as const;
