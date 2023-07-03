import type { ComponentHTMLProps } from "@/core/types";

export interface TravelerDestinationCardProps extends ComponentHTMLProps {
  matchRate: number | null;
  cityName: string;
  cityImageURL: {} | null;
  travelersNumber: number | null;
  price: number | null;
}
