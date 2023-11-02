import { TripPrice } from "@/core/types";
import { TripsApiService } from "@/services/api/trip";
import { useIdParam } from "@/utils/hooks/param.hook";
import { useState, useEffect } from "react";

export const useTripPrice = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TripPrice>();
  const [error, setError] = useState(false);

  const idParam = useIdParam();

  const fetchTripInformation = async (tripId: string) => {
    if (!tripId) return setError(true);

    setIsLoading(true);
    setError(false);
    return TripsApiService.getPriceById(tripId)
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!idParam) return setError(true);
    setIsLoading(false);
    fetchTripInformation(idParam);
  }, [idParam]);

  return { isPriceLoading: isLoading, priceData: data, priceError: error };
};
