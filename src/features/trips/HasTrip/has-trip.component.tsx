import { StepsLoader } from "@/ui";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { delay } from "@/utils/helpers/delay.helpers";
import type { HasTripProps } from "./has-trip.types";
import { Notification } from "mars-ds";

import { TripsApiService } from "@/services/api";

import { makeCn } from "@/utils/helpers/css.helpers";
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

export function HasTrip({ trip, tripId, className, children, sx, ...props }: HasTripProps) {
  const cn = makeCn("has-trip", className)(sx);
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
    details: null
  };

  const handleCreateTrip = (destinationId: string) => {
    chosenDestination.current = destinationId;
    sendSetDestinationIdForTrip();
  };

  const sendSetDestinationIdForTrip = async () => {
    try {
      setSubmitting(true);
      const result = await TripsApiService.setDestinationId({
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
      await router.replace("/app/viagens/criar/" + tripId);
    }
  };

  return (
    <>
      {submitting ? (
        <StepsLoader steps={STEPS} milliseconds={MILLISECONDS} onFinish={handleFinish} />
      ) : (
        <MatchedDestinationsProposal
          title="Conclua o pagamento e garanta sua viagem"
          className={cn}
          tripId={tripId}
          mainChoice={matchedDestinationMainChoice}
          otherChoices={trip.otherChoices && trip.otherChoices.map((choice, i) => {
            return {
              destinationId: choice.destinationId,
              matchScore: choice.matchScore,
              name: choice.name,
              uniqueName: choice.uniqueName,
              images: choice.images,
              travelers: null, // TODO: receive this in route
              details: null
            };
          })}
          handleCreateTrip={handleCreateTrip}
        />
      )}
      {/* <Box className="has-trip__footer">
        <BlogCardCarousel title="As últimas do blog" />
      </Box> */}
    </>
  );
}
