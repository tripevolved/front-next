import { Box, Text, SectionBase, EmptyState, GlobalLoader, ErrorState } from "@/ui";

import { useRouter } from "next/router";

import useSwr from "swr";
import { TripsApiService } from "@/services/api";
import { TripPendingItem } from "./trip-pending-item.component";

export function TripPending() {
  const router = useRouter();
  const idParam = String(router.query.id);

  const fetcher = async () => TripsApiService.getTripPending(idParam);
  const uniqueKeyName = `travel-pending-${idParam}`;
  const { isLoading, error, data } = useSwr(uniqueKeyName, fetcher);

  const text =
    "Verifique suas pendências. É importante cumprir a lista para que tudo saia como o planejado.";

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState />;

  return (
    <SectionBase className="trip-pending__section py-md">
      <Box className="trip-pending__section__body">
        {data.length ? (
          <>
            <Text size="lg" className="trip-pending__section__body__sub-title">
              {text}
            </Text>
            <Box className="trip-pending__section__body__pending-list">
              {data.map((pending, key) => (
                <TripPendingItem {...pending} tripId={idParam} key={key} />
              ))}
            </Box>
          </>
        ) : (
          <Text heading size="sm">
            Sua viagem não possui qualquer pendência!
          </Text>
        )}
      </Box>
    </SectionBase>
  );
}
