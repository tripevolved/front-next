import { TripConfiguration, TripDestination } from "@/core/types";

export interface TripCheckoutDestinationProps {
  configuration: TripConfiguration;
  destination: TripDestination;
  peopleInfo: string;
}
