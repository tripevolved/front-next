import { useRouter } from "next/router";

import { StaysApiService } from "@/services/api";
import useSwr from "swr";
import { EmptyState, GlobalLoader, CardHighlight, Text, ErrorState } from "@/ui";
import { TripStayDetails } from "../TripStayDetails";
import { useAppStore } from "@/core/store";
import { useIdParam } from "@/utils/hooks/param.hook";
import { useMemo } from "react";

export function TripAccommodation() {
  const router = useRouter();
  const idParam = useIdParam();
  const tripId = String(idParam);

  const accommodation = useAppStore((state) => state.accommodation);

  const fetcher = async () => StaysApiService.getHotels(tripId);
  const fetcherKey = `trip-accommodation-${tripId}`;
  const { data, isLoading, error } = useSwr(fetcherKey, fetcher);

  const accommodationData = useMemo(() => {
    if (!data) return undefined;
    const result = data.curated.find((hotel) => hotel.name === accommodation.name);
    if (!result && data.others) {
      return data.others?.find((hotel) => hotel.name === accommodation.name);
    } else {
      return result;
    }
  }, [accommodation.name, data]);

  if (error) return <ErrorState />;
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

  if (!accommodationData) return <EmptyState />;

  return (
    <div className="trip-accommodation">
      <TripStayDetails
        uniqueTransactionId={data.uniqueTransactionId}
        stayData={accommodationData}
        tripId={tripId}
        router={router}
      />
    </div>
  );
}
