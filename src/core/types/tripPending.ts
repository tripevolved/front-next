export type TripPendingActionType =
  | "viajantes"
  | "documentos"
  | "compartilhar"
  | "voo"
  | "assentos-voo"
  | "quarto"
  | "atracoes"
  | "pedido-especial"
  | "compra-bagagem"
  | "transfer"
  | "seguro"
  | "outro";

export interface TripPendingAction {
  id: string;
  slug: TripPendingActionType;
  isMandatory: boolean;
  title: string;
  description: string;
  deadline: string;
}
