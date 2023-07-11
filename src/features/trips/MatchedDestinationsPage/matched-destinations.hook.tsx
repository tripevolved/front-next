import { MatchedDestinationReturn } from "@/services/api/trip/matches";
import { TripsApiService } from "@/services/api";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const useMatchedDestinations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<MatchedDestinationReturn | null>(null);
  const [error, setError] = useState(false);

  const router = useRouter();
  const idParam = typeof router.query.id === "string" ? router.query.id : null;

  const fetchBuilder = async (tripId: string) => {
    setIsLoading(true);
    setError(false);
    return TripsApiService.getMatchedDestinations({ tripId })
      .then(setData)
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    if (idParam) fetchBuilder(idParam);
    setIsLoading(false);
  }, [idParam]);

  return { isLoading, data, error };
};
