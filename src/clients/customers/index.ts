import { getSubscriptions } from "./subscriptions";
import {
  createSubscriptionTraveler,
  getSubscriptionTravelers,
} from "./subscription-travelers";
import { acceptTerms, buildAcceptTermsRequest } from "./terms";

export const CustomersService = {
  getSubscriptions,
  createSubscriptionTraveler,
  getSubscriptionTravelers,
  acceptTerms,
  buildAcceptTermsRequest,
};

export type { SubscriptionsResponse } from "./subscriptions";
export type {
  CreateSubscriptionTravelerRequest,
  RelationshipType,
  SubscriptionTravelerItem,
} from "./subscription-travelers";
export type { AcceptTermsRequest } from "./terms";
