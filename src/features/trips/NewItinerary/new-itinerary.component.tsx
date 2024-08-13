import { EmptyState, ErrorState, Picture, Text } from "@/ui";
import { Button } from "mars-ds";
import { AccommodationAction } from "../Itinerary/accommodation.action";
import { FlightAction } from "../Itinerary/flight.action";
import { ItineraryItem } from "../Itinerary/itinerary-item.wrapper";
import { RentalCarAction } from "../Itinerary/rental-car.action";
import { RouteAction } from "../Itinerary/route.action";
import { TripsApiService } from "@/services/api";
import { useAppStore } from "@/core/store";
import useSWR from "swr";
import { ItineraryList } from "@/core/types";

export function NewItinerary({ tripId, title }: any) {
  const setSimpleItinerary = useAppStore((state) => state.setSimpleItinerary);

  const fetcher = async () =>
    TripsApiService.getItinerary(tripId).then((data) => {
      buildSimpleItinerary(data);
      return data;
    });
  const { data, isLoading, error } = useSWR(`get-trip-itinerary-${tripId}`, fetcher);

  const buildSimpleItinerary = (itinerary: ItineraryList) => {
    setSimpleItinerary({
      actions: itinerary.actions.map((action) => ({ type: action.type, title: action.title })),
    });
  };

  if (error) return <ErrorState />;
  if (data?.actions.length == 0) return <EmptyState />;

  const icon = {
    ROUTE: "carro",
    TRANSFER: "carro",
    FLIGHT: "passagem-aerea",
    RENTAL_CAR: "carro",
    ACCOMMODATION: "hospedagem",
  };

  return (
    <div className="new-itinerary">
      <div>
        <Text heading size="lg">
          Seu itinerário
        </Text>
        <Text>
          Analisando suas informações, preparamos o seguinte itinerário para você. Ele começa na sua
          cidade e vai até {title}, para que você só tenha o trabalho de curtir a sua viagem. Você
          pode alterar suas escolhas e estamos à disposição para atendê-lo da melhor forma.
        </Text>
        <Button
          variant="neutral"
          href="#"
          size="sm"
          style={{
            border: "none",
            textDecoration: "underline",
            padding: 0,
            fontWeight: 500,
            marginTop: 10,
          }}
        >
          Ver itinerário completo
        </Button>
      </div>
      <div className="itinerary">
        {data?.actions.length
          ? data?.actions.map((action, i) =>
              action.type == "RENTAL_CAR" ? (
                <ItineraryItem
                  actionType={action.type}
                  title={action.title}
                  key={`${i}-${action.tripItineraryActionId}`}
                >
                  <RentalCarAction {...action} key={`${i}-${action.tripItineraryActionId}`} />
                </ItineraryItem>
              ) : action.type == "FLIGHT" ? (
                <ItineraryItem
                  actionType={action.type}
                  title={action.title}
                  key={`${i}-${action.tripItineraryActionId}`}
                >
                  <FlightAction {...action} tripId={tripId} />
                </ItineraryItem>
              ) : action.type == "ROUTE" || action.type == "TRANSFER" ? (
                <ItineraryItem
                  actionType={action.type}
                  title={action.title}
                  key={`${i}-${action.tripItineraryActionId}`}
                >
                  <RouteAction
                    {...action}
                    tripId={tripId}
                    key={`${i}-${action.tripItineraryActionId}`}
                  />
                </ItineraryItem>
              ) : action.type == "ACCOMMODATION" ? (
                <ItineraryItem
                  actionType={action.type}
                  title={action.title}
                  key={`${i}-${action.tripItineraryActionId}`}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginTop: 10,
                      padding: 10,
                    }}
                  >
                    <div>
                      <Picture
                        src={`/assets/destino/${icon[action.type]}.svg`}
                        style={{ width: 40 }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: 8 }}>
                      <label
                        style={{ color: "#1A365D", fontSize: 16, textTransform: "capitalize" }}
                      >
                        {icon[action.type]}
                      </label>
                      <span
                        style={{
                          color: "#5A626D",
                          fontSize: 14,
                          marginTop: 6,
                          textTransform: "lowercase",
                        }}
                      >
                        {action.title}
                      </span>
                    </div>
                  </div>
                  <AccommodationAction
                    {...action}
                    tripId={tripId}
                    key={`${i}-${action.tripItineraryActionId}`}
                  />
                </ItineraryItem>
              ) : null
            )
          : null}
      </div>
    </div>
  );
}
