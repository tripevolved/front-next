import { Box, Text } from "@/ui";
import { MatchedDestinationCard } from "./matched-destination-card.component";
import { OtherChoicesCarousel } from "./other-choices-carousel.component";
import { MatchedDestination } from "@/services/api/trip/matches";
import { ComponentHTMLProps } from "@/core/types";

export interface MatchedDestinationsProposalProps extends ComponentHTMLProps {
  tripId?: string;
  mainChoice?: MatchedDestination | null;
  otherChoices?: MatchedDestination[] | null;
  handleCreateTrip: (destinationId: string) => void;
}

export const MatchedDestinationsProposal = ({
  tripId,
  mainChoice,
  otherChoices,
  handleCreateTrip,
  className,
  ...props
}: MatchedDestinationsProposalProps) => {
  return (
    <Box className={className} {...props}>
      <Text variant="heading" className="has-trip__header-title" size="sm">
        Sua viagem ideal é para...
      </Text>
      <Box className="has-trip__trip-area">
        <MatchedDestinationCard
          travelersNumber={mainChoice?.travelers ?? 2}
          tripId={tripId!}
          {...mainChoice!}
          onChoice={handleCreateTrip}
        />
      </Box>
      {otherChoices && otherChoices.length > 0 ? (
        <Box className="has-trip__recommendations-area" style={{ paddingLeft: 0 }}>
          <OtherChoicesCarousel
            title="Outras opções"
            recommendedDestinations={otherChoices.map((matchedDestination, i) => {
              return {
                tripId: tripId!,
                onChoice: handleCreateTrip,
                travelersNumber: matchedDestination.travelers ?? 2,
                ...matchedDestination,
              };
            })}
          />
        </Box>
      ) : null}
    </Box>
  );
};
