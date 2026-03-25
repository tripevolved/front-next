import { getSubscriptions } from "./subscriptions";
import {
  createSubscriptionTraveler,
  getSubscriptionTravelers,
} from "./subscription-travelers";

export const CustomersService = {
  getSubscriptions,
  createSubscriptionTraveler,
  getSubscriptionTravelers,
};

export type { SubscriptionsResponse } from "./subscriptions";
export type {
  CreateSubscriptionTravelerRequest,
  RelationshipType,
  SubscriptionTravelerItem,
} from "./subscription-travelers";
