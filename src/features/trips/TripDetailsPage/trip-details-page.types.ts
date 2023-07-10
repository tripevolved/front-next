import type {
  TripDestination,
  TripTransportation,
  TripConfiguration,
  TripDetails,
} from "@/core/types";
import { ComponentHTMLProps } from "@/core/types";

export type TripDetailsProps = TripDetails;

export interface TripDetailsPageProps extends ComponentHTMLProps {
  tripDetails: TripDetailsProps;
}

export type TripPriceDetails = {
  title: string;
  price: number;
};

export interface TripFoodTipsSectionProps {
  text: string;
}