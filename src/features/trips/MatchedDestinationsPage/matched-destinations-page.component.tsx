import { useState } from "react";
import { useRouter } from "next/router";

import useSWR from "swr";
import { EmptyState, ErrorState, GlobalLoader } from "@/ui";
import { Notification } from "mars-ds";
import { TripsApiService } from "@/services/api";
import { MatchedDestinationsProposal } from "./matched-destinations-proposal.component";
import { MatchedDestinationReturn } from "@/services/api/trip/matches";
import { useIdParam } from "@/utils/hooks/param.hook";
import { ResultsTrip } from "@/components/results/ResultsTrip";

export const MatchedDestinationsPage = () => {
  const router = useRouter();
  const idParam = useIdParam();

  // const fetcherKey = `matched-destination-${idParam}`;
  // const fetcher = async () => TripsApiService.getMatchedDestinations({ tripId: idParam });
  // const { isLoading, data, error } = useSWR<MatchedDestinationReturn>(fetcherKey, fetcher);

  const [submitting, setSubmitting] = useState(false);

  // if (error) return <ErrorState />;
  // if (isLoading) return <MatchedDestinationsProposal.Skeleton />;
  // if (!data)
  //   return (
  //     <EmptyState
  //       heading="Viagem não encontrada :("
  //       text="Tente mais tarde novamente, caso o problema persista, entre em contato com o nosso suporte."
  //       retry
  //     />
  //   );

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

  return (
    <>
      {submitting && <GlobalLoader />}
      {/* <MatchedDestinationsProposal
        mainChoice={data.mainChoice}
        otherChoices={data.otherChoices}
        setDestinationById={setDestinationById}
      /> */}
      <ResultsTrip tripId={idParam} fallback={() => {}} />
    </>
  );
};
