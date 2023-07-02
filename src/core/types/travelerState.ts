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
  | "espiritual"
  | "fa-da-rotina"
  | "garantido"
  | "insaciavel"
  | "automatico";

export interface TravelerState {
  id: string;
  travelerProfile: TravelerProfileType | null;
  name: string;
  hasCurrentTrip: boolean;
  hasPastTrip: boolean;
  isActive: boolean;
  hasValidAddress: boolean;
}
