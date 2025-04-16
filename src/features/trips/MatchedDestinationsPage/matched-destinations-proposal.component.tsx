import type { MatchedDestination } from "@/services/api/trip/matches";

import { Button, Grid, Icon, Link, Skeleton } from "mars-ds";
import { AutoScrollCards, Box, Text } from "@/ui";
import { MatchedDestinationCard } from "./matched-destination-card.component";
import { useAppStore } from "@/core/store";

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

  const { travelerProfile } = useAppStore((state) => state.travelerState);

  const href = `/destinos?profileId=${travelerProfile}`;

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
            <Link href={href} className="card-trip matched-see-more-card">
              <Icon name="plus" color="#008383" size="lg" />
              <Button href={href} variant="custom" color="#008383">
                Quero ver mais destinos!
              </Button>
            </Link>
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
