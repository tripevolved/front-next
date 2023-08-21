import { useState, useRef } from "react";
import { makeCn } from "@/utils/helpers/css.helpers";
import { useMatchedDestinations } from "./matched-destinations.hook";
import { useRouter } from "next/router";
import { delay } from "@/utils/helpers/delay.helpers";

import { EmptyState, GlobalLoader, SectionBase, Box, Text, StepsLoader } from "@/ui";
import { Avatar, Notification } from "mars-ds";
import { MatchedDestinationsPageProps } from "./matched-destinations-page.types";
import { MatchedDestinationCard } from "./matched-destination-card.component";
import { OtherChoicesCarousel } from "./other-choices-carousel.component";
import { TripsApiService } from "@/services/api";
import { PageAppBody } from "@/features/templates/PageAppBody";
import { PageAppHeader } from "@/features";
import { useAppStore } from "@/core/store";

const EIGHT_SECONDS_IN_MS = 8 * 1000;
const MILLISECONDS = EIGHT_SECONDS_IN_MS;
const STEPS = [
  {
    text: "Construindo sua viagem...",
    iconName: "settings",
  },
  {
    text: "Procurando atrações para seu roteiro...",
    iconName: "map",
  },
  {
    text: "Estamos selecionando as melhores opções",
    iconName: "search",
  },
];

export const MatchedDestinationsPage = ({
  className,
  sx,
  ...props
}: MatchedDestinationsPageProps) => {
  const { isLoading, data, error } = useMatchedDestinations();
  const cn = makeCn("has-trip", className)(sx);
  const { name = "viajante" } = useAppStore((state) => state.travelerState);
  const firstName = name.replace(/\s.*/, "");

  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const chosenDestination = useRef<string>();

  const handleCreateTrip = (destinationId: string) => {
    chosenDestination.current = destinationId;
    sendSetDestinationIdForTrip();
  };

  const sendSetDestinationIdForTrip = async () => {
    try {
      setSubmitting(true);
      const result = await TripsApiService.setDestinationId({
        tripId: data?.tripId!,
        tripDestination: { destinationId: chosenDestination.current! },
      });
    } catch (error) {
      setSubmitting(false);
      Notification.error("Devido à um erro não foi possível continuar");
    }
  };

  const handleFinish = async (attempts = 3) => {
    if (attempts < 1) return; // TODO: send to error page
    if (!chosenDestination.current) {
      await delay(1000);
      handleFinish(attempts - 1);
    } else {
      await router.replace("/app/viagens/criar/" + data?.tripId!);
    }
  };

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;

  return (
    <>
      <PageAppHeader backButton href={`/app/painel`}>
        <div className="trip-details-panel__header">
          <div>
            <Text heading as="div" size="sm" className="mb-xs">
              Olá, <strong>{firstName}</strong> 👋
            </Text>
            <Text size="lg">Verifique os destinos que recomendamos para sua viagem</Text>
          </div>
        </div>
      </PageAppHeader>
      <PageAppBody>
        {submitting ? (
          <StepsLoader steps={STEPS} milliseconds={MILLISECONDS} onFinish={handleFinish} />
        ) : (
          <Box className={cn} {...props}>
            <Text variant="heading" className="has-trip__header-title" size="sm">
              Sua viagem ideal é para...
            </Text>
            <Box className="has-trip__trip-area">
              <MatchedDestinationCard
                travelersNumber={data?.mainChoice?.travelers ?? 2}
                tripId={data?.tripId!}
                {...data?.mainChoice!}
                onChoice={handleCreateTrip}
              />
            </Box>
            {data?.otherChoices && data.otherChoices.length > 0 ? (
              <Box className="has-trip__recommendations-area" style={{ paddingLeft: 0 }}>
                <OtherChoicesCarousel
                  title="Outras opções"
                  recommendedDestinations={data.otherChoices.map((matchedDestination, i) => {
                    return {
                      tripId: data.tripId,
                      onChoice: handleCreateTrip,
                      travelersNumber: matchedDestination.travelers ?? 2,
                      ...matchedDestination,
                    };
                  })}
                />
              </Box>
            ) : null}
          </Box>
        )}
      </PageAppBody>
    </>
  );
};
