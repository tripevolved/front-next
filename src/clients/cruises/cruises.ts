import { ApiRequest } from "@/services/api/request";

export type CruiseType = 'relax' | 'destination' | 'expedition' | 'river';

export interface CruiseData {
  uniqueName: string;
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

export interface CruiseDetails extends CruiseData {
  description?: string;
  itinerary?: CruiseItineraryItem[];
  cabins?: CruiseCabin[];
  gastronomy?: CruiseGastronomy[];
  expertQuote?: {
    text: string;
    author: string;
    authorImage?: string;
  };
}

export interface CruiseItineraryItem {
  day: number;
  date: string;
  port: string;
  time?: string;
  description?: string;
  image?: string;
  type?: 'embark' | 'port' | 'disembark';
}

export interface CruiseCabin {
  name: string;
  description?: string;
  image?: string;
  features?: string[];
}

export interface CruiseGastronomy {
  name: string;
  description?: string;
  image?: string;
  type?: string;
}

export const getCruiseByUniqueName = async (uniqueName: string) => {
  const route = `cruises/${uniqueName}`;
  return ApiRequest.get<CruiseDetails>(route);
};