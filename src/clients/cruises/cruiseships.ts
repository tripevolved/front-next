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

export const getCruiseShip = async (name: string): Promise<CruiseShip> => {
  const route = `cruiseships/${encodeURIComponent(name)}`;
  return ApiRequest.get<CruiseShip>(route);
};

export const getCruiseShipDetails = async (name: string): Promise<CruiseShipDetails> => {
  const route = `cruiseships/${encodeURIComponent(name)}/details`;
  return ApiRequest.get<CruiseShipDetails>(route);
};
