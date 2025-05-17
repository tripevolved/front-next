import { StayOption, TripStay } from "@/core/types";
import { NextRouter } from "next/router";

export interface StayDetailsModalProps {
  tripId: string;
  itineraryActionId?: string;
  tripStay: StayOption;
  selectedRoom: string | undefined;
  setSelectedRoom: (code: string) => void;
}
