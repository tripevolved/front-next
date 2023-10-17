export interface TripScript {
  tripId: string;
  isPreview: boolean;
  days: TripScriptDay[];
}

export interface TripScriptDay {
  id: string;
  date: string;
  day: number;
  actions: TripScriptAction[];
  details: TripScriptDayDetail;
}

export type TripScriptActionType = "RESTAURANT" | "BAR" | "EVENT" | "PARTY";

export interface TripScriptAction {
  id: string | null;
  iconSlug: string;
  title: string;
  subtitle: string;
  tooltip: string | null;
  attractionId: string | null;
  attractionPartnerSlug: string | null;
  isSelected: boolean;
  isEditable: boolean;
  type?: TripScriptActionType;
  image?: string | null;
}

export interface TripScriptDayDetail {
  periods: TripScriptDayPeriod[];
}

interface TripScriptDayPeriod {
  title: string;
  actions: TripScriptAction[];
}

export interface TripScriptAttraction {
  id: string;
  isAlreadySelected: boolean;
  isHighlyRecommended: boolean;
  name: string;
  address: string;
  availabilityInfo: string;
  purchasePrice: number;
  attractionId?: string;
}

export interface UpdateScriptAction {
  id: string;
  attractionId?: string;
}

export interface UpdateTripScriptPayload {
  id: string;
  actions: UpdateScriptAction[];
}

export interface TripScriptCharacteristics {
  skip: Boolean;
  title: string;
  subtitle: string | null;
  characteristics: TripScriptCharacteristic[];
}

interface TripScriptCharacteristic {
  id: string;
  name: string;
}

export interface TripScriptParameters {
  tripId: string;
  relaxPartyLevel: number;
  importantCharacteristics: string[];
  tripTravelerProfile: string;
}

export interface TripScriptBuilderParams {
  numDays: number;
}

export interface TripScriptDayTip {
  type: TripScriptDayTipType;
  message: string;
  attractionId: string | null;
  restaurantId: string | null;
  eventId: string | null;
  barId: string | null;
}

type TripScriptDayTipType = "MESSAGE" | "ATTRACTION" | "RESTAURANT" | "EVENT" | "BAR";