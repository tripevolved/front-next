import { ApiRequest } from "@/services/api/request";

export type CruiseType = 'relax' | 'destination' | 'uniqueBeauty';

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

export interface CruiseDetails {
  uniqueName: string;
  title: string;
  company: string;
  images: CruiseImage[];
  price: CruisePrice;
  departureDate: Date;
  arrivalDate: Date;
  description?: string;
  itinerary: CruiseItineraryItem[];
  highlights: CruiseHighlight[];
  rateView: CruiseShipRate;
  services: CruiseService[];
}

export interface CruiseShipRate {
  cruiseShipId: number;
  rates: CruiseRate[];
}

export interface CruiseRate {
  roomCategoryId: number;
  
  name: string;
  description?: string;
  amountPerPerson: number;
  amountPerPersonWithDiscount?: number;
  currency: string;
  coverImage: CruiseImage;
}

interface CruiseHighlight {
  description: string;
  expertQuote?: string;
}

interface CruiseService {
  name: string;
  description: string;
  icon?: string;
}

interface CruiseImage {
  url: string;
  shortDescription?: string;
}

export interface CruiseItineraryItem {
  arrivalDateTime: Date;
  departureDateTime: Date;

  embarkationStartDateTime?: Date;
  embarkationEndDateTime?: Date;
  disembarkationStartDateTime?: Date;
  disembarkationEndDateTime?: Date;

  title: string;
  description?: string;
  highlight?: string;
  dockType?: 'Dock' | 'Tender';
  image?: CruiseImage;
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