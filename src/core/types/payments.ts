import type { ReactNode } from "react";

export interface PayerResponse
  extends Omit<TripPayer, "document" | "birthDate"> {
  document: string;
  /** ISO date string */
  birthDate: string;
}

export interface TripPayer {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  cpf: string;
  document: string | null;
  motherName: string | null;
  gender: string;
  birthDate: Date | null;
  address: TripPayerAddress;
}

export interface TripPayerAddress {
  postalCode: string;
  address: string;
  complement: string | null;
  number: string;
  neighborhood: string;
  city: string;
  stateProvince: string;
  country: string;
}

export type TripPaymentMethod = "PIX" | "CREDIT_CARD";

export type TripPaymentProvider = "STRIPE" | "VALEPAY";

export interface PaymentCondition {
  id: number;
  name: string;
  paymentMethod: TripPaymentMethod;
  maxInstallments: number;
  minimumParcel: number;
}

/** Line item types for `POST payments/intent`. */
export type PaymentIntentItemType =
  | "TRIP"
  | "SUBSCRIPTION_ESSENTIAL"
  | "SUBSCRIPTION_TOTAL";

export interface PaymentIntentItem {
  /** Checkout payment line item id (`GET payments/{paymentId}` → `items[].id`). */
  id: string;
  amount: number;
  type: PaymentIntentItemType;
}

export interface PaymentIntent {
  /** Checkout payment id (from `/app/checkout/[id]`). */
  paymentId?: string | null;
  payer: TripPayer;
  amount: number;
  installments: number;
  method: TripPaymentMethod;
  paymentConditionId?: number | null;
  items: PaymentIntentItem[];
  /** Optional metadata (e.g. reference). Do not send payment `type` here — use `items[].type`. */
  metadata?: Record<string, string>;
}

export interface PaymentIntentResponse {
  isSuccess: boolean;
  message?: string | null;
  transactionId: string;
  provider: TripPaymentProvider;
  paymentMethod: TripPaymentMethod;
  pixInfo: PixPaymentInfo | null;
}

export interface PaymentIntentStatusResponse {
  transactionId: string;
  isSuccessful: boolean;
}

export interface PixPaymentInfo {
  qrCode: string;
  amount: number;
  netAmount: number;
  expirationDate: Date;
}

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
  /** 1–12; used when paymentMethod is credit_card. Default 1. */
  installments?: number;
  acceptTerms?: boolean;
}

/**
 * Checkout items for `POST /payments` (creates a payment id used by `/app/checkout/[id]`).
 */
export type CheckoutPaymentItem =
  | {
      type: "ACCOMMODATION";
      /** Accommodation item id (string) */
      id: string;
    }
  | {
      type: "SUBSCRIPTION_ESSENTIAL";
      amount: number;
      amountInInstallments?: number;
    }
  | {
      type: "SUBSCRIPTION_TOTAL";
      amount: number;
      amountInInstallments?: number;
    };

export interface CreateCheckoutPaymentRequest {
  tripId?: string | null;
  items: CheckoutPaymentItem[];
}

export interface CreateCheckoutPaymentResponse {
  id: string;
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
  installments: 1,
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
  /** Total amount in whole BRL (e.g. from subscriptions API). Used for installments when credit_card. */
  totalAmount?: number;
  /** Line items sent to `payments/intent` (amount + type each). */
  paymentItems?: PaymentIntentItem[];
  /**
   * Optional: original checkout items (from `GET payments/{id}`) for display purposes.
   * Used to compute installment totals (e.g. subscriptions) without affecting the intent payload.
   */
  checkoutItems?: Array<{ amount: number; amountInInstallments?: number }>;
  /** Optional metadata for the intent (no payment line-item `type` here). */
  paymentMetadata?: Record<string, string>;
  /** Response from create payment intent; used for PIX (pixInfo) in StepPaymentFinish. */
  paymentIntentResponse?: PaymentIntentResponse | null;
  /** Optional payment condition id (required for ON_BOOKING finish). */
  paymentConditionId?: number | null;
  /**
   * Checkout payment id (`POST /payments` → `id`, same as `/app/checkout/[id]`).
   * Legacy: older PIX flows polled `GET payments/{checkoutPaymentId}`; current flow polls `GET payments/intent/{transactionId}`.
   */
  pixCheckoutPaymentId?: string | null;
  /**
   * Optional block shown after a successful payment (PIX polling approved or card finish success).
   * Keeps StepPaymentFinish generic; pass flow-specific CTAs from the checkout page.
   */
  paymentSuccessExtra?: ReactNode;
  /**
   * When set, shown as the main action after successful PIX/card payment (e.g. continue to booking).
   * If omitted, the default “Voltar ao painel / app” link is shown.
   */
  paymentSuccessPrimaryAction?: {
    label: string;
    onClick: () => void;
  };
}
