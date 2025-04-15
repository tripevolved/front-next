import type { MatchedDestination } from "@/services/api/trip/matches";

import { Button, Grid, Icon, Skeleton } from "mars-ds";
import { AutoScrollCards, Box, CardTripNew, IconCustom, Text } from "@/ui";
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
            <Box className="card-trip matched-see-more-card">
              <Icon name="" color="#008383" size="lg" />
              <Button
                href={`/destinos?profileId=${travelerProfile}`}
                variant="custom"
                color="#008383"
              >
                Não gostei, quero ver mais destinos!
              </Button>
            </Box>
          </AutoScrollCards>
        </>
      ) : null}
      {/* <Box className="text-center mt-xl">
        <Button href={`/destinos?profileId=${travelerProfile}`} variant="secondary">
          Não gostei, quero ver mais destinos!
        </Button>
      </Box> */}
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
