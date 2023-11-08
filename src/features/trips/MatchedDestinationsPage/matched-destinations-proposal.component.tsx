import type { MatchedDestination } from "@/services/api/trip/matches";

import { Grid, Skeleton } from "mars-ds";
import { AutoScrollCards, Text } from "@/ui";
import { MatchedDestinationCard } from "./matched-destination-card.component";

export interface MatchedDestinationsProposalProps {
  mainChoice?: MatchedDestination | null;
  otherChoices?: MatchedDestination[] | null;
  setDestinationById: (destinationId: string) => void;
}

export const MatchedDestinationsProposal = ({
  mainChoice,
  otherChoices = [],
  setDestinationById,
}: MatchedDestinationsProposalProps) => {
  const hasChoices = Array.isArray(otherChoices) && otherChoices.length > 0;
  return (
    <Grid>
      <Text heading>Escolha o seu destino</Text>
      {mainChoice ? (
        <>
          <Text as="h2" heading size="xs">
            Viagem ideal
          </Text>
          <MatchedDestinationCard
            {...mainChoice}
            travelersNumber={mainChoice?.travelers ?? 2}
            onClick={() => setDestinationById(mainChoice.destinationId)}
            seeMore
          />
        </>
      ) : null}
      {hasChoices ? (
        <>
          <Text className="mt-lg" as="h2" heading size="xs">
            Outras opções
          </Text>
          <AutoScrollCards>
            {otherChoices.map((choice, key) => (
              <MatchedDestinationCard
                key={key}
                {...choice}
                travelersNumber={choice.travelers ?? 2}
                onClick={() => setDestinationById(choice.destinationId)}
              />
            ))}
          </AutoScrollCards>
        </>
      ) : null}
    </Grid>
  );
};

const MatchedDestinationSkeleton = () => {
  return (
    <Grid>
      <Skeleton active height={32} width="80%" />
      <Skeleton active height={16} width={280} />
      <Skeleton active height={270} />
      <Skeleton active height={16} width={280} />
      <AutoScrollCards>
        {[1, 2, 3].map((key) => (
          <Skeleton key={key} active height={270} />
        ))}
      </AutoScrollCards>
    </Grid>
  );
};

MatchedDestinationsProposal.Skeleton = MatchedDestinationSkeleton;
