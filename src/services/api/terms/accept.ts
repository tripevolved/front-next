import { TermAcceptance } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

// TODO: insert request information here
export const acceptUsageTermsByTravelerId = async (travelerId: string) => {
  const route = `terms`;
  const terms = {
    travelerId: travelerId,
    requestInformation: null,
    isUsageTerms: true,
  } as TermAcceptance;
  await ApiRequest.post(route, terms);
};

// TODO: insert request information here
export const acceptServiceConditionsByTravelerId = async (travelerId: string, tripId: string) => {
  const route = `terms`;
  const terms = {
    travelerId: travelerId,
    requestInformation: null,
    isServiceCondition: true,
    tripId: tripId,
  } as TermAcceptance;
  await ApiRequest.post(route, terms);
};
