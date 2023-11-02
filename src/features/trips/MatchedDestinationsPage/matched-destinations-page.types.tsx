import type { MatchedDestination } from "@/services/api/trip/matches";

export interface MatchedDestinationCardProps extends MatchedDestination {
  travelersNumber?: number;
  onChoice: (destinationId: string) => void;
  seeMore?: boolean;
}
