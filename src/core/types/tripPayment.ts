export type TripPaymentMethod = "PIX" | "CREDIT_CARD";

export type TrippaymentProvider = 'STRIPE' | 'VALEPAY';

export interface TripPayment {
  tripId: string;
  ipAddress: string;
  payer: TripPayer;
  amount: number;
  installments: number;
  method: TripPaymentMethod;
  creditCard: TripPaymentCreditCardInfo | null;
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
