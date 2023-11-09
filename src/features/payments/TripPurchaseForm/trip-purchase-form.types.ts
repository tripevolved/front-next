interface FormAddressValues {
  address: string;
  city: string;
  complement: string;
  country: string;
  neighborhood: string;
  number: string;
  postalCode: string;
  stateProvince: string;
}

interface FormPersonalValues {
  birthDate: string;
  email: string;
  cpf: string;
  document: string;
  fullName: string;
  gender: string;
  motherName: string;
  phone: string;
}

interface FormPriceValues {
  installments: string;
  method: string;
}

export type FormValues = FormAddressValues & FormPersonalValues & FormPriceValues;
