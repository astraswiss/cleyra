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
  localFaq: {
    question: string;
    answer: string;
  };
};

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
    localFaq: {
      question: "Deckt Cleyra auch die Gemeinden rund um Visp ab?",
      answer:
        "Anfragen aus Visp und den umliegenden Gemeinden wie Eyholz, Baltschieder, Lalden und Eggerberg werden geprüft und, wenn ein Reinigungspartner die Region und den Termin abdecken kann, entsprechend vermittelt.",
    },
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
    localFaq: {
      question: "Werden auch Gamsen, Ried-Brig und Termen abgedeckt?",
      answer:
        "Anfragen aus Brig-Glis und den umliegenden Gemeinden wie Gamsen, Ried-Brig, Termen und Lalden werden geprüft und, wenn ein Reinigungspartner die Region und den Termin abdecken kann, entsprechend vermittelt.",
    },
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
    localFaq: {
      question: "Ist eine Anfrage auch aus Birgisch oder Mund möglich?",
      answer:
        "Anfragen aus Naters und den umliegenden Gemeinden wie Blatten bei Naters, Birgisch und Mund werden geprüft und, wenn ein Reinigungspartner die Region und den Termin abdecken kann, entsprechend vermittelt.",
    },
  },
];

export function getOtherLocationLandings(slug: string): LocationLanding[] {
  return locationLandings.filter((location) => location.slug !== slug);
}
