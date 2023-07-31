import type { TripScriptDay, TripScriptAction } from "@/core/types";

const actions = [
  {
    id: "",
    iconSlug: "",
    title: "",
    subtitle: "",
    tooltip: "",
    attractionId: "",
    attractionPartnerSlug: "",
    isSelected: false,
    type: "BAR",
  },
] as TripScriptAction[];

export const initialTripScriptDayValue = {
  id: "",
  date: "",
  actions,
} as TripScriptDay;
