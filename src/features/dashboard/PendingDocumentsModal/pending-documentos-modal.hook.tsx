import { useEffect, useState } from "react";
import { TripTravelers } from "@/core/types";
import { TravelerApiService } from "@/services/api/traveler";

export const useTripPendingDocuments = (idParam: string | null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TripTravelers>();
  const [error, setError] = useState(false);

  const fetchPendingDocuments = async (tripId: string | null) => {
    if (tripId === null) {
      setError(true);
      return;
    }

    setIsLoading(true);
    setError(false);
    return TravelerApiService.getTripTravelers(tripId)
      .then(setData)
      .catch(() => setError(false));
  };

  useEffect(() => {
    if (!idParam) setError(true);

    fetchPendingDocuments(idParam);
    setIsLoading(false);
  }, [idParam]);

  return {
    isLoading,
    data,
    error,
  };
};
