import { StepsLoader } from "@/ui";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { delay } from "@/utils/helpers/delay.helpers";
import type { HasTripProps } from "./has-trip.types";
import { Notification } from "mars-ds";

import { TripsApiService } from "@/services/api";

import { MatchedDestinationsProposal } from "@/features";

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

export function HasTrip({ trip, tripId, className, sx }: HasTripProps) {
  const [submitting, setSubmitting] = useState(false);
  const chosenDestination = useRef<string>();
  const router = useRouter();

  const matchedDestinationMainChoice = {
    destinationId: trip.mainChoice.destinationId,
    matchScore: trip.mainChoice.matchScore,
    name: trip.mainChoice.name,
    uniqueName: trip.mainChoice.uniqueName,
    images: trip.mainChoice.images,
    travelers: null, // TODO: receive this in route
    details: null,
  };

  const handleCreateTrip = (destinationId: string) => {
    chosenDestination.current = destinationId;
    sendSetDestinationIdForTrip();
  };

  const sendSetDestinationIdForTrip = async () => {
    try {
      setSubmitting(true);
      await TripsApiService.setDestinationId({
        tripId: tripId,
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
      await router.push(`/app/viagens/criar/${tripId}`);
    }
  };

  if (submitting) {
    return <StepsLoader steps={STEPS} milliseconds={MILLISECONDS} onFinish={handleFinish} />;
  }

  const otherChoices = trip?.otherChoices?.map((choice) => ({
    destinationId: choice.destinationId,
    matchScore: choice.matchScore,
    name: choice.name,
    travelers: null,
    uniqueName: choice.uniqueName,
    images: choice.images,
    details: null,
  }));

  return (
    <MatchedDestinationsProposal
      title="Concluir"
      subtitle="Realize o pagamento e garanta sua viagem"
      mainChoice={matchedDestinationMainChoice}
      otherChoices={otherChoices}
      handleCreateTrip={handleCreateTrip}
    />
  );
}
