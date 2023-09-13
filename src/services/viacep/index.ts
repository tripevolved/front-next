import axios from 'axios';

const VIACEP_URL = 'https://viacep.com.br/ws';

export interface ViaCepDTO {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

const getAddressByPostalCode = async (postalCode: string | number): Promise<ViaCepDTO | null> => {
  try {
    const url = `${VIACEP_URL}/${postalCode}/json/`;
    const { data } = await axios.get<ViaCepDTO>(url);
    return data
  } catch (error) {
    return null;
  }
}

export const ViaCepService = { getAddress: getAddressByPostalCode }
