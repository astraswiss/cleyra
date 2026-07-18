"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  leadFormSchema,
  type LeadFormValues,
} from "@/lib/lead-schema";
import { getOrCreateAttribution } from "@/lib/attribution";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Alert } from "@/components/ui/Alert";
import { StepLocationService, stepLocationServiceFields } from "@/components/lead-form/StepLocationService";
import { StepApartment, stepApartmentFields } from "@/components/lead-form/StepApartment";
import { StepContact, stepContactFields } from "@/components/lead-form/StepContact";
import { FormNavigation } from "@/components/lead-form/FormNavigation";
import { FormErrorSummary } from "@/components/lead-form/FormErrorSummary";

const SESSION_STORAGE_KEY = "cleyra-lead-form-v1";
const TOTAL_STEPS = 3;

const STEP_FIELDS: Record<number, FieldPath<LeadFormValues>[]> = {
  1: [...stepLocationServiceFields],
  2: [...stepApartmentFields],
  3: [...stepContactFields],
};

const STEP_NEXT_LABELS: Record<number, string> = {
  1: "Weiter zur Wohnung",
  2: "Weiter zu Ihren Kontaktdaten",
};

const FIELD_LABELS: Partial<Record<string, string>> = {
  postalCode: "Postleitzahl",
  city: "Ort",
  serviceType: "Art der Reinigung",
  dateOption: "Gewünschtes Datum",
  desiredDate: "Datum",
  rooms: "Anzahl Zimmer",
  approxSqmRange: "Ungefähre Wohnfläche",
  emptyState: "Wohnung leer",
  notes: "Bemerkungen",
  fullName: "Vorname und Nachname",
  phone: "Telefonnummer",
  email: "E-Mail-Adresse",
  preferredContact: "Bevorzugter Kontaktweg",
  privacyConsent: "Datenschutz-Einwilligung",
};

const defaultValues: LeadFormValues = {
  postalCode: "",
  city: "",
  serviceType: "end_cleaning",
  dateOption: "exact",
  desiredDate: "",
  rooms: 1,
  approxSqmRange: "under_50",
  emptyState: "empty",
  additionalAreas: {
    windows: false,
    balcony: false,
    cellar: false,
  },
  notes: "",
  fullName: "",
  phone: "",
  email: "",
  preferredContact: "email",
  privacyConsent: false,
};

type LeadFormProps = {
  // Precompila luogo/CAP quando la provenienza è chiara (landing locale),
  // spec sezione 9 "modulo con città precompilata".
  initialValues?: Partial<Pick<LeadFormValues, "postalCode" | "city">>;
};

export function LeadForm({ initialValues }: LeadFormProps = {}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submissionLockRef = useRef(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const methods = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { ...defaultValues, ...initialValues },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    reset,
  } = methods;

  // Ripristino stato dalla sessione del browser (navigazione avanti/indietro
  // senza perdita dati, spec 10.1).
  useEffect(() => {
    const saved = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!saved) return;
    try {
      reset(JSON.parse(saved));
    } catch {
      // ignora stato corrotto
    }
  }, [reset]);

  useEffect(() => {
    const subscription = methods.watch((values) => {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  async function goNext() {
    const fields = STEP_FIELDS[step] ?? [];
    const isValid = await trigger(fields);
    if (!isValid) {
      const firstErrorField = fields.find((field) => {
        const parts = field.split(".");
        // supporta errori annidati come "additionalAreas.windows"
        return parts.reduce<unknown>(
          (acc, part) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[part] : undefined),
          errors
        );
      });
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }
    setStep((current) => Math.min(current + 1, TOTAL_STEPS));
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 1));
  }

  async function onSubmit(values: LeadFormValues) {
    if (submissionLockRef.current) return;
    if (honeypotRef.current?.value) {
      // Bot rilevato (campo honeypot compilato): abortire silenziosamente.
      return;
    }
    submissionLockRef.current = true;
    setSubmitError(null);

    try {
      const attribution = getOrCreateAttribution();
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          language: "de",
          ...attribution,
          // Verifica honeypot anche lato server (difesa in profondità).
          company: honeypotRef.current?.value ?? "",
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
        router.push(data.redirectUrl ?? "/de/danke");
        return;
      }

      if (response.status === 400 && data?.fieldErrors) {
        for (const [field, message] of Object.entries(data.fieldErrors)) {
          methods.setError(field as FieldPath<LeadFormValues>, {
            type: "server",
            message: String(message),
          });
        }
        setSubmitError(
          "Bitte korrigieren Sie die markierten Angaben und senden Sie die Anfrage erneut."
        );
        return;
      }

      setSubmitError(
        "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch."
      );
    } catch {
      setSubmitError(
        "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch."
      );
    } finally {
      submissionLockRef.current = false;
    }
  }

  const currentStepErrors = Object.entries(errors)
    .filter(([name]) => (STEP_FIELDS[step] ?? []).some((field) => field === name))
    .map(([name, error]) => ({
      name,
      label: FIELD_LABELS[name] ?? name,
      message: (error as { message?: string })?.message ?? "Ungültige Angabe.",
    }));

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={
          step === TOTAL_STEPS
            ? handleSubmit(onSubmit)
            : (event) => {
                event.preventDefault();
                void goNext();
              }
        }
        noValidate
      >
        <ProgressBar step={step} totalSteps={TOTAL_STEPS} />

        <FormErrorSummary errors={currentStepErrors} />

        {/* Honeypot: invisibile a utenti e screen reader (spec sezione 13). */}
        <input
          ref={honeypotRef}
          type="text"
          name="company"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        {step === 1 ? <StepLocationService /> : null}
        {step === 2 ? <StepApartment /> : null}
        {step === 3 ? <StepContact /> : null}

        {submitError ? (
          <div className="mt-4">
            <Alert variant="error">{submitError}</Alert>
          </div>
        ) : null}

        <FormNavigation
          step={step}
          totalSteps={TOTAL_STEPS}
          isSubmitting={isSubmitting}
          onBack={goBack}
          nextLabel={STEP_NEXT_LABELS[step] ?? "Weiter"}
        />

        <p className="mt-4 text-sm text-slate-600">
          {step === TOTAL_STEPS
            ? "Kostenlos und unverbindlich. Ein Auftrag entsteht erst nach Ihrer Zustimmung zur Offerte."
            : "Dauert etwa 90 Sekunden. Kein Benutzerkonto erforderlich."}
        </p>
      </form>
    </FormProvider>
  );
}
