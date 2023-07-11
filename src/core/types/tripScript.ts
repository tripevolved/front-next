export interface TripScript {
  tripId: string;
  isPreview: boolean;
  days: TripScriptDay[];
}

interface TripScriptDay {
  date: string;
  actions: TripScriptAction[];
  details: TripScriptDayDetail;
}

export interface TripScriptAction {
  iconSlug: string;
  title: string;
  subtitle: string;
  tooltip: string | null;
  attractionId: string | null;
  attractionPartnerSlug: string | null;
}

export interface TripScriptDayDetail {
  periods: TripScriptDayPeriod[];
}

interface TripScriptDayPeriod {
  title: string;
  actions: TripScriptAction[];
}
