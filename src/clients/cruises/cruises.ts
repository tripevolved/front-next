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
  amountWithEvolvedDiscount?: number;
  currency: string;
  cabinType: string;
}

interface CruisesResponse {
  cruises: CruiseData[];
  total: number;
  page: number;
  totalPages: number;
}

/** Search params for cruise listing. Backend should accept destination[], months[], type[] (and duration, page, limit). */
export interface CruisesSearchParams {
  /** Destination names e.g. ["Mediterrâneo", "Caribe"] */
  destinations?: string[];
  /** Max duration in days (1–15) */
  duration?: number;
  /** YYYY-MM strings e.g. ["2025-01", "2026-03"] */
  months?: string[];
  /** Type ids e.g. ["relax", "destination"] */
  types?: string[];
  page?: number;
  limit?: number;
}

export const getCruises = async ({
  destinations,
  duration,
  months,
  types,
  page = 1,
  limit = 10,
}: CruisesSearchParams = {}) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit)
  });
  if (destinations?.length) destinations.forEach((d) => params.append('destinations', d));
  if (duration != null) params.set('duration', String(duration));
  if (months?.length) months.forEach((m) => params.append('months', m));
  if (types?.length) types.forEach((t) => params.append('types', t));
  const route = `cruises/?${params.toString()}`;
  return ApiRequest.get<CruisesResponse>(route);
};

export interface CruiseDetails {
  uniqueName: string;
  title: string;
  company: string;
  ship: string;
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
  amountPerPersonWithEvolvedDiscount?: number;
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

export interface CruiseImage {
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