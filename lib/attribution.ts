const STORAGE_KEY = "cleyra-attribution-v1";

const URL_PARAM_MAP: Record<string, string> = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_term: "utmTerm",
  utm_content: "utmContent",
  gclid: "gclid",
  gbraid: "gbraid",
  wbraid: "wbraid",
};

export type Attribution = {
  landingPage: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
};

// Cattura l'attribution al primo touch della sessione e non la sovrascrive
// in seguito (spec sezione 19 "Persistenza attribution").
export function getOrCreateAttribution(): Attribution {
  if (typeof window === "undefined") {
    return { landingPage: "" };
  }

  const existing = window.sessionStorage.getItem(STORAGE_KEY);
  if (existing) {
    try {
      return JSON.parse(existing) as Attribution;
    } catch {
      // ignora e ricrea sotto
    }
  }

  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = {
    landingPage: window.location.pathname,
    referrer: document.referrer || undefined,
  };

  for (const [urlKey, field] of Object.entries(URL_PARAM_MAP)) {
    const value = params.get(urlKey);
    if (value) {
      (attribution as Record<string, string>)[field] = value;
    }
  }

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  return attribution;
}
