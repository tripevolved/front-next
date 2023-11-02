import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { delay } from "@/utils/helpers/delay.helpers";

import { ErrorState, GlobalLoader, StepsLoader } from "@/ui";
import { Notification } from "mars-ds";
import { TripsApiService } from "@/services/api";
import { MatchedDestinationsProposal } from "./matched-destinations-proposal.component";
import useSWR from "swr";
import { MatchedDestinationReturn } from "@/services/api/trip/matches";
import { useIdParam } from "@/utils/hooks/param.hook";

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

export const MatchedDestinationsPage = () => {
  const router = useRouter();
  const idParam = useIdParam();

  const fetcherKey = `matched-destination-${idParam}`;
  const fetcher = async () => TripsApiService.getMatchedDestinations({ tripId: idParam });
  const { isLoading, data, error } = useSWR<MatchedDestinationReturn>(fetcherKey, fetcher);

  const [submitting, setSubmitting] = useState(false);

  const chosenDestination = useRef<string>();

  const handleCreateTrip = (destinationId: string) => {
    chosenDestination.current = destinationId;
    sendSetDestinationIdForTrip();
  };

  const sendSetDestinationIdForTrip = async () => {
    try {
      setSubmitting(true);
      await TripsApiService.setDestinationId({
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
      router.push(`/app/viagens/criar/${data?.tripId}`);
    }
  };

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (submitting) {
    return <StepsLoader steps={STEPS} milliseconds={MILLISECONDS} onFinish={handleFinish} />;
  }

  return (
    <MatchedDestinationsProposal
      title="Sua viagem ideal é para..."
      otherChoicesTitle="Outras opções"
      tripId={data?.tripId!}
      mainChoice={data?.mainChoice}
      otherChoices={data?.otherChoices}
      handleCreateTrip={handleCreateTrip}
    />
  );
};
