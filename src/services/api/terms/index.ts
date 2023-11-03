import { acceptUsageTermsByTravelerId, acceptServiceConditionsByTravelerId } from "./accept";

export const TermsApiService = {
  acceptUsageTerms: acceptUsageTermsByTravelerId,
  acceptServiceConditions: acceptServiceConditionsByTravelerId,
};
