import type { ComponentHTMLProps } from "@/core/types";

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

export interface HasProfileProps extends ComponentHTMLProps {
  profileType: TravelerProfileType;
}
