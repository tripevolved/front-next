import type { TripPayment } from "@/core/types";
import type { TripPaymentResult } from "@/services/api/payments/payTrip";
import { PaymentsApiService } from "@/services/api";
import { useState } from "react";

export const useTripPurchase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<TripPaymentResult>({} as TripPaymentResult);

  const request = async (data: TripPayment) =>
    PaymentsApiService.postTripPaymentIntent(data)
      .then(setData)
      .catch(() => setError(true));

  return {
    request,
  };
};
