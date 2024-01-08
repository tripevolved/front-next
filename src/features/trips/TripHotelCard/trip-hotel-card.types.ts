import type { TripStay } from "@/core/types";
import { NextRouter } from "next/router";

export interface TripHotelCardProps {
  tripStayData: Omit<TripStay, "highlight"> & { coverImageUrl?: string };
  tripId: string;
  isCurated?: boolean;
  onSelect: () => void;
  isSelected?: boolean;
  router: NextRouter;
  uniqueTransactionId: string;
}
