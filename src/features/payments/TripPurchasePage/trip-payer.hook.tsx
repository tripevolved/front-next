import { TripPayer } from "@/core/types";
import { PaymentsApiService } from "@/services/api";
import { useState, useEffect } from "react";
import { useAppStore } from "@/core/store";

export const useTripPayer = () => {
  const { travelerState } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [tripPayer, setTripPayer] = useState<TripPayer>();
  const [error, setError] = useState(false);

  const fetchPayerInformation = async (travelerId: string) => {
    setIsLoading(true);
    setError(false);
    return PaymentsApiService.getPayerById(travelerId)
      .then(setTripPayer)
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {    
    if (!travelerState.id) setError(true);

    fetchPayerInformation(travelerState.id);
    setIsLoading(false);
  }, [travelerState.id]);

  return { isLoading, tripPayer, error };
};
