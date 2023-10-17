import type { TripPayment } from "@/core/types";
import { PaymentsApiService } from "@/services/api";
import { useState } from "react";
import useSWR from "swr";

export const useTripPurchase = () => {
  const [objectPayload, setObjectPayload] = useState<TripPayment>({} as TripPayment);
  const [canSendPayload, setCanSendPayload] = useState(false);

  const request = async () => PaymentsApiService.postTripPaymentIntent(objectPayload);
  const { data, isLoading, error } = useSWR(
    canSendPayload ? `post-trip-payment-intent-${objectPayload.tripId}` : null,
    request
  );

  return {
    setObjectPayload,
    setCanSendPayload,

    loadingRequest: isLoading,
    data,
    errorRequest: error,
  };
};
