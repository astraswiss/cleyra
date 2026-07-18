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
import { StepProperty, stepPropertyFields } from "@/components/lead-form/StepProperty";
import { StepExtras, stepExtrasFields } from "@/components/lead-form/StepExtras";
import { StepContact, stepContactFields } from "@/components/lead-form/StepContact";
import { FormNavigation } from "@/components/lead-form/FormNavigation";
import { FormErrorSummary } from "@/components/lead-form/FormErrorSummary";

const SESSION_STORAGE_KEY = "cleyra-lead-form-v1";
const TOTAL_STEPS = 4;

const STEP_FIELDS: Record<number, FieldPath<LeadFormValues>[]> = {
  1: [...stepLocationServiceFields],
  2: [...stepPropertyFields],
  3: [...stepExtrasFields],
  4: [...stepContactFields],
};

const STEP_NEXT_LABELS: Record<number, string> = {
  1: "Weiter zur Wohnung",
  2: "Weiter zu den Details",
  3: "Weiter zu Ihren Kontaktdaten",
};

const FIELD_LABELS: Partial<Record<string, string>> = {
  postalCode: "Postleitzahl",
  city: "Ort",
  serviceType: "Art der Reinigung",
  desiredDate: "Gewünschter Termin",
  dateFlexibility: "Terminflexibilität",
  propertyType: "Art der Immobilie",
  rooms: "Anzahl Zimmer",
  approxSqm: "Fläche",
  furnishedState: "Möblierungszustand",
  floor: "Stockwerk",
  notes: "Anmerkungen",
  fullName: "Vor- und Nachname",
  phone: "Telefonnummer",
  email: "E-Mail-Adresse",
  preferredContact: "Bevorzugter Kontaktweg",
  privacyConsent: "Datenschutz-Einwilligung",
};

const defaultValues: LeadFormValues = {
  postalCode: "",
  city: "",
  serviceType: "end_cleaning",
  desiredDate: "",
  dateFlexibility: undefined,
  propertyType: "apartment",
  rooms: 1,
  approxSqm: 10,
  furnishedState: "empty",
  floor: "",
  elevator: false,
  extras: {
    windows: false,
    balconyTerrace: false,
    cellar: false,
    oven: false,
    fridge: false,
    blindsShutters: false,
    garage: false,
    otherAreas: false,
  },
  notes: "",
  fullName: "",
  phone: "",
  email: "",
  preferredContact: "email",
  privacyConsent: false,
  marketingConsent: false,
};

export function LeadForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submissionLockRef = useRef(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const methods = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues,
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
        // supporta errori annidati come "extras.windows"
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
          // TODO(FORM-005/API-003): inviare i file reali quando lo storage
          // privato sarà collegato; per ora solo il conteggio è indicativo.
          photoCount: photos.length,
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
        {step === 2 ? <StepProperty /> : null}
        {step === 3 ? (
          <StepExtras photos={photos} onPhotosChange={setPhotos} />
        ) : null}
        {step === 4 ? <StepContact /> : null}

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
            ? "Die Anfrage ist kostenlos und unverbindlich. Ein Auftrag entsteht erst, wenn Sie eine Offerte des Reinigungspartners akzeptieren."
            : "Dauert etwa 2 Minuten. Kein Benutzerkonto erforderlich."}
        </p>
      </form>
    </FormProvider>
  );
}
