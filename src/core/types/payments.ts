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

export interface PaymentIntent {
  payer: TripPayer;
  amount: number;
  installments: number;
  method: TripPaymentMethod;
  metadata: Record<string, string>;
}

export interface PaymentIntentResponse {
  isSuccess: boolean;
  message?: string | null;
  transactionId: string;
  provider: TripPaymentProvider;
  paymentMethod: TripPaymentMethod;
  pixInfo: PixPaymentInfo | null;
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
  /** Total amount in reais (e.g. 6700 for R$ 6.700,00). Used for installments when credit_card. */
  totalAmount?: number;
  /** Reference for the payment intent (e.g. "Círculo Evolved"). Sent in metadata. */
  paymentReference?: string;
  /** Type of the payment intent (e.g. "subscription"). Sent in metadata. */
  paymentType?: string;
  /** Response from create payment intent; used for PIX (pixInfo) in StepPaymentFinish. */
  paymentIntentResponse?: PaymentIntentResponse | null;
}
