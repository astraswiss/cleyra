import { Controller, useFormContext } from "react-hook-form";
import type { LeadFormValues } from "@/lib/lead-schema";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { RadioGroup } from "@/components/ui/RadioGroup";

const serviceTypeOptions = [
  { value: "end_cleaning", label: "Endreinigung" },
  { value: "moving_cleaning", label: "Umzugsreinigung" },
  { value: "other", label: "Andere Reinigung" },
];

const dateOptionOptions = [
  { value: "exact", label: "Genaues Datum" },
  { value: "flexible", label: "Ich bin flexibel" },
];

export function StepLocationService() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<LeadFormValues>();

  const dateOption = watch("dateOption");

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

      <Controller
        name="dateOption"
        control={control}
        render={({ field }) => (
          <RadioGroup
            legend="Gewünschtes Datum"
            name="dateOption"
            options={dateOptionOptions}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />

      {dateOption === "exact" ? (
        <Input
          id="desiredDate"
          label="Datum"
          type="date"
          errorMessage={errors.desiredDate?.message}
          {...register("desiredDate")}
        />
      ) : null}
    </fieldset>
  );
}

export const stepLocationServiceFields = [
  "postalCode",
  "city",
  "serviceType",
  "dateOption",
  "desiredDate",
] as const;
