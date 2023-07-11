import { ComponentHTMLProps } from "@/core/types";
import { MatchedDestination } from "@/services/api/trip/matches";
import { Photo } from "@/core/types";

export interface MatchedDestinationsPageProps extends ComponentHTMLProps{}

export type MatchedDestinationCardProps = ComponentHTMLProps &
  MatchedDestination & {
    tripId: string;
    images: Photo[];
    travelersNumber?: number;
    onChoice: (destinationId: string) => void;
  };

export interface OtherChoicesCarouselProps extends ComponentHTMLProps {
  recommendedDestinations: MatchedDestinationCardProps[];
  title: string;
}