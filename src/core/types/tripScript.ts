export interface TripScript {
  tripId: string;
  isPreview: boolean;
  days: TripScriptDay[];
}

export interface TripScriptDay {
  id: string;
  date: string;
  actions: TripScriptAction[];
  details: TripScriptDayDetail;
}

export type TripScriptActionType = "RESTAURANT" | "BAR" | "EVENT" | "PARTY";

export interface TripScriptAction {
  id?: string;
  iconSlug: string;
  title: string;
  subtitle: string;
  tooltip: string | null;
  attractionId: string | null;
  attractionPartnerSlug: string | null;
  isSelected: boolean;
  isEditable: boolean;
  type?: TripScriptActionType;
}

export interface TripScriptDayDetail {
  periods: TripScriptDayPeriod[];
}

interface TripScriptDayPeriod {
  title: string;
  actions: TripScriptAction[];
}
