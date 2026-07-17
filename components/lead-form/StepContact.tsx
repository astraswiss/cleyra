import { Controller, useFormContext } from "react-hook-form";
import type { LeadFormValues } from "@/lib/lead-schema";
import { Input } from "@/components/ui/Input";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Checkbox } from "@/components/ui/Checkbox";

const preferredContactOptions = [
  { value: "phone", label: "Telefon" },
  { value: "email", label: "E-Mail" },
];

export function StepContact() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<LeadFormValues>();

  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="font-display text-2xl font-bold tracking-tight text-ink-900">
        Wie dürfen wir Sie kontaktieren?
      </legend>

      <Input
        id="fullName"
        label="Vor- und Nachname"
        autoComplete="name"
        errorMessage={errors.fullName?.message}
        {...register("fullName")}
      />

      <Input
        id="phone"
        label="Telefonnummer"
        type="tel"
        autoComplete="tel"
        errorMessage={errors.phone?.message}
        {...register("phone")}
      />

      <Input
        id="email"
        label="E-Mail-Adresse"
        type="email"
        autoComplete="email"
        errorMessage={errors.email?.message}
        {...register("email")}
      />

      <Controller
        name="preferredContact"
        control={control}
        render={({ field }) => (
          <RadioGroup
            legend="Bevorzugter Kontaktweg"
            name="preferredContact"
            options={preferredContactOptions}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            errorMessage={errors.preferredContact?.message}
          />
        )}
      />

      <Checkbox
        id="privacyConsent"
        label="Ich habe die Datenschutzerklärung gelesen und bin damit einverstanden, dass Cleyra meine Anfrage zur Bearbeitung und Angebotserstellung an einen ausgewählten Reinigungspartner übermittelt."
        errorMessage={errors.privacyConsent?.message}
        {...register("privacyConsent")}
      />

      <Checkbox
        id="marketingConsent"
        label="Ich möchte gelegentlich Informationen und Angebote von Cleyra erhalten. Diese Einwilligung kann ich jederzeit widerrufen."
        {...register("marketingConsent")}
      />

      <p className="text-sm text-ink-600">
        Die Anfrage ist kostenlos und unverbindlich. Ein Auftrag entsteht
        erst, wenn Sie eine Offerte des Reinigungspartners akzeptieren.
      </p>
    </fieldset>
  );
}

export const stepContactFields = [
  "fullName",
  "phone",
  "email",
  "preferredContact",
  "privacyConsent",
  "marketingConsent",
] as const;
