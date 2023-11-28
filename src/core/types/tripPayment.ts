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

export interface TripPayment {
  tripId: string;
  payer: TripPayer;
  amount: number;
  installments: number;
  method: TripPaymentMethod;
  shouldHavePaymentLink: boolean;
}

export interface TripPaymentIntent {
  tripId: string;
  payer: TripPayer;
  amount: number;
  installments: number;
  method: TripPaymentMethod;
  creditCard: TripPaymentCreditCardInfo | null;
  travelers: Traveler[];
}

export interface TripPaymentCreditCardInfo {
  number: string;
  expirationMonth: number;
  expirationYear: number;
  cvc: string;
}

export interface TripPayer {
  fullName: string;
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
