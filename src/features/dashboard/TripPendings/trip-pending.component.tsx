import { Text, EmptyState, GlobalLoader, ErrorState, SuccessState } from "@/ui";

import useSwr from "swr";
import { TripsApiService } from "@/services/api";
import { TripPendingItem } from "./trip-pending-item.component";
import { useIdParam } from "@/utils/hooks/param.hook";
import { Grid } from "mars-ds";

export function TripPending() {
  const idParam = useIdParam();

  const fetcher = async () => TripsApiService.getTripPending(idParam as string);
  const fetcherKey = idParam ? `travel-pending-${idParam}` : null;
  const { isLoading, error, data } = useSwr(fetcherKey, fetcher);

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (!Array.isArray(data)) return <EmptyState />;

  if (!data.length) return <SuccessState heading="Tudo certo!" text="Sua viagem não possui qualquer pendência"  />

  return (
    <Grid className="trip-pending">
      <div className="mb-md">
        <Text heading className="mb-sm">Verifique suas pendências</Text>
        <Text size="lg">
          É importante cumprir a lista para que tudo saia como o planejado.
        </Text>
      </div>
      {data.map((pending, key) => (
        <TripPendingItem {...pending} tripId={idParam} key={key} />
      ))}
    </Grid>
  );
}
