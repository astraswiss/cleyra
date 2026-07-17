export type LocationLanding = {
  slug: string;
  cityName: string;
  regionName: string;
  postalCodes: string[];
  nearbyPlaces: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
};

// TODO(LOCAL-002/003/004): arricchire con FAQ locale e link reciproci
// quando si implementa il contenuto completo delle landing (Fase 2).
export const locationLandings: LocationLanding[] = [
  {
    slug: "endreinigung-visp",
    cityName: "Visp",
    regionName: "Oberwallis",
    postalCodes: ["3930"],
    nearbyPlaces: ["Eyholz", "Baltschieder", "Lalden", "Eggerberg"],
    metaTitle: "Endreinigung Visp unverbindlich anfragen | Cleyra",
    metaDescription:
      "Endreinigung in Visp gesucht? Wohnung und Termin angeben und eine unverbindliche Offerte über einen regionalen Reinigungspartner anfragen.",
    h1: "Endreinigung in Visp einfach anfragen",
    intro:
      "Senden Sie uns einmal die wichtigsten Angaben. Cleyra prüft Ihre Anfrage und vermittelt sie an einen ausgewählten Reinigungspartner für Visp und Umgebung.",
  },
  {
    slug: "endreinigung-brig",
    cityName: "Brig-Glis",
    regionName: "Oberwallis",
    postalCodes: ["3900"],
    nearbyPlaces: ["Gamsen", "Ried-Brig", "Termen", "Lalden"],
    metaTitle: "Endreinigung Brig-Glis unverbindlich anfragen | Cleyra",
    metaDescription:
      "Endreinigung in Brig-Glis gesucht? Wohnung und Termin angeben und eine unverbindliche Offerte über einen regionalen Reinigungspartner anfragen.",
    h1: "Endreinigung in Brig-Glis einfach anfragen",
    intro:
      "Senden Sie uns einmal die wichtigsten Angaben. Cleyra prüft Ihre Anfrage und vermittelt sie an einen ausgewählten Reinigungspartner für Brig-Glis und Umgebung.",
  },
  {
    slug: "endreinigung-naters",
    cityName: "Naters",
    regionName: "Oberwallis",
    postalCodes: ["3904"],
    nearbyPlaces: ["Blatten bei Naters", "Birgisch", "Mund"],
    metaTitle: "Endreinigung Naters unverbindlich anfragen | Cleyra",
    metaDescription:
      "Endreinigung in Naters gesucht? Wohnung und Termin angeben und eine unverbindliche Offerte über einen regionalen Reinigungspartner anfragen.",
    h1: "Endreinigung in Naters einfach anfragen",
    intro:
      "Senden Sie uns einmal die wichtigsten Angaben. Cleyra prüft Ihre Anfrage und vermittelt sie an einen ausgewählten Reinigungspartner für Naters und Umgebung.",
  },
];
