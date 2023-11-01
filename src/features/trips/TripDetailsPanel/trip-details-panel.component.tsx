import useSwr from "swr";
import { EmptyState, ErrorState, GlobalLoader } from "@/ui";
import { TripDashboard } from "@/features";
import { TripsApiService } from "@/services/api";
import { useIdParam } from "@/utils/hooks/param.hook";
import { HasTrip } from "../HasTrip";

export function TripDetailsPanel() {
  const idParam = useIdParam();

  const fetcher = async () => TripsApiService.getByIdForDashboard(idParam!);
  const fetcherKey = idParam ? `trip-details-panel-${idParam}` : null;
  const { isLoading, error, data } = useSwr(fetcherKey, fetcher);

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState />;
  if (data.destinationProposal) return <HasTrip trip={data.destinationProposal} tripId={data.id} />;
  if (data.tripDashboard) {
    return <TripDashboard tripDashboard={data.tripDashboard!} tripId={data.id} />;
  }
  return <EmptyState text="Não foi possível abrir essa viagem" />;
}
