import { useRouter } from "next/router";

import { StaysApiService } from "@/services/api";
import useSwr from "swr";
import { EmptyState, GlobalLoader, CardHighlight, Text } from "@/ui";
import { TripStayDetails } from "../TripStayDetails";

export function TripAccommodation() {
  const router = useRouter();
  const idParam = String(router.query.id);

  const fetcher = async () => StaysApiService.getByTripId(idParam);
  const { data, isLoading, error } = useSwr(`current-accomodation-${idParam}`, fetcher);

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

  return (
    <div className="trip-accommodation">
      <TripStayDetails stayData={data.details} name={data.name} tripId={idParam} />
    </div>
  );
}
