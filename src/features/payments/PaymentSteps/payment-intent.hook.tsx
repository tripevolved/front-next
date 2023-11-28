import type { TripPaymentIntent } from "@/core/types";
import type { TripPaymentResult } from "@/services/api/payments/payTrip";

import { useEffect, useState } from "react";

import { PaymentsApiService } from "@/services/api";
import { TravelerApiService } from "@/services/api/traveler";

export const usePaymentIntent = ({ travelers, tripId, ...tripPayment }: TripPaymentIntent) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<TripPaymentResult | null>(null);

  const handle = async () => {
    setIsLoading(true);
    await TravelerApiService.create(tripId, travelers);
    const ipAddress = window.clientIp || "";
    await PaymentsApiService.postTripPaymentIntent({ ...tripPayment, tripId, ipAddress })
      .then((result) => {
        if (!result) {
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
