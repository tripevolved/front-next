import { Box } from "@/ui";
import { ItineraryItemProps } from "./itinerary.types";
import { TripDetailInfo } from "@/features";

export function ItineraryItem({ title, children }: ItineraryItemProps) {
  return (
    <Box className="itinerary-item w-100 flex-column">
      <TripDetailInfo title={title} />
      <div className="itinerary-item__content px-sm my-lg ml-lg">{children}</div>
    </Box>
  );
}
