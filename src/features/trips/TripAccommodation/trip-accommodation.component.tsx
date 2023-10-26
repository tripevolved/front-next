import { useRouter } from "next/router";

import { StaysApiService } from "@/services/api";
import useSwr from "swr";
import { EmptyState, GlobalLoader, CardHighlight, Text } from "@/ui";
import { TripStayDetails } from "../TripStayDetails";
import { useAppStore } from "@/core/store";

export function TripAccommodation() {
  const router = useRouter();
  const idParam = String(router.query.id);

  const accommodationState = useAppStore((state) => state.accommodation);

  const fetcher = async () => StaysApiService.getHotels(idParam);
  const { data, isLoading, error } = useSwr(`accomodation-get-${idParam}`, fetcher);

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (!data)
    return (
      <CardHighlight className="trip-stay-section__content">
        <div>
          <Text as="h2" size="lg">
            Ainda não escolhemos a acomodação para sua viagem.
          </Text>
          <Text>Fale conosco e vamos deixar tudo como você deseja!</Text>
        </div>
      </CardHighlight>
    );

  let accommodationData = data.curated.find((hotel) => hotel.name === accommodationState.name);
  if (!accommodationData && data.others) {
    accommodationData = data.others?.find((hotel) => hotel.name === accommodationState.name);
  }

  return (
    <div className="trip-accommodation">
      {accommodationData ? (
        <TripStayDetails
          uniqueTransactionId={data.uniqueTransactionId}
          stayData={accommodationData}
          tripId={idParam}
          router={router}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
