import type { ComponentHTMLProps } from "@/core/types";

export type TravelerProfileType =
  | "relax"
  | "aventureiro"
  | "intelectual"
  | "alternativo"
  | "gastronomico"
  | "turista-voraz"
  | "colecionador-de-pulseirinha"
  | "so-se-vive-uma-vez"
  | "agitador"
  | "negocios"
  | "espiritual"
  | "zona-de-conforto"
  | "dinamico"
  | "espiritual"
  | "fa-da-rotina"
  | "garantido"
  | "inicio"
  | "insaciavel"
  | "automatico";

export interface HasProfileProps extends ComponentHTMLProps {
  profileType: TravelerProfileType;
}
