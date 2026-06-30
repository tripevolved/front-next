import type { TripAccommodationItem } from "@/clients/trips/accommodations";
import type { TripConfiguration, TripDetails } from "@/core/types/trip";
import { parseDateOnlyToLocalDate } from "@/utils/helpers/dates.helpers";

export type TripPendingActionId = "planning" | "base" | "accommodation";

export type TripPendingAction = {
  id: TripPendingActionId;
  title: string;
  description: string;
  /** 1 = highest priority */
  order: number;
  drawer?: "planning" | "base" | "accommodation_proposals" | "accommodation_browse";
};

export function isTripPlanningComplete(configuration: TripConfiguration | undefined | null): boolean {
  if (!configuration) return false;
  const hasDates =
    Boolean(parseDateOnlyToLocalDate(configuration.startDate)) &&
    Boolean(parseDateOnlyToLocalDate(configuration.endDate));
  const hasMonth =
    configuration.month != null && configuration.month >= 1 && configuration.month <= 12;
  const hasTravelerType = configuration.travelerType != null && String(configuration.travelerType).trim() !== "";
  const hasBudget = typeof configuration.budget === "number" && configuration.budget > 0;
  return (hasDates || hasMonth) && hasTravelerType && hasBudget;
}

export function hasTripBaseSelection(trip: Pick<TripDetails, "destination" | "collection">): boolean {
  const hasDestination = Boolean(String(trip.destination ?? "").trim());
  const hasCollection = Boolean(String(trip.collection ?? "").trim());
  return hasDestination || hasCollection;
}

export function getTripPendingActions(
  trip: TripDetails | null | undefined,
  accommodations: TripAccommodationItem[] | null | undefined
): TripPendingAction[] {
  if (!trip) return [];

  const actions: TripPendingAction[] = [];
  const config = trip.configuration;
  const accommodationCount = accommodations?.length ?? 0;

  if (!isTripPlanningComplete(config)) {
    actions.push({
      id: "planning",
      order: 1,
      title: "Complete o planejamento da viagem",
      description: "Defina datas, perfil de viajantes e orçamento para personalizarmos sua jornada.",
      drawer: "planning",
    });
  }

  if (!hasTripBaseSelection(trip)) {
    actions.push({
      id: "base",
      order: 2,
      title: "Escolha a base da sua viagem",
      description: "Inspire-se em uma coleção curada ou selecione o destino que deseja visitar.",
      drawer: "base",
    });
  }

  if (hasTripBaseSelection(trip) && accommodationCount === 0) {
    actions.push({
      id: "accommodation",
      order: 3,
      title: "Veja nossas recomendações de hospedagem",
      description: "Com a base definida, confira as hospedagens curadas para o seu perfil e escolha a ideal.",
      drawer: "accommodation_proposals",
    });
  }

  return actions.sort((a, b) => a.order - b.order);
}
