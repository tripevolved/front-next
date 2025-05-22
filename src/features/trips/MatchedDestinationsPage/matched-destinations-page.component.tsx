import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { EmptyState, ErrorState, GlobalLoader } from "@/ui";
import { Notification } from "mars-ds";
import { TripsApiService } from "@/services/api";
import { useIdParam } from "@/utils/hooks/param.hook";
import { ResultsTrip } from "@/components/results/ResultsTrip";
import { TripProposal } from "@/core/types";
import { TripsApiService as TripApiClient } from "@/clients/trips";

export const MatchedDestinationsPage = () => {
  const router = useRouter();
  const idParam = useIdParam();

  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tripProposal, setTripProposal] = useState<TripProposal | null>(null);

  useEffect(() => {
    const fetchTripProposal = async () => {
      if (!idParam) {
        setIsLoading(false);
        setError(true);
        return;
      }
      try {
        const proposal = await TripApiClient.getTripMatches(idParam);
        if (proposal && proposal.mainChoice) {
          setTripProposal(proposal);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Failed to fetch trip proposal:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripProposal();
  }, [idParam]);

  const setDestinationById = async (destinationId: string) => {
    try {
      setSubmitting(true);
      await TripsApiService.setDestinationId({
        tripId: idParam,
        tripDestination: { destinationId },
      });
      router.push(`/app/viagens/${idParam}/detalhes`);
    } catch (error) {
      setSubmitting(false);
      Notification.error("Devido à um erro não foi possível continuar");
      setSubmitting(false);
    }
  };

  if (error) return <ErrorState />;
  if (!tripProposal && !isLoading)
    return (
      <EmptyState
        heading="Viagem não encontrada :("
        text="Tente mais tarde novamente, caso o problema persista, entre em contato com o nosso suporte."
        retry
      />
    );

  return (
    <>
      {submitting && <GlobalLoader />}
      <ResultsTrip
        error={error}
        isLoading={isLoading}
        tripProposal={tripProposal}
        setDestinationById={setDestinationById}
      />
    </>
  );
};
