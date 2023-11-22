import { TripDetails } from "@/core/types";

export interface PaymentStepProps {
  trip: TripDetails;
  onNext: VoidFunction;
}
