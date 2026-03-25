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
  subscription: Subscription | null;
  availableFeatures: ProductFeature[];
}

export interface Subscription {
  id: string;
  name: string;
  dateFrom: Date;
  dateTo: Date;
  status: "Active" | "Inactive";
  /** When true, the subscriber has at least one linked traveler; used to load and show the travelers list. */
  hasTravelers: boolean;
}

type ProductFeature =
  | "ITINERARY"
  | "PURCHASE"
  | "STAY_EDIT"
  | "SCRIPT"
  | "RESTAURANTS"
  | "FLIGHT_EDIT"
  | "ITINERARY_EDIT"
  | "NOTIFICATIONS";
