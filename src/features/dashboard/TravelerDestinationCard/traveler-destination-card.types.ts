import type { ComponentHTMLProps } from "@/core/types";

export interface TravelerDestinationCardProps extends ComponentHTMLProps {
  matchRate: number;
  cityName: string;
  cityImageURL: string;
  travelersNumber: number;
  price: number;
}
