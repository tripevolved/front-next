import useSwr from "swr";
import { EmptyState, ErrorState, GlobalLoader } from "@/ui";
import { MatchedDestinationsPage, TripDashboard } from "@/features";
import { TripsApiService } from "@/services/api";
import { useIdParam } from "@/utils/hooks/param.hook";
import { useEffect } from "react";
import { useRouter } from "next/router";

export function TripDetailsPanel() {
  const idParam = useIdParam();

  const fetcherKey = idParam ? `trip-details-panel-${idParam}` : null;
  const fetcher = async () => TripsApiService.getByIdForDashboard(idParam!);
  const { isLoading, error, data } = useSwr(fetcherKey, fetcher);

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState />;
  if (data.tripDashboard) {
    return <TripDashboard tripDashboard={data.tripDashboard!} tripId={data.id} />;
  }
  if (data.destinationProposal) {
    const hasOnlyOneChoice = data.destinationProposal.otherChoices?.length === 0;
    if (hasOnlyOneChoice) return <TripRedirectToDetails tripId={data.id} />;
    return <MatchedDestinationsPage />;
  }
  return <EmptyState text="Não foi possível abrir essa viagem" />;
}

const TripRedirectToDetails = ({ tripId = "" }) => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    router.replace(`/app/viagens/${tripId}/detalhes/`);
  }, [router, tripId]);

  return <GlobalLoader />;
};
