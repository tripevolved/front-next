import { Box } from "@/ui";
import { ItineraryItemProps } from "./itinerary.types";
import { TripDetailInfo } from "@/features";

export function ItineraryItem({ title, actionType, children }: ItineraryItemProps) {
  const icon = {
    ROUTE: "carro",
    FLIGHT: "passagem-aerea",
    RENTAL_CAR: "carro",
    ACCOMMODATION: "hospedagem",
  };

  return (
    <Box className="itinerary-item w-100 flex-column">
      <TripDetailInfo image={`/assets/destino/${icon[actionType]}.svg`} title={title} />
      <div className="itinerary-item__content w-100 px-md my-lg ml-lg">{children}</div>
    </Box>
  );
}
