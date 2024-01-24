export type TravelerProfileType =
  | "relax"
  | "aventureiro"
  | "intelectual"
  | "alternativo"
  | "gastronomico"
  | "colecionador-de-pulseirinha"
  | "so-se-vive-uma-vez"
  | "agitador"
  | "negocios"
  | "espiritual"
  | "dinamico"
  | "fa-da-rotina"
  | "garantido"
  | "insaciavel"
  | "automatico"
  | "musicalidade";

export interface TravelerState {
  id: string;
  travelerProfile: TravelerProfileType | null;
  name: string;
  email: string;
  hasCurrentTrip: boolean;
  hasPastTrip: boolean;
  isActive: boolean;
  hasValidAddress: boolean;
  availableFeatures: ProductFeature[];
}

type ProductFeature = "ITINERARY" | "PURCHASE" | "STAY_EDIT" | "SCRIPT" | "RESTAURANTS" | "FLIGHT_EDIT" | "ITINERARY_EDIT";
