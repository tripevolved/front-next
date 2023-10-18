import { TripScriptDay } from "@/core/types";

export interface TripScriptDayComponentProps {
  tripId: string;
  day: number;
  dayDetail: TripScriptDay;
  allowMoreAttractions?: boolean;
  allowDelete?: boolean;
  onDelete?: (index: number) => void;
}