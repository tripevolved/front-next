import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TripsApiService } from "@/services/api";
import { TripPendingAction } from "@/core/types";

export const useTripPendings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TripPendingAction[]>();
  const [error, setError] = useState(false);

  const router = useRouter();
  const idParam = typeof router.query.id === "string" ? router.query.id : null;

  const fetchTripPending = async (tripId: string | null) => {
    if (tripId === null) {
      setError(true);
      return;
    }

    setIsLoading(true);
    setError(false);
    return TripsApiService.getTripPendings(tripId)
      .then(setData)
      .catch(() => setError(true));
  };

  useEffect(() => {
    if (!idParam) setError(true);

    fetchTripPending(idParam);
    setIsLoading(false);
  }, [idParam]);

  return {
    isLoading,
    data,
    error,
  };
};
