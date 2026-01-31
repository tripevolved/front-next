import { ApiRequest } from "@/services/api/request";
import type { CruiseImage } from "./cruises";

export interface CruiseShip {
  name: string;
  description?: string;
  coverImage?: CruiseImage;
  guests?: number;
  crew?: number;
  company?: string;
  builtAt?: Date;
  lastRefurbishedAt?: Date;
}

export interface CruiseShipDetails extends CruiseShip {
  images?: CruiseImage[];
  videos?: CruiseImage[];
  pdfs?: CruiseImage[];
  tonnage?: number;
  numDecks?: number;
}

export type CruiseShipAttractionType = 'Restaurant' | 'Lounge' | 'Bar' | 'Spa' | 'Pool';

export interface CruiseShipAttraction {
  name: string;
  description?: string;
  type: CruiseShipAttractionType;
  images?: CruiseImage[];
}

export const getCruiseShip = async (name: string): Promise<CruiseShip> => {
  const route = `cruiseships/${encodeURIComponent(name)}`;
  return ApiRequest.get<CruiseShip>(route);
};

export const getCruiseShipDetails = async (name: string): Promise<CruiseShipDetails> => {
  const route = `cruiseships/${encodeURIComponent(name)}/details`;
  return ApiRequest.get<CruiseShipDetails>(route);
};

export const getCruiseShipAttractions = async (
  shipName: string,
  types?: CruiseShipAttractionType[]
): Promise<CruiseShipAttraction[]> => {
  const params = new URLSearchParams();
  if (types && types.length > 0) {
    types.forEach((type) => params.append('types', type));
  }
  const queryString = params.toString();
  const route = `cruiseships/${encodeURIComponent(shipName)}/attractions${queryString ? `?${queryString}` : ''}`;
  return ApiRequest.get<CruiseShipAttraction[]>(route);
};
