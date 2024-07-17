import { Box } from "@/ui";
import { ItineraryItemProps } from "./itinerary.types";
import { TripDetailInfo } from "@/features";

export function ItineraryItem({ title, actionType, children }: ItineraryItemProps) {
  const icon = {
    ROUTE: "carro",
    TRANSFER: "carro",
    FLIGHT: "passagem-aerea",
    RENTAL_CAR: "carro",
    ACCOMMODATION: "hospedagem",
  };

  return (
    <Box className="itinerary-item w-100 flex-column">
      <TripDetailInfo image={`/assets/destino/${icon[actionType]}.svg`} title={title} icon={icon[actionType]} />
      <div className="itinerary-item__content px-sm my-lg ml-lg">{children}</div>
    </Box>
  );
}
