import { ApiRequest } from "@/services/api/request";

export type CruiseType = 'relax' | 'destination' | 'expedition' | 'river';

export interface CruiseData {
  id: string;
  title: string;
  company: string;
  images: string[];
  price: CruisePrice;
  departureDate: Date;
  arrivalDate: Date;
  highlights: string[];
}

interface CruisePrice {
  amount: number;
  amountWithDiscount?: number;
  currency: string;
  cabinType: string;
}

interface CruisesResponse {
  cruises: CruiseData[];
  total: number;
  page: number;
  totalPages: number;
}

interface CruisesRequestParams {
  type: CruiseType;
  page?: number;
  limit?: number;
}

export const getCruisesByType = async ({
  type,
  page = 1,
  limit = 10,
}: CruisesRequestParams) => {
  const params = new URLSearchParams({
    type,
    page: String(page),
    limit: String(limit)
  });
  const route = `cruises/?${params.toString()}`;
  return ApiRequest.get<CruisesResponse>(route);
};
