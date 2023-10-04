import type { TripStay } from "@/core/types";

export interface TripHotelCardProps {
  tripStayData: Omit<TripStay, 'highlight'>;
  isCurated?: boolean;
  onSelect: () => void;
};
