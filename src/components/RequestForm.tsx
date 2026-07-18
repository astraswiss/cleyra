"use client";

import { useEffect, useId, useState } from "react";
import {
  dateModeValues,
  desiredPeriodValues,
  propertyEmptyValues,
  roomsValues,
  serviceTypeValues,
  validateRequestStep1,
  type RequestStep1Input,
} from "@/lib/validation/requestStep1";

const FORM_VERSION = "1";

type HiddenFields = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  gclid: string;
  sourceUrl: string;
  referrer: string;
  timestamp: string;
  formVersion: string;
  language: string;
};

const initialStep1: RequestStep1Input = {
  postalCode: "",
  city: "",
  serviceType: "",
  dateMode: "",
  desiredDate: "",
  desiredPeriod: "",
  rooms: "",
  propertyEmpty: "",
  notes: "",
};

export function RequestForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<RequestStep1Input>(initialStep1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hidden, setHidden] = useState<HiddenFields | null>(null);

  const todayIso = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // window/document are only available client-side; can't read them during SSR render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHidden({
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      utmContent: params.get("utm_content") ?? "",
      utmTerm: params.get("utm_term") ?? "",
      gclid: params.get("gclid") ?? "",
      sourceUrl: window.location.href,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      formVersion: FORM_VERSION,
      language: "de",
    });
  }, []);

  const setField = (field: keyof RequestStep1Input, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmitStep1 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateRequestStep1(values);
    if (!result.success) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const ids = {
    postalCode: useId(),
    city: useId(),
    serviceType: useId(),
    dateMode: useId(),
    desiredDate: useId(),
    desiredPeriod: useId(),
    rooms: useId(),
    propertyEmpty: useId(),
    notes: useId(),
  };

  if (step === 2) {
    return (
      <div>
        <p className="text-sm font-semibold text-brand">Schritt 2 von 2</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Wie dürfen wir Sie kontaktieren?
        </h2>
        <p className="mt-4 text-zinc-600">
          Dieser Schritt ist noch in Aufbau. Ihre Angaben aus Schritt 1 bleiben
          erhalten.
        </p>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="mt-6 text-sm font-medium text-brand hover:underline"
        >
          Zurück zu Schritt 1
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm font-semibold text-brand">Schritt 1 von 2</p>
      <p className="text-sm text-zinc-500">Dauert etwa 1 Minute</p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
        Wo und wann soll gereinigt werden?
      </h2>

      <form className="mt-6 space-y-6" onSubmit={handleSubmitStep1} noValidate>
        <input type="hidden" name="honeypot" tabIndex={-1} autoComplete="off" />
        <input type="hidden" name="utmSource" value={hidden?.utmSource ?? ""} readOnly />
        <input type="hidden" name="utmMedium" value={hidden?.utmMedium ?? ""} readOnly />
        <input
          type="hidden"
          name="utmCampaign"
          value={hidden?.utmCampaign ?? ""}
          readOnly
        />
        <input
          type="hidden"
          name="utmContent"
          value={hidden?.utmContent ?? ""}
          readOnly
        />
        <input type="hidden" name="utmTerm" value={hidden?.utmTerm ?? ""} readOnly />
        <input type="hidden" name="gclid" value={hidden?.gclid ?? ""} readOnly />
        <input type="hidden" name="sourceUrl" value={hidden?.sourceUrl ?? ""} readOnly />
        <input type="hidden" name="referrer" value={hidden?.referrer ?? ""} readOnly />
        <input type="hidden" name="timestamp" value={hidden?.timestamp ?? ""} readOnly />
        <input
          type="hidden"
          name="formVersion"
          value={hidden?.formVersion ?? FORM_VERSION}
          readOnly
        />
        <input type="hidden" name="language" value={hidden?.language ?? "de"} readOnly />

        <div>
          <label htmlFor={ids.postalCode} className="block font-medium">
            Postleitzahl
          </label>
          <input
            id={ids.postalCode}
            name="postalCode"
            type="text"
            inputMode="numeric"
            placeholder="3930"
            value={values.postalCode}
            onChange={(e) => setField("postalCode", e.target.value)}
            aria-invalid={Boolean(errors.postalCode)}
            aria-describedby={errors.postalCode ? `${ids.postalCode}-error` : undefined}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
          {errors.postalCode && (
            <p id={`${ids.postalCode}-error`} className="mt-1 text-sm text-error">
              {errors.postalCode}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={ids.city} className="block font-medium">
            Ort
          </label>
          <input
            id={ids.city}
            name="city"
            type="text"
            placeholder="Visp"
            value={values.city}
            onChange={(e) => setField("city", e.target.value)}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? `${ids.city}-error` : undefined}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
          {errors.city && (
            <p id={`${ids.city}-error`} className="mt-1 text-sm text-error">
              {errors.city}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={ids.serviceType} className="block font-medium">
            Welche Reinigung benötigen Sie?
          </label>
          <select
            id={ids.serviceType}
            name="serviceType"
            value={values.serviceType}
            onChange={(e) => setField("serviceType", e.target.value)}
            aria-invalid={Boolean(errors.serviceType)}
            aria-describedby={
              errors.serviceType ? `${ids.serviceType}-error` : undefined
            }
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="">Bitte wählen</option>
            {serviceTypeValues.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.serviceType && (
            <p id={`${ids.serviceType}-error`} className="mt-1 text-sm text-error">
              {errors.serviceType}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="font-medium">Wann soll gereinigt werden?</legend>
          <div className="mt-2 space-y-2">
            {dateModeValues.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="dateMode"
                  value={option}
                  checked={values.dateMode === option}
                  onChange={(e) => setField("dateMode", e.target.value)}
                  className="accent-brand"
                />
                {option}
              </label>
            ))}
          </div>
          {errors.dateMode && (
            <p className="mt-1 text-sm text-error">{errors.dateMode}</p>
          )}
        </fieldset>

        {values.dateMode === "Ich kenne das genaue Datum" && (
          <div>
            <label htmlFor={ids.desiredDate} className="block font-medium">
              Gewünschtes Datum
            </label>
            <input
              id={ids.desiredDate}
              name="desiredDate"
              type="date"
              min={todayIso}
              value={values.desiredDate}
              onChange={(e) => setField("desiredDate", e.target.value)}
              aria-invalid={Boolean(errors.desiredDate)}
              aria-describedby={
                errors.desiredDate ? `${ids.desiredDate}-error` : undefined
              }
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
            {errors.desiredDate && (
              <p id={`${ids.desiredDate}-error`} className="mt-1 text-sm text-error">
                {errors.desiredDate}
              </p>
            )}
          </div>
        )}

        {values.dateMode === "Ich bin flexibel" && (
          <div>
            <label htmlFor={ids.desiredPeriod} className="block font-medium">
              Zeitraum
            </label>
            <select
              id={ids.desiredPeriod}
              name="desiredPeriod"
              value={values.desiredPeriod}
              onChange={(e) => setField("desiredPeriod", e.target.value)}
              aria-invalid={Boolean(errors.desiredPeriod)}
              aria-describedby={
                errors.desiredPeriod ? `${ids.desiredPeriod}-error` : undefined
              }
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              <option value="">Bitte wählen</option>
              {desiredPeriodValues.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.desiredPeriod && (
              <p
                id={`${ids.desiredPeriod}-error`}
                className="mt-1 text-sm text-error"
              >
                {errors.desiredPeriod}
              </p>
            )}
          </div>
        )}

        <div>
          <label htmlFor={ids.rooms} className="block font-medium">
            Wie viele Zimmer hat die Wohnung?
          </label>
          <select
            id={ids.rooms}
            name="rooms"
            value={values.rooms}
            onChange={(e) => setField("rooms", e.target.value)}
            aria-invalid={Boolean(errors.rooms)}
            aria-describedby={errors.rooms ? `${ids.rooms}-error` : undefined}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="">Bitte wählen</option>
            {roomsValues.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.rooms && (
            <p id={`${ids.rooms}-error`} className="mt-1 text-sm text-error">
              {errors.rooms}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="font-medium">
            Ist die Wohnung bei der Reinigung leer?
          </legend>
          <div className="mt-2 space-y-2">
            {propertyEmptyValues.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="propertyEmpty"
                  value={option}
                  checked={values.propertyEmpty === option}
                  onChange={(e) => setField("propertyEmpty", e.target.value)}
                  className="accent-brand"
                />
                {option}
              </label>
            ))}
          </div>
          {errors.propertyEmpty && (
            <p className="mt-1 text-sm text-error">{errors.propertyEmpty}</p>
          )}
        </fieldset>

        <div>
          <label htmlFor={ids.notes} className="block font-medium">
            Bemerkungen oder besondere Wünsche
          </label>
          <p className="mt-1 text-sm text-zinc-500">
            Zum Beispiel Fenster, Balkon, Keller oder ein besonderer Termin.
          </p>
          <textarea
            id={ids.notes}
            name="notes"
            rows={3}
            maxLength={1000}
            value={values.notes}
            onChange={(e) => setField("notes", e.target.value)}
            className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 font-medium text-white transition-colors hover:bg-brand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Weiter zu den Kontaktdaten
        </button>
      </form>
    </div>
  );
}
