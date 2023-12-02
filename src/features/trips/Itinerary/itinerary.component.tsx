import { CardHighlight, EmptyState, ErrorState, Text } from "@/ui";
import type { ItineraryProps } from "./itinerary.types";

import { Card, CardElevations, Accordion, Skeleton } from "mars-ds";
import { TransportationApiService, TripsApiService } from "@/services/api";
import useSWR from "swr";
import { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";
import { useState } from "react";
import { TripDetailInfo } from "@/features";

export function Itinerary({ tripId }: ItineraryProps) {
  const fetcher = async () => TripsApiService.getItinerary(tripId);
  const { data, isLoading, error } = useSWR(`get-trip-itinerary-${tripId}`, fetcher);

  const getTitle = (actionType: ItineraryActionProps["type"]) => {
    const types = {
      ROUTE: "Rota",
      FLIGHT: "Voo",
      ACCOMMODATION: "Acomodação",
      RENTAL_CAR: "Aluguel de Carro",
    };

    return types[actionType];
  };

  const getIcon = (tag: ItineraryActionProps["type"]) => {
    const types = {
      ROUTE: "car",
      FLIGHT: "passagem-aerea",
      ACCOMMODATION: "hospedagem",
      RENTAL_CAR: "car",
    };

    return types[tag];
  };

  if (error) return <ErrorState />;
  if (data?.actions.length == 0) return <EmptyState />;

  return (
    <Card className="itinerary flex-column gap-lg" elevation={CardElevations.Low}>
      <Text heading size="lg">
        Seu itinerário
      </Text>
      <Text>
        Analisando suas informações, construímos um itinerário a partir de sua casa até Ouro Preto,
        para que você só tenha o trabalho de curtir sua viagem. MAIS XALAIÁ...
      </Text>
      {data?.actions.length
        ? data?.actions.map((action, i) =>
            action.type == "RENTAL_CAR" ? (
              <RentalCarAction {...action} />
            ) : action.type == "FLIGHT" ? (
              <FlightAction {...action} tripId={tripId} />
            ) : null
          )
        : null}
    </Card>
  );
}

export const RentalCarAction = (props: ItineraryActionProps) => {
  return (
    <Accordion title={props?.from.title}>
      <Skeleton>
        <TripDetailInfo image={`/assets/destino/carro.svg`} title="Aluguel de Carro">
          <Text style={{ color: "var(--color-gray-1)" }}>
            Sua rota iniciará em {props.from.title} até serguirá até {props.to.title}
          </Text>
          <CardHighlight
            variant="default"
            heading="Esta parte do trajeto será feita por terra"
            text="Gostaria de alugar um veículo com nossa equipe?"
            cta={{
              href: ``,
              label: "Preciso alugar um carro",
              iconName: "whatsapp",
              isRtl: true,
            }}
          />
        </TripDetailInfo>
      </Skeleton>
    </Accordion>
  );
};

export const FlightAction = (props: ItineraryActionProps & { tripId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const fetcher = async () =>
    TransportationApiService.getTransportationActionItinerary(
      props.tripId,
      props.tripItineraryActionId
    );
  const { isLoading, data, error } = useSWR(
    `get-itinerary-action-${props.tripItineraryActionId}`,
    fetcher
  );

  return (
    <Accordion title={props?.from.title} onClick={() => setIsOpen(true)}>
      <Skeleton>
        <TripDetailInfo image={`/assets/destino/passagem-aerea.svg`} title="Aqui é voo">
          <Text style={{ color: "var(--color-gray-1)" }}>
            Sua rota iniciará em {props.from.title} até serguirá até {props.to.title}
          </Text>
          <CardHighlight
            variant="default"
            heading="Esta parte do trajeto será feita por terra"
            text="Gostaria de alugar um veículo com nossa equipe?"
            cta={{
              href: ``,
              label: "Preciso alugar um carro",
              iconName: "whatsapp",
              isRtl: true,
            }}
          />
        </TripDetailInfo>
      </Skeleton>
    </Accordion>
  );
};
