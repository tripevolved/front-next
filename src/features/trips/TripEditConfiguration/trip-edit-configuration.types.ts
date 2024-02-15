import { TripConfigurationRoom } from "@/core/types";

export interface TripEditConfigurationProps {
  tripId: string;
  budget: number;
  numAdults: number;
  numChildren: number;
  childrenAges: number[];
  rooms: TripConfigurationRoom[] | null;
  endDate: string;
  startDate: string;
}
