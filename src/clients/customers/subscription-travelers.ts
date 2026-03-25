import { ApiRequest } from "@/services/api/request";

export type RelationshipType = "SELF" | "SPOUSE" | "CHILD" | "OTHER";

export interface CreateSubscriptionTravelerRequest {
  customerSubscriptionId: string;
  relationshipType: RelationshipType;
  name: string;
  /** ISO-8601 date string (YYYY-MM-DD) */
  birthDate: string;
}

export interface SubscriptionTravelerItem {
  travelerId: string;
  travelerName: string;
  relationshipType: RelationshipType;
}

export const createSubscriptionTraveler = async (
  body: CreateSubscriptionTravelerRequest
): Promise<void> => {
  const route = "customers/subscriptions/travelers";
  await ApiRequest.post(route, body);
};

export const getSubscriptionTravelers = async (
  subscriptionId: string
): Promise<SubscriptionTravelerItem[]> => {
  const route = `customers/subscriptions/travelers/${subscriptionId}`;
  return ApiRequest.get<SubscriptionTravelerItem[]>(route);
};

