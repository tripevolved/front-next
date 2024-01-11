import { Text, EmptyState, GlobalLoader, ErrorState, SuccessState } from "@/ui";

import useSwr from "swr";
import { TripsApiService } from "@/services/api";
import { TripTipItem } from "./trip-tip-item.component";
import { useIdParam } from "@/utils/hooks/param.hook";
import { Grid } from "mars-ds";

export function TripTips() {
  const idParam = useIdParam();

  const fetcher = async () => TripsApiService.getTips(idParam as string);
  const fetcherKey = idParam ? `trip-tips-${idParam}` : null;
  const { isLoading, error, data } = useSwr(fetcherKey, fetcher);

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (!Array.isArray(data)) return <EmptyState />;

  if (!data.length) return <EmptyState heading="Nada por aqui!" text="Sua viagem ainda não possui dicas." />

  return (
    <Grid className="trip-pending">
      <div className="mb-md">
        <Text size="lg">
          Confira nossas dicas para tornar sua viagem ainda melhor!
        </Text>
      </div>
      {data.map((tip, key) => (
        <TripTipItem {...tip} tripId={idParam} key={key} />
      ))}
    </Grid>
  );
}
