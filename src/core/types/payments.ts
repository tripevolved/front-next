// Checkout pagamento flow (multi-step) — shared by Círculo Evolved and other product checkouts

import type { TripPayerAddress } from "./tripPayment";

export interface CheckoutPayerData {
  name: string;
  lastName: string;
  email: string;
  /** E.164 country code (e.g. +55). Used with PhoneInput. */
  phoneCountryCode?: string;
  /** Phone digits only (no country code). */
  phone: string;
  cpf: string;
  document: string;
  motherName: string;
  gender: string;
  /** DD/MM/YYYY for form input */
  birthDate: string;
  address: TripPayerAddress;
}

export type CheckoutPaymentMethod = "credit_card" | "pix";

export interface CheckoutSessionPayload {
  payer: CheckoutPayerData;
  paymentMethod: CheckoutPaymentMethod | null;
  acceptTerms?: boolean;
}

export const STEP_NAMES = ["Dados do pagador", "Forma de pagamento", "Finalizar"] as const;
export type StepName = (typeof STEP_NAMES)[number];

const DEFAULT_ADDRESS: TripPayerAddress = {
  postalCode: "",
  address: "",
  complement: null,
  number: "",
  neighborhood: "",
  city: "",
  stateProvince: "",
  country: "Brasil",
};

export const DEFAULT_CHECKOUT_PAYLOAD: CheckoutSessionPayload = {
  payer: {
    name: "",
    lastName: "",
    email: "",
    phoneCountryCode: "+55",
    phone: "",
    cpf: "",
    document: "",
    motherName: "",
    gender: "",
    birthDate: "",
    address: DEFAULT_ADDRESS,
  },
  paymentMethod: null,
  acceptTerms: false,
};

export interface PagamentoStepProps {
  payload: CheckoutSessionPayload;
  setPayload: (update: Partial<CheckoutSessionPayload>) => void;
  onNext: () => void;
  onBack?: () => void;
  isSaving?: boolean;
  sessionId: string | null;
  /** True while loading payer from GET /payments/{travelerId}/payer */
  isLoadingPayer?: boolean;
  /** Email from traveler state (pre-populated top section); must match payer.email */
  travelerEmail?: string;
}
