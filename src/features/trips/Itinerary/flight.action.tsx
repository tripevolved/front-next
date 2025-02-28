import { Modal, Button } from "mars-ds";
import { Text, CardHighlight, Picture } from "@/ui";
import { FlightDetailsPanel } from "@/features";
import { TripTransportation } from "@/core/types";
import { TransportationApiService } from "@/services/api";
import useSwr from "swr";
import { useCallback } from "react";
import { useRouter } from "next/router";

export const FlightAction = ({
  action,
  tripId,
}: {
  action: TripTransportation;
  tripId: string;
}) => {
  const router = useRouter();
  const fetcher = async () =>
    TransportationApiService.getTransportationActionItinerary(tripId, action.actionId);

  const { data: searchedFlightDetails } = useSwr<TripTransportation>(
    "get-flight-details",
    fetcher,
    {
      revalidateOnMount: false,
      refreshInterval: 180000,
      fallbackData: action,
    }
  );

  const handleEditFlight = useCallback(() => {
    const route = `/app/viagens/${tripId}/voos/editar/`;
    router.push(route);
  }, [router, action.actionId, tripId]);

  const handleSeeDetails = async () => {
    const modal = Modal.open(
      () => (
        <FlightDetailsPanel
          data={searchedFlightDetails}
          handleEditFlight={handleEditFlight}
          onClose={() => {
            const body = document.body;
            body.setAttribute("data-overlay", "false");
            modal.close();
          }}
        />
      ),
      {
        size: "md",
        closable: true,
      }
    );
  };

  // if (error) return <ErrorState />;

  return (
    <div className=" itinerary__item">
      {action.isReady ? (
        <div className="flex flex-column gap-md py-lg ml-xl">
          <div className="flex flex-row gap-xl  items-center">
            <Picture src={`/assets/destino/passagem-aerea.svg`} style={{ width: 40 }} />
            <Text as="h3" heading size="xs" className="my-auto">
              <strong>Passagem aérea</strong>
            </Text>
          </div>
          <div className="flex flex-row gap-xl">
            <div style={{ width: 40 }} />
            <div className="flex flex-row justify-start gap-md">
              <div className="flex flex-row gap-xl">
                <Picture
                  src={action.partnerLogoUrl ?? `/assets/destino/hotel-casa-grande.png`}
                  alt={"flight"}
                  style={{ width: 50, height: 50 }}
                />
                <div className="items-end self-end">
                  <Text as="p" size="xs" style={{ padding: 0, margin: 0 }}>
                    <p>{`Saída: ${action.fromName}`}</p>
                  </Text>
                  <Text as="p" size="xs" style={{ padding: 0, margin: 0 }}>
                    <p>{`Chegada: ${action.toName}`}</p>
                  </Text>
                </div>
              </div>
              <Button
                variant="neutral"
                size="sm"
                style={{
                  border: "none",
                  textDecoration: "underline",
                  alignSelf: "flex-end",
                  padding: 0,
                  fontWeight: 500,
                  marginTop: 10,
                }}
                onClick={handleSeeDetails}
              >
                Ver Detalhes do voo
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <CardHighlight
          variant="warning"
          heading="Ainda não escolhemos o voo para sua viagem"
          text="Fale conosco e vamos te ajudar!"
        />
      )}
    </div>
  );
};
