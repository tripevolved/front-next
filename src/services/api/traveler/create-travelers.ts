import { Traveler } from "@/core/types";
import { ApiRequest } from "../request";
import { getTripTravelers } from "./travelers";

export const createTravelers = async (tripId: string, travelers: Traveler[]) => {
  const route = "/travelers/trip";
  await ApiRequest.post(route, { tripId, travelers });
  // TODO: when api returns created travelers, remove get method belows
  return getTripTravelers(tripId);
};
