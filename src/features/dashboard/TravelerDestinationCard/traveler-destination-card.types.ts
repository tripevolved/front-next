import type { ComponentHTMLProps } from "@/core/types";
import { TripMatchedDestination } from "@/core/types";

export type TravelerDestinationCardProps = ComponentHTMLProps &
  TripMatchedDestination & {
    tripId: string;
    travelersNumber?: number;
  };
