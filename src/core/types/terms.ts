export interface TermAcceptance {
  travelerId: string;
  requestInformation: string | null;
  isServiceCondition?: boolean;
  tripId?: string | null;
  isUsageTerms?: boolean;
}