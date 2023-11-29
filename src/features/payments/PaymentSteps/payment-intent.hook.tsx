import type { TripPaymentIntentAll } from "@/core/types";
import type { TripPaymentResult } from "@/services/api/payments/payTrip";

import { useEffect, useState } from "react";

import { PaymentsApiService } from "@/services/api";
import { TravelerApiService } from "@/services/api/traveler";

export const usePaymentIntent = ({ travelers, tripId, ...tripPayment }: TripPaymentIntentAll) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<TripPaymentResult | null>(null);

  const handle = async () => {
    setIsLoading(true);
    await TravelerApiService.create(tripId, travelers);
    await PaymentsApiService.postTripPaymentIntent({
      ...tripPayment,
      tripId,
      shouldHavePaymentLink: false,
    })
      .then((result) => {
        if (!result || !result.isSuccess) {
          throw new Error("Empty result");
        }
        setData(result);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    handle();
  }, []);

  return { isLoading, error: isLoading ? false : error, data };
};
