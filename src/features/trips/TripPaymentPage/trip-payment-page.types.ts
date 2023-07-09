import { ComponentHTMLProps } from "@/core/types";

export interface TripPaymentPageProps extends ComponentHTMLProps {
}

export interface TripPayer {
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  document: string;
  motherName: string | null;
  gender: string;
  birthDate: Date;
  address: TripPayerAddress;
}

export interface TripPayerAddress {
  postalCode: string;
  address: string;
  complement: string | null;
  number: string;
  neighborhood: string | null;
  city: string;
  stateProvince: string | null;
  country: string;
}