import { TripScriptAttraction } from "@/core/types";
import { TripScriptsApiService } from "@/services/api";
import { useState, useEffect } from "react";

export const useAddAttractions = (tripId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TripScriptAttraction[]>([] as TripScriptAttraction[]);
  const [error, setError] = useState(false);

  const fetchAttractionsData = () => {
    TripScriptsApiService.getAttractions(tripId)
      .then(setData)
      .catch(() => setError(true));
  };

  useEffect(() => {
    if (!tripId) setError(true);

    fetchAttractionsData();
    setIsLoading(false);
  }, [tripId]);

  return {
    isLoading,
    error,
    data,
  };
};
