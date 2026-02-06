import { Traveler } from "./traveler";

export type TripPaymentMethod = "PIX" | "CREDIT_CARD";

export type TripPaymentProvider = "STRIPE" | "VALEPAY";

export type TripPaymentStatus =
  | "NOT_STARTED"
  | "STARTED"
  | "SUCCESSFUL"
  | "CANCELED"
  | "REFUSED"
  | undefined;

export interface TripPaymentIntent {
  tripId: string;
  payer: TripPayer;
  amount: number;
  installments: number;
  method: TripPaymentMethod;
  shouldHavePaymentLink: boolean;
  creditCard: TripPaymentCreditCardInfo | null;
}

export interface TripPaymentIntentAll {
  tripId: string;
  payer: TripPayer;
  amount: number;
  installments: number;
  method: TripPaymentMethod;
  creditCard: TripPaymentCreditCardInfo | null;
  travelers: Traveler[];
}

export interface TripPaymentCreditCardInfo {
  cardholder: string;
  cardNumber: string;
  expirationMonth: number;
  expirationYear: number;
  securityCode: string;
  cpf: string;
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

/** Response from GET /payments/{travelerId}/payer — document and birthDate required (string) */
export interface PayerResponse
  extends Omit<TripPayer, "document" | "birthDate"> {
  document: string;
  /** ISO date string */
  birthDate: string;
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
