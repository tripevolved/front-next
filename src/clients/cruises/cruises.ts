import { ApiRequest } from "@/clients/common/request";

export type CruiseType = 'relax' | 'destination' | 'expedition' | 'river';

export interface CruiseCardData {
  id: string;
  title: string;
  company: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  departureDate: string;
  arrivalDate: string;
  departurePort: string;
  arrivalPort: string;
  cabinType: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
}

interface CruisesResponse {
  cruises: CruiseCardData[];
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
