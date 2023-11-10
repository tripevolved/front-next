import type { TripPayer } from "@/core/types";

export const MIN_PAYMENT = 100;
export const MAX_INSTALLMENTS = 6;

export const PIX_PAYMENT_OPTION = { label: "Pix", value: "PIX" };
export const CREDIT_CARD_PAYMENT_OPTION = { label: "Cartão de crédito", value: "CREDIT_CARD" };
export const PAYMENT_OPTIONS = [PIX_PAYMENT_OPTION, CREDIT_CARD_PAYMENT_OPTION];

export const GENDER_OPTIONS = [
  { label: "Feminino", value: "female" },
  { label: "Masculino", value: "male" },
];

export const EMPTY_DATA_PAYER: Omit<TripPayer, "birthDate"> & { birthDate: string } = {
  fullName: "",
  email: "",
  phone: "",
  cpf: "",
  document: "",
  motherName: "",
  gender: "",
  birthDate: "",
  address: {
    postalCode: "",
    address: "",
    complement: "",
    number: "",
    neighborhood: "",
    city: "",
    stateProvince: "",
    country: "Brasil",
  },
};
