import type { Photo } from "@/core/types";

export interface MatchedDestinationCardProps {
  destinationId: string;
  matchScore: number;
  name: string;
  images: Photo[];
  href?: string;
  onClick?: VoidFunction;
  seeMore?: boolean;
  travelersNumber?: number;
}
