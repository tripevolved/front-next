import { TripDashboardCard } from "./trip-dashboard-card.component";
import { TripsApiService } from "@/services/api";
import useSWR from "swr";

export const TripDashboardReservations = ({
  tripId,
}: { tripId: string }) => {
  const fetcher = async () =>
    TripsApiService.getReservationsCountById(tripId);
  const { isLoading, data, error } = useSWR(
    `get-reservations-count-${tripId}`,
    fetcher
  );

  return (
    <TripDashboardCard
      icon="flight-and-tickets"
      description="Voos e Reservas"
      qtd={error || isLoading ? 0 : data!}
      href={`/app/viagens/${tripId}/reservas/`}
    />
  );
};
