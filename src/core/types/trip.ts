import { TripDestination } from "@/core/types/destination";

export interface TripDetails {
  id: string;
  destination: TripDestination;
  configuration: TripConfiguration;
  transportation?: TripTransportation;
  // stay?: TripStay;
  // script?: TripScriptPreview;
  // foodTips: TripFoodTips;
  // support: TripSupportInformation;
  // price: TripPriceDetails;
}

export interface TripTransportation {
  companyLogoUrl?: string;
  type: string;
  title: string;
  departure: string;
  arrival: string;
}

export interface TripConfiguration {
  dates: string;
  period: string;
  budget: string;
}
