import { TripDetails, TripPayerAddress } from "@/core/types";

export interface PaymentData {
  tripId: string;
  payer: {
    fullName: string;
    email: string;
    phone: string;
    cpf: string;
    document: string;
    motherName: string;
    gender: string;
    birthDate: string;
  };
  address: {
    postalCode: string;
    address: string;
    complement: string;
    number: string;
    neighborhood: string;
    city: string;
    stateProvince: string;
    country: string;
  };
  price: {
    price: number;
    serviceFee: number;
    amount: number;
    installmentOptions: { label: string; value: string }[];
  };
  trip: TripDetails;
}

export interface PaymentPayloadDataTraveler {
  fullName: string;
  rg: string;
  cpf: string;
  email: string;
  gender: string;
  birthDate: string;
}

export interface PaymentPayloadData {
  acceptTerms: boolean;
  payer: {
    birthDate: string;
    cpf: string;
    document: string;
    email: string;
    fullName: string;
    motherName: string;
    phone: string;
    gender: string;
  };
  address: TripPayerAddress;
  travelers: PaymentPayloadDataTraveler[];
  maxInstallments: string;
}

export type PaymentStepProps = {
  onNext: VoidFunction;
  payload: PaymentPayloadData;
  setPayload: (newPayload: Partial<PaymentPayloadData>) => void;
} & PaymentData;
