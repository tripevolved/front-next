import { TripScriptDay } from "@/core/types";

export interface TripScriptDayComponentProps {
  tripId: string;
  day: number;
  dayDetail: TripScriptDay;
  addMoreAttractions?: boolean;
}