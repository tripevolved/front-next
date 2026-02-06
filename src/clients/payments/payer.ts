import type { PayerResponse, TripPayer, TripPayerAddress } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getPayerById = async (
  travelerId: string
): Promise<PayerResponse | null> => {
  const route = `payments/${travelerId}/payer`;
  try {
    const data = await ApiRequest.get<PayerResponse | null>(route);
    return data ?? null;
  } catch {
    return null;
  }
};

/** Request body to create a payer (TripPayer shape); birthDate as ISO string in JSON; phone as +{countryCode}{digits} */
export interface CreatePayerRequest {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  cpf: string;
  document: string | null;
  motherName: string | null;
  gender: string;
  birthDate: string;
  address: TripPayerAddress;
}

/** API returns TripPayer; birthDate is ISO string in JSON */
export interface CreatePayerResponse extends Omit<TripPayer, "birthDate"> {
  birthDate: string | null;
}

export const createPayer = async (
  travelerId: string,
  body: CreatePayerRequest
): Promise<CreatePayerResponse> => {
  const route = `payments/${travelerId}/payer`;
  const data = await ApiRequest.post<CreatePayerResponse>(route, body);
  return data;
};
