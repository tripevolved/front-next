import type { MatchedDestination } from "@/services/api/trip/matches";

import { Text } from "@/ui";
import { Grid } from "mars-ds";
import { MatchedDestinationCard } from "./matched-destination-card.component";

export interface MatchedDestinationsProposalProps {
  title: string;
  subtitle?: string;
  otherChoicesTitle?: string;
  tripId?: string;
  mainChoice?: MatchedDestination | null;
  otherChoices?: MatchedDestination[] | null;
  handleCreateTrip: (destinationId: string) => void;
}

export const MatchedDestinationsProposal = ({
  title,
  subtitle,
  mainChoice,
  otherChoices = [],
  handleCreateTrip,
}: MatchedDestinationsProposalProps) => {
  const hasChoices = Array.isArray(otherChoices) && otherChoices.length > 0;
  return (
    <Grid>
      <div>
        <Text heading className="mb-sm">
          {title}
        </Text>
        {subtitle ? <Text>{subtitle}</Text> : null}
      </div>
      {mainChoice ? (
        <MatchedDestinationCard
          {...mainChoice}
          travelersNumber={mainChoice?.travelers ?? 2}
          onChoice={() => handleCreateTrip(mainChoice.destinationId)}
          seeMore
        />
      ) : null}
      {hasChoices ? (
        <>
          <Text className="mt-lg" as="h2" heading size="xs">
            Outras opções
          </Text>
          <Grid columns={{ xs: 2, md: 3, lg: 4 }}>
            {otherChoices.map((choice, key) => (
              <MatchedDestinationCard
                key={key}
                {...choice}
                travelersNumber={choice.travelers ?? 2}
                onChoice={() => handleCreateTrip(choice.destinationId)}
              />
            ))}
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};
